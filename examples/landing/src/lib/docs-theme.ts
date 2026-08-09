import { syncDocumentTheme } from '@m3-baseui/react-tailwind';

export type ThemeMode = 'light' | 'dark';

export interface SeedOption {
  name: string;
  value: string;
}

export const STORAGE_KEY = 'm3-docs-theme';
export const THEME_CHANGE_EVENT = 'm3-docs-theme-change';

export const DEFAULT_SEED = '#6750A4';

export const SEEDS: SeedOption[] = [
  { name: 'パープル', value: '#6750A4' },
  { name: 'ブルー', value: '#00639B' },
  { name: 'グリーン', value: '#386A20' },
  { name: 'レッド', value: '#B3261E' },
  { name: 'オレンジ', value: '#8B5000' },
  { name: 'ピンク', value: '#7D5260' },
  { name: 'ティール', value: '#006A6A' },
];

export interface StoredTheme {
  mode: ThemeMode;
  seed: string;
  css?: string;
}

export interface ThemeChangeDetail {
  mode: ThemeMode;
  seed: string;
}

export function readStored(): StoredTheme {
  if (typeof window === 'undefined') return { mode: 'light', seed: DEFAULT_SEED };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoredTheme>;
      return {
        mode: parsed.mode === 'dark' ? 'dark' : 'light',
        seed: typeof parsed.seed === 'string' ? parsed.seed : DEFAULT_SEED,
      };
    }
  } catch {
    // ignore malformed storage
  }
  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { mode: prefersDark ? 'dark' : 'light', seed: DEFAULT_SEED };
}

/** Apply theme onto `<html>` via the library sync API and cache for FOUC-less loads. */
export function applyTheme(mode: ThemeMode, seed: string): void {
  const root = document.documentElement;
  syncDocumentTheme({ mode, seed, variant: 'tonalSpot', contrast: 'standard' });

  let css = '';
  for (let i = 0; i < root.style.length; i += 1) {
    const prop = root.style[i];
    if (prop.startsWith('--md-sys-color-')) {
      css += `${prop}: ${root.style.getPropertyValue(prop)};`;
    }
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, seed, css }));
  } catch {
    // ignore storage write errors
  }

  window.dispatchEvent(
    new CustomEvent<ThemeChangeDetail>(THEME_CHANGE_EVENT, {
      detail: { mode, seed },
    }),
  );
}
