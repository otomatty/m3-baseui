import { useEffect, useState } from 'react';
import { FabMenu } from '@m3-baseui/react-tailwind';
import { Icon } from '@m3-baseui/icons';
import {
  applyTheme,
  DEFAULT_SEED,
  readStored,
  SEEDS,
  THEME_CHANGE_EVENT,
  type ThemeChangeDetail,
  type ThemeMode,
} from '../lib/docs-theme';

function SeedSwatch({ value }: { value: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-5 shrink-0 rounded-full border border-outline"
      style={{ background: value }}
    />
  );
}

export function ThemeFab() {
  // Match DocsNav: SSR/client first paint uses defaults, then hydrate from storage.
  const [mode, setMode] = useState<ThemeMode>('light');
  const [seed, setSeed] = useState(DEFAULT_SEED);

  useEffect(() => {
    const stored = readStored();
    setMode(stored.mode);
    setSeed(stored.seed);
    applyTheme(stored.mode, stored.seed);

    const onThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail;
      setMode(detail.mode);
      setSeed(detail.seed);
    };

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  }, []);

  const selectSeed = (next: string) => {
    setSeed(next);
    applyTheme(mode, next);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-end px-4 sm:px-6 lg:pr-8">
      <div className="pointer-events-auto">
        <FabMenu.Root>
          <FabMenu.Trigger color="primary" aria-label="テーマカラーを切り替え">
            <Icon name="palette" />
          </FabMenu.Trigger>
          <FabMenu.Portal>
            <FabMenu.Positioner sideOffset={12} align="end" side="top">
              <FabMenu.Popup>
                {SEEDS.map((option) => (
                  <FabMenu.Item
                    key={option.value}
                    icon={<SeedSwatch value={option.value} />}
                    aria-current={seed === option.value ? 'true' : undefined}
                    onClick={() => selectSeed(option.value)}
                  >
                    {option.name}
                  </FabMenu.Item>
                ))}
              </FabMenu.Popup>
            </FabMenu.Positioner>
          </FabMenu.Portal>
        </FabMenu.Root>
      </div>
    </div>
  );
}
