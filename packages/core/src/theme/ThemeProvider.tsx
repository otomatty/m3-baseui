'use client';
/**
 * ThemeProvider — injects an M3 color scheme into a DOM scope and manages
 * light/dark mode. Both styling engines read the same `--md-sys-color-*` vars,
 * so dynamic color needs no engine-specific code.
 *
 * Modes:
 *   'light' | 'dark'  force a mode
 *   'system'          follow prefers-color-scheme (default)
 *
 * If `seed` is provided, a scheme is generated at runtime via material-color-
 * utilities and applied to the wrapper element. Without a seed, the baseline
 * variables from `@m3-baseui/tokens/tokens.css` remain in effect.
 */
import * as React from 'react';

import {
  applyScheme,
  generateScheme,
  type ContrastLevel,
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

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Seed color (hex). When set, a scheme is generated and applied. */
  seed?: string;
  scheme?: SchemeVariant;
  contrast?: ContrastLevel;
  /** Initial / controlled mode. @default 'system' */
  mode?: ThemeMode;
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
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return dark;
}

export function ThemeProvider({
  children,
  seed,
  scheme = 'tonalSpot',
  contrast = 'standard',
  mode: modeProp = 'system',
  as: As = 'div',
  className,
}: ThemeProviderProps): React.JSX.Element {
  const [mode, setMode] = React.useState<ThemeMode>(modeProp);
  React.useEffect(() => setMode(modeProp), [modeProp]);

  const prefersDark = usePrefersDark();
  const resolvedMode: 'light' | 'dark' =
    mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;

  const ref = React.useRef<HTMLDivElement | null>(null);

  // Generate the scheme once per seed/variant/contrast change.
  const schemes = React.useMemo(
    () => (seed ? generateScheme(seed, scheme, contrast) : null),
    [seed, scheme, contrast],
  );

  // Apply the active scheme's variables whenever inputs change.
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !schemes) return;
    applyScheme(el, resolvedMode === 'dark' ? schemes.dark : schemes.light);
  }, [schemes, resolvedMode]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ mode, resolvedMode, setMode }),
    [mode, resolvedMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <As ref={ref as never} className={className} data-theme={resolvedMode}>
        {children}
      </As>
    </ThemeContext.Provider>
  );
}
