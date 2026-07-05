import { useEffect, useRef, useState } from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import {
  Button,
  Dialog,
  IconButton,
  NavigationDrawer,
  NavigationRail,
  TopAppBar,
  applyScheme,
  generateScheme,
} from '@m3-baseui/react-tailwind';
import { Icon } from '@m3-baseui/icons';
import { COMPONENT_GROUPS } from '../../config/docs-nav';

/**
 * DocsNav — the M3-official-style navigation for the docs.
 *
 * Replaces the top header. On medium+ windows it is a full-height NavigationRail:
 * top-level destinations (icon + label), a hover/focus flyout that reveals the
 * component list with collapsible groups, and theme + GitHub controls pinned to
 * the bottom. On compact windows it is a TopAppBar whose menu button opens a
 * modal NavigationDrawer (Base UI Dialog: backdrop + focus trap) with the same
 * collapsible navigation. Theme (mode + dynamic color) is applied to <html> so
 * the whole static site and portaled surfaces react.
 */
const cn = (...c: Array<string | false | undefined>): string => c.filter(Boolean).join(' ');

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

interface RailItem {
  value: string;
  label: string;
  href: string;
  icon: string;
  expandable?: boolean;
}

const RAIL_ITEMS: RailItem[] = [
  { value: 'home', label: 'はじめに', href: '/docs', icon: 'menu_book' },
  {
    value: 'getting-started',
    label: '導入',
    href: '/docs/getting-started',
    icon: 'rocket_launch',
  },
  { value: 'theming', label: 'テーマ', href: '/docs/theming', icon: 'palette' },
  {
    value: 'engines',
    label: 'エンジン',
    href: '/docs/engines',
    icon: 'layers',
  },
  {
    value: 'components',
    label: '部品',
    href: '/docs/components',
    icon: 'widgets',
    expandable: true,
  },
];

const COMPONENTS_HREF = '/docs/components';

function activeValue(path: string): string {
  if (path.startsWith('/docs/components')) return 'components';
  if (path.startsWith('/docs/getting-started')) return 'getting-started';
  if (path.startsWith('/docs/theming')) return 'theming';
  if (path.startsWith('/docs/engines')) return 'engines';
  if (path === '/docs' || path === '/docs/') return 'home';
  // No rail destination is active outside the docs (e.g. the landing page).
  return '';
}

function isActivePath(href: string, path: string): boolean {
  return path === href || path === `${href}/`;
}

/** The component group that contains the current page (for default-open state). */
function currentGroupTitle(path: string): string | undefined {
  return COMPONENT_GROUPS.find((g) => g.items.some((i) => isActivePath(i.href, path)))?.title;
}

interface GroupsProps {
  currentPath: string;
}

