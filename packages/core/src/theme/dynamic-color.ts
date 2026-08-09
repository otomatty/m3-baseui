/**
 * dynamic-color.ts — runtime M3 scheme generation.
 *
 * Wraps @material/material-color-utilities (HCT color space) to produce the 47
 * `sys.color` roles for both light and dark from a seed color, scheme variant,
 * and contrast level. Output values are "R G B" channel triples matching the
 * token format, so they drop straight into the `--md-sys-color-*` variables
 * that both styling engines read.
 */
import {
  Hct,
  MaterialDynamicColors,
  SchemeTonalSpot,
  SchemeVibrant,
  SchemeExpressive,
  SchemeNeutral,
  SchemeContent,
  SchemeFidelity,
  argbFromHex,
  type DynamicScheme,
} from '@material/material-color-utilities';

import { tokens } from '@m3-baseui/tokens';

export type SchemeVariant =
  | 'tonalSpot'
  | 'vibrant'
  | 'expressive'
  | 'neutral'
  | 'content'
  | 'fidelity';

export type ContrastLevel = 'standard' | 'medium' | 'high';

export type ColorRole = keyof typeof tokens.sys.color;
export type Scheme = Record<ColorRole, string>;
export interface SchemePair {
  light: Scheme;
  dark: Scheme;
}

const CONTRAST: Record<ContrastLevel, number> = {
  standard: 0,
  medium: 0.5,
  high: 1,
};

function buildScheme(
  seedArgb: number,
  variant: SchemeVariant,
  isDark: boolean,
  contrast: number,
): DynamicScheme {
  const source = Hct.fromInt(seedArgb);
  switch (variant) {
    case 'vibrant':
      return new SchemeVibrant(source, isDark, contrast);
    case 'expressive':
      return new SchemeExpressive(source, isDark, contrast);
    case 'neutral':
      return new SchemeNeutral(source, isDark, contrast);
    case 'content':
      return new SchemeContent(source, isDark, contrast);
    case 'fidelity':
      return new SchemeFidelity(source, isDark, contrast);
    case 'tonalSpot':
    default:
      return new SchemeTonalSpot(source, isDark, contrast);
  }
}

/** argb (0xAARRGGBB) to an "R G B" triple. */
function argbToTriple(argb: number): string {
  const r = (argb >> 16) & 0xff;
  const g = (argb >> 8) & 0xff;
  const b = argb & 0xff;
  return r + ' ' + g + ' ' + b;
}

const ROLE_KEYS = Object.keys(tokens.sys.color) as ColorRole[];

type ArgbReader = { getArgb(s: DynamicScheme): number };

function readScheme(scheme: DynamicScheme): Scheme {
  const out = {} as Scheme;
  const palette = MaterialDynamicColors as unknown as Record<string, ArgbReader>;
  for (const role of ROLE_KEYS) {
    const dynamicColor = palette[role];
    if (dynamicColor && typeof dynamicColor.getArgb === 'function') {
      out[role] = argbToTriple(dynamicColor.getArgb(scheme));
    } else {
      // Roles MDC doesn't expose (rare) fall back to the static baseline.
      out[role] = tokens.sys.color[role].light;
    }
  }
  return out;
}

/** Generate light + dark schemes from a seed hex color. */
export function generateScheme(
  seed: string,
  variant: SchemeVariant = 'tonalSpot',
  contrast: ContrastLevel = 'standard',
): SchemePair {
  const seedArgb = argbFromHex(seed);
  const c = CONTRAST[contrast];
  return {
    light: readScheme(buildScheme(seedArgb, variant, false, c)),
    dark: readScheme(buildScheme(seedArgb, variant, true, c)),
  };
}

/** kebab-case a camelCase role name (mirrors the token generator). */
function kebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function colorVar(role: ColorRole): string {
  return '--md-sys-color-' + kebab(role);
}

/** Write a single scheme's roles onto an element as inline custom properties. */
export function applyScheme(element: HTMLElement, scheme: Scheme): void {
  for (const role of ROLE_KEYS) {
    element.style.setProperty(colorVar(role), scheme[role]);
  }
}

/** Remove inline `--md-sys-color-*` props so stylesheet tokens (tokens.css) win again. */
export function clearScheme(element: HTMLElement): void {
  for (const role of ROLE_KEYS) {
    element.style.removeProperty(colorVar(role));
  }
}

