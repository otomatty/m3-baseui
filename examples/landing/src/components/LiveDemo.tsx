import { useEffect, useState } from 'react';
import { Button, Card, IconButton, TextField } from '@m3-baseui/react-tailwind';
import { Icon } from '@m3-baseui/icons';
import {
  applyTheme,
  readStored,
  THEME_CHANGE_EVENT,
  type ThemeChangeDetail,
  type ThemeMode,
} from '../lib/docs-theme';

function ModeToggle({ mode, seed }: { mode: ThemeMode; seed: string }) {
  const dark = mode === 'dark';
  return (
    <IconButton
      variant="tonal"
      aria-label={dark ? 'ライトモードに切替' : 'ダークモードに切替'}
      onClick={() => applyTheme(dark ? 'light' : 'dark', seed)}
    >
      <Icon name={dark ? 'light_mode' : 'dark_mode'} />
    </IconButton>
  );
}

function Showcase({ mode, seed }: { mode: ThemeMode; seed: string }) {
  return (
    <Card variant="elevated" className="flex flex-col gap-4 p-4 sm:p-5">
      <div className="flex items-center justify-end">
        <ModeToggle mode={mode} seed={seed} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="filled">Filled</Button>
        <Button variant="tonal">Tonal</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </div>

      <TextField variant="outlined" label="メールアドレス" />
    </Card>
  );
}

export function LiveDemo() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [seed, setSeed] = useState(readStored().seed);

  useEffect(() => {
    const stored = readStored();
    setMode(stored.mode);
    setSeed(stored.seed);

    const onThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail;
      setMode(detail.mode);
      setSeed(detail.seed);
    };

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  }, []);

  return <Showcase mode={mode} seed={seed} />;
}
