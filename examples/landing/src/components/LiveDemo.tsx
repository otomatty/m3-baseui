import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Slider,
  Switch,
  TextField,
  ThemeProvider,
  useTheme,
} from '@m3-baseui/react-tailwind';
import { Icon } from '@m3-baseui/icons';

const SEEDS = ['#6750A4', '#386A20', '#B3261E', '#00639B', '#7D5260'];

function ModeToggle() {
  const { resolvedMode, setMode } = useTheme();
  const dark = resolvedMode === 'dark';
  return (
    <IconButton
      variant="tonal"
      aria-label={dark ? 'ライトモードに切替' : 'ダークモードに切替'}
      onClick={() => setMode(dark ? 'light' : 'dark')}
    >
      <Icon name={dark ? 'light_mode' : 'dark_mode'} />
    </IconButton>
  );
}

function Showcase() {
  const [agree, setAgree] = useState(true);
  const [notify, setNotify] = useState(true);
  const [filter, setFilter] = useState(true);

  return (
    <Card variant="elevated" className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="text-title-medium">コンポーネント</span>
        <ModeToggle />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="filled">Filled</Button>
        <Button variant="tonal">Tonal</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Chip variant="filter" selected={filter} onSelectedChange={setFilter}>
          フィルター
        </Chip>
        <Chip variant="assist">
          <Icon name="star" size={18} />
          おすすめ
        </Chip>
      </div>

      <TextField variant="outlined" label="メールアドレス" />

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 text-body-large">
          <Switch checked={notify} onCheckedChange={setNotify} />
          通知を受け取る
        </label>
        <label className="flex items-center gap-3 text-body-large">
          <Checkbox checked={agree} onCheckedChange={setAgree} />
          利用規約に同意する
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-body-medium text-on-surface-variant">音量</span>
        <Slider.Root defaultValue={60}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb aria-label="音量" />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      </div>
    </Card>
  );
}

export function LiveDemo() {
  const [seed, setSeed] = useState(SEEDS[0]);

  return (
    <ThemeProvider seed={seed} scheme="tonalSpot" mode="light">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-body-medium text-on-surface-variant">配色シード:</span>
          {SEEDS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSeed(c)}
              aria-label={`シード ${c}`}
              aria-pressed={seed === c}
              className="size-7 rounded-full border border-outline transition-transform hover:scale-110 aria-pressed:ring-2 aria-pressed:ring-primary"
              style={{ background: c }}
            />
          ))}
        </div>
        <Showcase />
      </div>
    </ThemeProvider>
  );
}
