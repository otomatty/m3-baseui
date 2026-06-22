import { useState } from 'react';
import { Button, ThemeProvider, useTheme } from '@m3/react-tailwind';
import type { ButtonVariant } from '@m3/react-tailwind';

const VARIANTS: ButtonVariant[] = ['filled', 'tonal', 'outlined', 'elevated', 'text'];

function ModeToggle() {
  const { resolvedMode, setMode } = useTheme();
  return (
    <Button
      variant="tonal"
      onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
    >
      {resolvedMode === 'dark' ? 'ライトに切替' : 'ダークに切替'}
    </Button>
  );
}

export function App() {
  const [seed, setSeed] = useState('#6750A4');

  return (
    <ThemeProvider seed={seed} scheme="tonalSpot" mode="system">
      <main className="min-h-screen p-10 flex flex-col gap-8 max-w-2xl mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-headline-medium">M3 on Base UI</h1>
          <ModeToggle />
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="text-title-medium text-on-surface-variant">Button variants</h2>
          <div className="flex flex-wrap gap-3">
            {VARIANTS.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {VARIANTS.map((v) => (
              <Button key={v} variant={v} disabled>
                {v}
              </Button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-title-medium text-on-surface-variant">Dynamic color (seed)</h2>
          <div className="flex items-center gap-3">
            {['#6750A4', '#386A20', '#B3261E', '#00639B'].map((c) => (
              <button
                key={c}
                onClick={() => setSeed(c)}
                aria-label={`seed ${c}`}
                className="size-8 rounded-full border border-outline"
                style={{ background: c }}
              />
            ))}
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}
