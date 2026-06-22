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

import { tokens } from '@m3/tokens';

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

/** Serialize a scheme to CSS declarations (useful for SSR style injection). */
export function schemeToCssText(scheme: Scheme): string {
  let css = '';
  for (const role of ROLE_KEYS) {
    css += colorVar(role) + ': ' + scheme[role] + ';';
  }
  return css;
}