/** Collapsible component groups shared by the desktop flyout and the mobile drawer. */
function CollapsibleGroups({ currentPath }: GroupsProps) {
  const [open, setOpen] = useState<Set<string>>(() => {
    const g = currentGroupTitle(currentPath);
    return new Set(g ? [g] : []);
  });
  const toggle = (title: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  return (
    <ul className="flex flex-col">
      {COMPONENT_GROUPS.map((group) => {
        const expanded = open.has(group.title);
        return (
          <li key={group.title}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => toggle(group.title)}
              className="flex w-full items-center justify-between rounded-medium px-3 py-2 text-label-large text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
            >
              <span>{group.title}</span>
              <Icon
                name="expand_more"
                size={20}
                className={cn('transition-transform duration-150', expanded && 'rotate-180')}
              />
            </button>
            {expanded ? (
              <ul className="mb-1 flex flex-col gap-0.5 pb-1 pl-2">
                {group.items.map((item) => {
                  const active = isActivePath(item.href, currentPath);
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'block rounded-full px-4 py-2 text-body-medium transition-colors',
                          active
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

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

/** Apply the generated scheme + mode onto <html> and cache the color vars. */
function applyTheme(mode: Mode, seed: string): void {
  const root = document.documentElement;
  const schemes = generateScheme(seed, 'tonalSpot', 'standard');
  applyScheme(root, mode === 'dark' ? schemes.dark : schemes.light);
  root.setAttribute('data-theme', mode);

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

/** GitHub のロゴマーク（Material Symbols には無いため SVG で実装）。 */
function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

interface ThemeMenuBodyProps {
  mode: Mode;
  seed: string;
  onMode: (m: Mode) => void;
  onSeed: (s: string) => void;
}

/** The mode + seed picker used inside the desktop theme Dialog and the mobile drawer. */
function ThemeMenuBody({ mode, seed, onMode, onSeed }: ThemeMenuBodyProps) {
  return (
    <div className="w-full">
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
              onClick={() => onMode(option.value)}
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
              onClick={() => onSeed(option.value)}
              className={
                active
                  ? 'relative flex size-9 items-center justify-center rounded-full ring-2 ring-primary ring-offset-2 ring-offset-surface-container-low transition-transform'
                  : 'relative flex size-9 items-center justify-center rounded-full transition-transform hover:scale-110'
              }
              style={{ background: option.value }}
            >
              {active ? <Icon name="check" size={20} className="text-white drop-shadow" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DocsNavProps {
  currentPath?: string;
}

export function DocsNav({ currentPath = '/docs' }: DocsNavProps) {
  const active = activeValue(currentPath);
  const [mode, setMode] = useState<Mode>('light');
  const [seed, setSeed] = useState<string>(DEFAULT_SEED);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerComponentsOpen, setDrawerComponentsOpen] = useState(active === 'components');
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const stored = readStored();
    setMode(stored.mode);
    setSeed(stored.seed);
    applyTheme(stored.mode, stored.seed);
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const changeMode = (next: Mode) => {
    setMode(next);
    applyTheme(next, seed);
  };
  const changeSeed = (next: string) => {
    setSeed(next);
    applyTheme(mode, next);
  };

  const openFlyout = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setFlyoutOpen(true);
  };
  const scheduleCloseFlyout = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setFlyoutOpen(false), 120);
  };

  const dark = mode === 'dark';

  return (
    <>
      {/* --- Mobile: TopAppBar + modal NavigationDrawer --- */}
      <DialogPrimitive.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
        <div className="sticky top-0 z-30 border-b border-outline-variant bg-surface lg:hidden">
          <TopAppBar
            variant="small"
            leading={
              <DialogPrimitive.Trigger
                render={
                  <IconButton variant="standard" aria-label="ナビゲーションを開く">
                    <Icon name="menu" />
                  </IconButton>
                }
              />
            }
            trailing={
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
            }
          >
            <a href="/docs" className="flex items-center gap-2 text-title-medium text-on-surface">
              <Icon name="palette" className="text-primary" />
              m3-baseui
            </a>
          </TopAppBar>
        </div>

        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-40 bg-scrim/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <DialogPrimitive.Popup className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-[320px] flex-col overflow-y-auto rounded-e-large bg-surface-container-low p-3 shadow-level2 transition-transform duration-300 ease-emphasized data-ending-style:-translate-x-full data-starting-style:-translate-x-full">
            <div className="mb-2 flex items-center gap-2 px-2 py-2">
              <DialogPrimitive.Close
                render={
                  <IconButton variant="standard" aria-label="ナビゲーションを閉じる">
                    <Icon name="menu_open" />
                  </IconButton>
                }
              />
              <a href="/docs" className="flex items-center gap-2 text-title-medium text-on-surface">
                <Icon name="palette" className="text-primary" />
                m3-baseui
              </a>
            </div>

            <nav aria-label="ドキュメント" className="flex flex-col gap-1">
              {RAIL_ITEMS.map((item) => {
                if (!item.expandable) {
                  return (
                    <NavigationDrawer.Item
                      key={item.value}
                      href={item.href}
                      leading={<Icon name={item.icon} />}
                      selected={active === item.value}
                    >
                      {item.label}
                    </NavigationDrawer.Item>
                  );
                }
                return (
                  <div key={item.value}>
                    <NavigationDrawer.Item
                      aria-expanded={drawerComponentsOpen}
                      onClick={() => setDrawerComponentsOpen((v) => !v)}
                      leading={<Icon name={item.icon} />}
                      selected={active === item.value}
                      trailing={
                        <Icon
                          name="expand_more"
                          className={cn(
                            'transition-transform duration-150',
                            drawerComponentsOpen && 'rotate-180',
                          )}
                        />
                      }
                    >
                      コンポーネント
                    </NavigationDrawer.Item>
                    {drawerComponentsOpen ? (
                      <div className="mt-1 pl-3">
                        <a
                          href={COMPONENTS_HREF}
                          aria-current={
                            active === 'components' && currentPath === COMPONENTS_HREF
                              ? 'page'
                              : undefined
                          }
                          className="mb-1 block rounded-full px-4 py-2 text-body-medium text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                        >
                          コンポーネント一覧
                        </a>
                        <CollapsibleGroups currentPath={currentPath} />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-3 px-2 pt-6">
              <Button
                variant="outlined"
                startIcon={<Icon name={dark ? 'light_mode' : 'dark_mode'} />}
                onClick={() => changeMode(dark ? 'light' : 'dark')}
              >
                {dark ? 'ライトモードに切替' : 'ダークモードに切替'}
              </Button>
              {/* biome-ignore lint/a11y/useSemanticElements: toolbar-style swatch group, not a form fieldset */}
              <div role="group" aria-label="配色（シード色）" className="flex flex-wrap gap-2 px-1">
                {SEEDS.map((option) => {
                  const isActiveSeed = seed === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      title={option.name}
                      aria-label={option.name}
                      aria-pressed={isActiveSeed}
                      onClick={() => changeSeed(option.value)}
                      className={
                        isActiveSeed
                          ? 'relative flex size-8 items-center justify-center rounded-full ring-2 ring-primary ring-offset-2 ring-offset-surface-container-low'
                          : 'relative flex size-8 items-center justify-center rounded-full'
                      }
                      style={{ background: option.value }}
                    >
                      {isActiveSeed ? (
                        <Icon name="check" size={18} className="text-white drop-shadow" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      {/* --- Desktop: full-height NavigationRail + hover flyout --- */}
      <aside
        className="fixed left-0 top-0 z-30 hidden h-screen w-20 flex-col border-r border-outline-variant bg-surface lg:flex"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFlyoutOpen(false);
        }}
      >
        <a
          href="/"
          className="flex h-16 shrink-0 items-center justify-center"
          aria-label="ホームへ戻る"
        >
          <Icon name="palette" className="text-primary" size={28} />
        </a>

        <div className="min-h-0 flex-1">
          <NavigationRail.Root
            value={[active]}
            aria-label="ドキュメントのセクション"
            className="h-full"
          >
            {RAIL_ITEMS.map((item) => (
              <NavigationRail.Item
                key={item.value}
                value={item.value}
                icon={<Icon name={item.icon} />}
                aria-current={item.value === active ? 'page' : undefined}
                // biome-ignore lint/a11y/useAnchorContent: icon + label are injected as children by NavigationRail.Item's render
                render={<a href={item.href} />}
                {...(item.expandable
                  ? {
                      onMouseEnter: openFlyout,
                      onMouseLeave: scheduleCloseFlyout,
                      onFocus: openFlyout,
                    }
                  : {})}
              >
                {item.label}
              </NavigationRail.Item>
            ))}
          </NavigationRail.Root>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1 py-3">
          <Dialog.Root>
            <Dialog.Trigger
              render={
                <IconButton variant="standard" aria-label="テーマ設定">
                  <Icon name={dark ? 'dark_mode' : 'light_mode'} />
                </IconButton>
              }
            />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup style={{ width: '360px' }}>
                <Dialog.Title>テーマ設定</Dialog.Title>
                <ThemeMenuBody mode={mode} seed={seed} onMode={changeMode} onSeed={changeSeed} />
                <Dialog.Actions>
                  <Dialog.Close render={<Button variant="text">閉じる</Button>} />
                </Dialog.Actions>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>

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
        </div>

        {/* Hover/focus flyout: slides out from behind the rail. The clip
            wrapper (overflow-hidden, flush with the rail's right edge) hides the
            panel while it is translated off to the left, so it appears to emerge
            from behind the rail. */}
        <div
          aria-hidden={!flyoutOpen}
          inert={!flyoutOpen ? '' : undefined}
          className="pointer-events-none absolute left-full top-0 z-40 h-screen w-80 overflow-hidden"
        >
          {/* biome-ignore lint/a11y/noStaticElementInteractions: hover-intent bridge; keyboard open/close is handled via the rail item onFocus and the aside onBlur */}
          <div
            onMouseEnter={openFlyout}
            onMouseLeave={scheduleCloseFlyout}
            className={cn(
              'pointer-events-auto flex h-full w-72 flex-col overflow-y-auto rounded-e-large bg-surface-container-low p-3 shadow-level2',
              'transition-transform duration-300 ease-emphasized will-change-transform',
              flyoutOpen ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <p className="px-3 pb-1 pt-2 text-title-small text-on-surface-variant">
              コンポーネント
            </p>
            <a
              href={COMPONENTS_HREF}
              aria-current={currentPath === COMPONENTS_HREF ? 'page' : undefined}
              className={cn(
                'mb-1 block rounded-full px-4 py-2 text-body-medium transition-colors',
                currentPath === COMPONENTS_HREF
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
              )}
            >
              コンポーネント一覧
            </a>
            <CollapsibleGroups currentPath={currentPath} />
          </div>
        </div>
      </aside>
    </>
  );
}
