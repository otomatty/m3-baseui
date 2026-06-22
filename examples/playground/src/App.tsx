import { useState } from 'react';
import {
  Button,
  IconButton,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  Chip,
  Tooltip,
  Dialog,
  Menu,
  Tabs,
  Slider,
  Select,
  ThemeProvider,
  useTheme,
} from '@m3/react-tailwind';
import type { ButtonVariant } from '@m3/react-tailwind';
import { Icon } from '@m3/icons';

const BUTTON_VARIANTS: ButtonVariant[] = ['filled', 'tonal', 'outlined', 'elevated', 'text'];

function ModeToggle() {
  const { resolvedMode, setMode } = useTheme();
  return (
    <IconButton
      variant="tonal"
      aria-label="テーマ切替"
      onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
    >
      <Icon name={resolvedMode === 'dark' ? 'light_mode' : 'dark_mode'} />
    </IconButton>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-title-medium text-on-surface-variant">{title}</h2>
      {children}
    </section>
  );
}

export function App() {
  const [seed, setSeed] = useState('#6750A4');
  const [filterOn, setFilterOn] = useState(true);

  return (
    <ThemeProvider seed={seed} scheme="tonalSpot" mode="system">
      <main className="min-h-screen p-10 flex flex-col gap-10 max-w-3xl mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-headline-medium">M3 on Base UI</h1>
          <ModeToggle />
        </header>

        <Section title="Button">
          <div className="flex flex-wrap gap-3">
            {BUTTON_VARIANTS.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {BUTTON_VARIANTS.map((v) => (
              <Button key={v} variant={v} disabled>
                {v}
              </Button>
            ))}
          </div>
        </Section>

        <Section title="Icon Button">
          <div className="flex flex-wrap items-center gap-3">
            <IconButton variant="standard" aria-label="お気に入り">
              <Icon name="favorite" />
            </IconButton>
            <IconButton variant="filled" aria-label="追加">
              <Icon name="add" />
            </IconButton>
            <IconButton variant="tonal" aria-label="編集">
              <Icon name="edit" />
            </IconButton>
            <IconButton variant="outlined" aria-label="その他">
              <Icon name="more_vert" />
            </IconButton>
            <IconButton variant="outlined" selected aria-label="ブックマーク">
              <Icon name="bookmark" filled />
            </IconButton>
            <IconButton variant="filled" disabled aria-label="無効">
              <Icon name="delete" />
            </IconButton>
          </div>
        </Section>

        <Section title="Selection controls">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <Switch defaultChecked />
              <Switch />
              <Switch disabled defaultChecked />
            </div>
            <label className="flex items-center gap-2 text-body-medium cursor-pointer">
              <Checkbox defaultChecked /> Checkbox
            </label>
            <label className="flex items-center gap-2 text-body-medium cursor-pointer">
              <Checkbox indeterminate /> Indeterminate
            </label>
            <RadioGroup defaultValue="a">
              <label className="flex items-center gap-2 text-body-medium cursor-pointer">
                <Radio value="a" /> オプション A
              </label>
              <label className="flex items-center gap-2 text-body-medium cursor-pointer">
                <Radio value="b" /> オプション B
              </label>
            </RadioGroup>
          </div>
        </Section>

        <Section title="Chip">
          <div className="flex flex-wrap items-center gap-3">
            <Chip variant="assist">
              <Icon name="event" size={18} /> Assist
            </Chip>
            <Chip variant="filter" selected={filterOn} onSelectedChange={setFilterOn}>
              {filterOn ? <Icon name="check" size={18} /> : null} Filter
            </Chip>
            <Chip variant="suggestion">Suggestion</Chip>
            <Chip variant="input" onRemove={() => {}}>
              Input
            </Chip>
          </div>
        </Section>

        <Section title="Slider">
          <Slider.Root defaultValue={40} className="max-w-sm">
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </Section>

        <Section title="Tabs">
          <Tabs.Root defaultValue="overview" variant="primary">
            <Tabs.List>
              <Tabs.Tab value="overview">概要</Tabs.Tab>
              <Tabs.Tab value="specs">仕様</Tabs.Tab>
              <Tabs.Tab value="reviews">レビュー</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value="overview" className="text-body-medium">
              概要のコンテンツ
            </Tabs.Panel>
            <Tabs.Panel value="specs" className="text-body-medium">
              仕様のコンテンツ
            </Tabs.Panel>
            <Tabs.Panel value="reviews" className="text-body-medium">
              レビューのコンテンツ
            </Tabs.Panel>
          </Tabs.Root>
        </Section>

        <Section title="Menu / Select / Tooltip / Dialog">
          <div className="flex flex-wrap items-center gap-3">
            <Menu.Root>
              <Menu.Trigger render={<Button variant="tonal" />}>メニュー</Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner sideOffset={8}>
                  <Menu.Popup>
                    <Menu.Item>プロフィール</Menu.Item>
                    <Menu.Item>設定</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item>ログアウト</Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>

            <Select.Root defaultValue="apple">
              <Select.Trigger>
                <Select.Value />
                <Select.Icon>
                  <Icon name="arrow_drop_down" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner sideOffset={4}>
                  <Select.Popup>
                    {[
                      ['apple', 'りんご'],
                      ['banana', 'バナナ'],
                      ['cherry', 'さくらんぼ'],
                    ].map(([value, label]) => (
                      <Select.Item key={value} value={value}>
                        <Select.ItemIndicator>
                          <Icon name="check" size={20} />
                        </Select.ItemIndicator>
                        <Select.ItemText>{label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>

            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger render={<IconButton variant="standard" aria-label="情報" />}>
                  <Icon name="info" />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Positioner sideOffset={6}>
                    <Tooltip.Popup>説明的なツールチップ</Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>

            <Dialog.Root>
              <Dialog.Trigger render={<Button variant="filled" />}>ダイアログ</Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Popup>
                  <Dialog.Title>変更を保存しますか？</Dialog.Title>
                  <Dialog.Description>
                    この操作は取り消せません。保存して続行してください。
                  </Dialog.Description>
                  <div className="flex justify-end gap-2">
                    <Dialog.Close render={<Button variant="text" />}>キャンセル</Dialog.Close>
                    <Dialog.Close render={<Button variant="filled" />}>保存</Dialog.Close>
                  </div>
                </Dialog.Popup>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </Section>

        <Section title="Dynamic color (seed)">
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
        </Section>
      </main>
    </ThemeProvider>
  );
}