export interface SyncDocumentThemeInput {
  /** Resolved light/dark — sets `data-theme` on the root. */
  mode: 'light' | 'dark';
  /**
   * Explicit scheme (host theme, precomputed palette). Wins over `seed`.
   * Pass the scheme for the active mode; switching colors = call again with a new scheme.
   */
  colors?: Scheme;
  /** Generate a scheme from a Material seed hex. Ignored when `colors` is set. */
  seed?: string;
  variant?: SchemeVariant;
  contrast?: ContrastLevel;
  /** Defaults to `document.documentElement`. */
  root?: HTMLElement;
}

type InlineColorSnapshot = Record<string, string>;

interface ThemeLayer {
  id: symbol;
  mode: 'light' | 'dark';
  /** `null` = clear inline colors (mode-only / tokens.css baseline). */
  scheme: Scheme | null;
}

interface RootThemeState {
  /** DOM snapshot before the first layer on this root. */
  baseline: { dataTheme: string | null; inline: InlineColorSnapshot };
  layers: ThemeLayer[];
}

const rootThemeStates = new WeakMap<HTMLElement, RootThemeState>();

function captureInlineColors(root: HTMLElement): InlineColorSnapshot {
  const inline: InlineColorSnapshot = {};
  for (const role of ROLE_KEYS) {
    const prop = colorVar(role);
    const value = root.style.getPropertyValue(prop);
    if (value !== '') inline[prop] = value;
  }
  return inline;
}

function restoreInlineColors(root: HTMLElement, inline: InlineColorSnapshot): void {
  clearScheme(root);
  for (const [prop, value] of Object.entries(inline)) {
    root.style.setProperty(prop, value);
  }
}

function applyThemeLayer(root: HTMLElement, layer: ThemeLayer): void {
  root.setAttribute('data-theme', layer.mode);
  if (layer.scheme) applyScheme(root, layer.scheme);
  else clearScheme(root);
}

function restoreThemeBaseline(root: HTMLElement, baseline: RootThemeState['baseline']): void {
  restoreInlineColors(root, baseline.inline);
  if (baseline.dataTheme === null) root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', baseline.dataTheme);
}

/**
 * Wipe layer ownership and DOM theme attrs for a root.
 * Useful in tests; apps rarely need this if every sync is disposed.
 */
export function resetDocumentTheme(root: HTMLElement = document.documentElement): void {
  rootThemeStates.delete(root);
  clearScheme(root);
  root.removeAttribute('data-theme');
}

/**
 * Single write path for app themes: put colors on `:root` (portal-safe) and set
 * `data-theme`. Returns a disposer that removes **this** call's layer only.
 *
 * Overlapping calls on the same root form a stack: disposing a lower layer does
 * not erase a newer one; disposing the last layer restores the pre-sync baseline
 * (`data-theme` + inline `--md-sys-color-*`).
 *
 * Priority per call: `colors` → `seed` → baseline `tokens.css` (inline cleared).
 */
export function syncDocumentTheme(input: SyncDocumentThemeInput): () => void {
  const root = input.root ?? document.documentElement;

  let state = rootThemeStates.get(root);
  if (!state) {
    state = {
      baseline: {
        dataTheme: root.getAttribute('data-theme'),
        inline: captureInlineColors(root),
      },
      layers: [],
    };
    rootThemeStates.set(root, state);
  }

  let scheme: Scheme | null = null;
  if (input.colors) {
    scheme = input.colors;
  } else if (input.seed) {
    const pair = generateScheme(
      input.seed,
      input.variant ?? 'tonalSpot',
      input.contrast ?? 'standard',
    );
    scheme = input.mode === 'dark' ? pair.dark : pair.light;
  }

  const layer: ThemeLayer = {
    id: Symbol('m3-theme-layer'),
    mode: input.mode,
    scheme,
  };
  state.layers.push(layer);
  applyThemeLayer(root, layer);

  return () => {
    const current = rootThemeStates.get(root);
    if (!current) return;
    const index = current.layers.findIndex((entry) => entry.id === layer.id);
    if (index === -1) return;
    current.layers.splice(index, 1);

    if (current.layers.length === 0) {
      restoreThemeBaseline(root, current.baseline);
      rootThemeStates.delete(root);
      return;
    }

    applyThemeLayer(root, current.layers[current.layers.length - 1]!);
  };
}

/** Serialize a scheme to CSS declarations (useful for SSR style injection). */
export function schemeToCssText(scheme: Scheme): string {
  let css = '';
  for (const role of ROLE_KEYS) {
    css += colorVar(role) + ': ' + scheme[role] + ';';
  }
  return css;
}
