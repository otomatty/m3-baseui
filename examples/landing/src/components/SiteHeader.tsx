import { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  TopAppBar,
  applyScheme,
  generateScheme,
} from '@m3-baseui/react-tailwind';
import { Icon } from '@m3-baseui/icons';

/** GitHub のロゴマーク（Material Symbols には無いため SVG で実装）。 */
function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

type Mode = 'light' | 'dark';

interface SeedOption {
  name: string;
  value: string;
}

const STORAGE_KEY = 'm3-docs-theme';
const DEFAULT_SEED = '#6750A4';

const SEEDS: SeedOption[] = [
  { name: 'パープル', value: '#6750A4' },
  { name: 'ブルー', value: '#00639B' },
  { name: 'グリーン', value: '#386A20' },
  { name: 'レッド', value: '#B3261E' },
  { name: 'オレンジ', value: '#8B5000' },
  { name: 'ピンク', value: '#7D5260' },
  { name: 'ティール', value: '#006A6A' },
];

const NAV_LINKS = [
  { label: 'ホーム', href: '/' },
  { label: 'ドキュメント', href: '/docs' },
  { label: 'コンポーネント', href: '/docs/components' },
];

interface StoredTheme {
  mode: Mode;
  seed: string;
  css?: string;
}

function readStored(): StoredTheme {
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

/**
 * Apply the generated scheme + mode onto <html> so the whole static site
 * (and portaled surfaces) react to the theme, then cache the serialized vars
 * for the inline head script to restore instantly on the next load.
 */
function applyTheme(mode: Mode, seed: string): void {
  const root = document.documentElement;
  const schemes = generateScheme(seed, 'tonalSpot', 'standard');
  applyScheme(root, mode === 'dark' ? schemes.dark : schemes.light);
  root.setAttribute('data-theme', mode);

  // Cache only the color custom properties so the inline head script can restore
  // them before paint. We deliberately skip `root.style.cssText` since portaled
  // surfaces (Menu) temporarily add scroll-lock styles we must not persist.
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
}

interface SiteHeaderProps {
  currentPath?: string;
}

export function SiteHeader({ currentPath = '/' }: SiteHeaderProps) {
  const [mode, setMode] = useState<Mode>('light');
  const [seed, setSeed] = useState<string>(DEFAULT_SEED);

  useEffect(() => {
    const stored = readStored();
    setMode(stored.mode);
    setSeed(stored.seed);
    applyTheme(stored.mode, stored.seed);
  }, []);

  const changeMode = (next: Mode) => {
    setMode(next);
    applyTheme(next, seed);
  };

  const changeSeed = (next: string) => {
    setSeed(next);
    applyTheme(mode, next);
  };

  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath === href || currentPath.startsWith(`${href}/`);

  const dark = mode === 'dark';

  return (
    <div className="sticky top-0 z-50 border-b border-outline-variant bg-surface">
      <TopAppBar
        variant="small"
        className="mx-auto max-w-7xl bg-surface px-2 sm:px-4"
        leading={
          <div className="flex items-center gap-1 sm:gap-3">
            <a href="/" className="flex items-center gap-2 px-2 text-title-medium text-on-surface">
              <Icon name="palette" className="text-primary" />
              <span className="hidden sm:inline">m3-baseui</span>
            </a>
            <nav className="flex items-center gap-1" aria-label="サイト">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={
                    isActive(link.href)
                      ? 'rounded-full bg-primary-container px-3 py-1.5 text-label-large text-on-primary-container'
                      : 'rounded-full px-3 py-1.5 text-label-large text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface'
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        }
        trailing={
          <>
            <Menu.Root>
              <Menu.Trigger
                render={
                  <Button variant="text" startIcon={<Icon name={dark ? 'dark_mode' : 'light_mode'} />}>
                    テーマ
                  </Button>
                }
              />
              <Menu.Portal>
                <Menu.Positioner sideOffset={8} align="end">
                  <Menu.Popup>
                    <div className="w-64 p-3">
                      <p className="mb-2 text-label-medium text-on-surface-variant">表示モード</p>
                      {/* biome-ignore lint/a11y/useSemanticElements: toolbar-style button group, not a form fieldset */}
                      <div
                        role="group"
                        aria-label="表示モード"
                        className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-surface-container-highest p-1"
                      >
                        {(
                          [
                            { value: 'light', label: 'ライト', icon: 'light_mode' },
                            { value: 'dark', label: 'ダーク', icon: 'dark_mode' },
                          ] as const
                        ).map((option) => {
                          const active = mode === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              aria-pressed={active}
                              onClick={() => changeMode(option.value)}
                              className={
                                active
                                  ? 'flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-label-large text-on-primary'
                                  : 'flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-label-large text-on-surface-variant transition-colors hover:bg-surface-container-high'
                              }
                            >
                              <Icon name={option.icon} size={18} />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>

                      <p className="mb-2 text-label-medium text-on-surface-variant">配色（シード色）</p>
                      {/* biome-ignore lint/a11y/useSemanticElements: toolbar-style button group, not a form fieldset */}
                      <div role="group" aria-label="配色（シード色）" className="flex flex-wrap gap-2">
                        {SEEDS.map((option) => {
                          const active = seed === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              title={option.name}
                              aria-label={option.name}
                              aria-pressed={active}
                              onClick={() => changeSeed(option.value)}
                              className={
                                active
                                  ? 'relative flex size-9 items-center justify-center rounded-full ring-2 ring-primary ring-offset-2 ring-offset-surface-container-low transition-transform'
                                  : 'relative flex size-9 items-center justify-center rounded-full transition-transform hover:scale-110'
                              }
                              style={{ background: option.value }}
                            >
                              {active ? (
                                <Icon name="check" size={20} className="text-white drop-shadow" />
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>

            <IconButton
              variant="standard"
              render={
                // biome-ignore lint/a11y/useAnchorContent: icon + accessible name are injected by IconButton's render
                <a
                  href="https://github.com/otomatty/m3-baseui"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub リポジトリ（新しいタブで開く）"
                />
              }
            >
              <GithubMark />
            </IconButton>
          </>
        }
      >
        <span className="sr-only">m3-baseui ドキュメント</span>
      </TopAppBar>
    </div>
  );
}
