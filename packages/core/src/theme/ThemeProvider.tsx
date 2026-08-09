'use client';
/**
 * ThemeProvider — thin React sugar over `syncDocumentTheme`.
 *
 * Theme = `--md-sys-color-*` on a root element (default: `document.documentElement`).
 * Components never read React context for color; they only read CSS variables.
 * Dynamic switching = change `colors` / `seed` / `mode` props (or call
 * `syncDocumentTheme` / `applyScheme` imperatively).
 *
 * `target="document"` (default) writes to `<html>` so portaled surfaces
 * (Dialog, Menu, …) inherit the same vars. `target="scope"` keeps the old
 * wrapper-scoped behavior for rare nested themes.
 */
import * as React from 'react';

import {
  applyScheme,
  clearScheme,
  generateScheme,
  syncDocumentTheme,
  type ContrastLevel,
  type Scheme,
  type SchemeVariant,
} from './dynamic-color';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}

export type ThemeTarget = 'document' | 'scope';

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Explicit color scheme for the active mode (host theme / custom palette).
   * Takes precedence over `seed`. Switch colors by passing a new object.
   */
  colors?: Scheme;
  /** Seed hex — generates light/dark via Material Dynamic Color when `colors` is omitted. */
  seed?: string;
  /** Dynamic Color variant used with `seed`. @default 'tonalSpot' */
  scheme?: SchemeVariant;
  contrast?: ContrastLevel;
  /** Initial / controlled mode. @default 'system' */
  mode?: ThemeMode;
  /**
   * How to resolve `mode="system"`. Defaults to `prefers-color-scheme`.
   * Pass a host-aware function for VS Code webviews etc.
   */
  resolveMode?: () => 'light' | 'dark';
  /**
   * Where to write CSS variables.
   * - `document` (default): `document.documentElement` — portal-safe
   * - `scope`: the provider wrapper only — nested / demo islands
   */
  target?: ThemeTarget;
  /** Render as a different element. @default 'div' */
  as?: 'div' | 'span';
  className?: string;
}

function usePrefersDark(): boolean {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return dark;
}

export function ThemeProvider({
  children,
  colors,
  seed,
  scheme = 'tonalSpot',
  contrast = 'standard',
  mode: modeProp = 'system',
  resolveMode: resolveModeProp,
  target = 'document',
  as: As = 'div',
  className,
}: ThemeProviderProps): React.JSX.Element {
  const [mode, setMode] = React.useState<ThemeMode>(modeProp);
  React.useEffect(() => setMode(modeProp), [modeProp]);

  const prefersDark = usePrefersDark();
  const resolvedMode: 'light' | 'dark' = React.useMemo(() => {
    if (mode !== 'system') return mode;
    if (resolveModeProp) return resolveModeProp();
    return prefersDark ? 'dark' : 'light';
  }, [mode, resolveModeProp, prefersDark]);

  const scopeRef = React.useRef<HTMLDivElement | null>(null);

  // Document target: single write path shared with imperative API.
  React.useLayoutEffect(() => {
    if (target !== 'document') return;
    if (typeof document === 'undefined') return;
    return syncDocumentTheme({
      mode: resolvedMode,
      colors,
      seed,
      variant: scheme,
      contrast,
    });
  }, [target, resolvedMode, colors, seed, scheme, contrast]);

  // Scope target: legacy wrapper-local vars (portals will not see them).
  React.useLayoutEffect(() => {
    if (target !== 'scope') return;
    const el = scopeRef.current;
    if (!el) return;
    el.setAttribute('data-theme', resolvedMode);
    if (colors) {
      applyScheme(el, colors);
      return () => clearScheme(el);
    }
    if (seed) {
      const pair = generateScheme(seed, scheme, contrast);
      applyScheme(el, resolvedMode === 'dark' ? pair.dark : pair.light);
      return () => clearScheme(el);
    }
    clearScheme(el);
    return undefined;
  }, [target, resolvedMode, colors, seed, scheme, contrast]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ mode, resolvedMode, setMode }),
    [mode, resolvedMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <As
        ref={scopeRef as never}
        className={className}
        {...(target === 'scope' ? { 'data-theme': resolvedMode } : {})}
      >
        {children}
      </As>
    </ThemeContext.Provider>
  );
}
