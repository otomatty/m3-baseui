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
  TextField,
  NavigationBar,
  Fab,
  Snackbar,
  useSnackbar,
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

function SnackbarDemo() {
  const { add } = useSnackbar();
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="tonal" onClick={() => add({ title: '変更を保存しました' })}>
          単一行
        </Button>
        <Button
          variant="tonal"
          onClick={() =>
            add({
              title: 'メッセージをアーカイブしました',
              description: '受信トレイから移動しました',
              actionProps: { children: '元に戻す' },
            })
          }
        >
          アクション付き
        </Button>
      </div>
      <Snackbar.Viewport>
        <SnackbarList />
      </Snackbar.Viewport>
    </>
  );
}

function SnackbarList() {
  const { toasts } = useSnackbar();
  return (
    <>
      {toasts.map((toast) => (
        <Snackbar.Root key={toast.id} toast={toast}>
          <Snackbar.Content>
            <Snackbar.Title />
            {toast.description ? <Snackbar.Description /> : null}
          </Snackbar.Content>
          {toast.actionProps ? <Snackbar.Action /> : null}
          <Snackbar.Close aria-label="閉じる">
            <Icon name="close" size={20} />
          </Snackbar.Close>
        </Snackbar.Root>
      ))}
    </>
  );
}

export function App() {
  const [seed, setSeed] = useState('#6750A4');
  const [filterOn, setFilterOn] = useState(true);
  const [nav, setNav] = useState<string[]>(['home']);

  return (
    <ThemeProvider seed={seed} scheme="tonalSpot" mode="system">
      <Snackbar.Provider>
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
            <div className="flex flex-wrap gap-3">
              <Button variant="filled" startIcon={<Icon name="add" size={18} />}>
                Leading
              </Button>
              <Button variant="tonal" endIcon={<Icon name="arrow_forward" size={18} />}>
                Trailing
              </Button>
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
            {/* M3 Expressive sizes (xs → xl) */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <IconButton variant="tonal" size="xs" aria-label="XS">
                <Icon name="favorite" size={20} />
              </IconButton>
              <IconButton variant="tonal" size="s" aria-label="S">
                <Icon name="favorite" size={24} />
              </IconButton>
              <IconButton variant="tonal" size="m" aria-label="M">
                <Icon name="favorite" size={24} />
              </IconButton>
              <IconButton variant="tonal" size="l" aria-label="L">
                <Icon name="favorite" size={32} />
              </IconButton>
              <IconButton variant="tonal" size="xl" aria-label="XL">
                <Icon name="favorite" size={40} />
              </IconButton>
              {/* narrow / default / wide widths */}
              <IconButton variant="filled" size="m" width="narrow" aria-label="Narrow">
                <Icon name="add" size={24} />
              </IconButton>
              <IconButton variant="filled" size="m" width="wide" aria-label="Wide">
                <Icon name="add" size={24} />
              </IconButton>
            </div>
          </Section>

          <Section title="Selection controls">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <Switch defaultChecked />
                <Switch />
                <Switch disabled defaultChecked />
                <Switch
                  defaultChecked
                  icons={{
                    checked: <Icon name="check" size={16} />,
                    unchecked: <Icon name="close" size={16} />,
                  }}
                />
              </div>
              <label className="flex items-center gap-2 text-body-medium cursor-pointer">
                <Checkbox defaultChecked /> Checkbox
              </label>
              <label className="flex items-center gap-2 text-body-medium cursor-pointer">
                <Checkbox indeterminate /> Indeterminate
              </label>
              <label className="flex items-center gap-2 text-body-medium cursor-pointer">
                <Checkbox error /> Error
              </label>
              <RadioGroup defaultValue="a">
                <label className="flex items-center gap-2 text-body-medium cursor-pointer">
                  <Radio value="a" /> オプション A
                </label>
                <label className="flex items-center gap-2 text-body-medium cursor-pointer">
                  <Radio value="b" /> オプション B
                </label>
                <label className="flex items-center gap-2 text-body-medium cursor-pointer">
                  <Radio value="c" error /> エラー
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
              <Chip variant="assist" elevated>
                <Icon name="bolt" size={18} /> Elevated
              </Chip>
              <Chip variant="input" avatar={<Icon name="person" size={18} />} onRemove={() => {}}>
                Avatar
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

          <Section title="TextField">
            <div className="flex flex-wrap gap-4">
              <TextField label="名前" supportingText="姓と名" />
              <TextField
                variant="outlined"
                label="メール"
                leadingIcon={<Icon name="mail" size={20} />}
              />
              <TextField
                label="ユーザー名"
                defaultValue="taro"
                showCounter
                maxLength={20}
                trailingIcon={<Icon name="person" size={20} />}
              />
              <TextField
                variant="outlined"
                label="パスワード"
                error
                supportingText="必須項目です"
              />
            </div>
          </Section>

          <Section title="FAB / FAB Menu">
            <div className="flex flex-wrap items-center gap-4">
              <Fab size="small" color="surface" aria-label="編集">
                <Icon name="edit" />
              </Fab>
              <Fab color="primary" aria-label="追加">
                <Icon name="add" />
              </Fab>
              <Fab size="large" color="secondary" aria-label="作成">
                <Icon name="edit" />
              </Fab>
              <Fab size="extended" color="tertiary">
                <Icon name="add" /> 作成
              </Fab>
              <Menu.Root>
                <Menu.Trigger render={<Fab color="primary" aria-label="FAB メニュー" />}>
                  <Icon name="add" />
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner sideOffset={8}>
                    <Menu.Popup>
                      <Menu.Item>ドキュメント</Menu.Item>
                      <Menu.Item>スプレッドシート</Menu.Item>
                      <Menu.Item>スライド</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            </div>
          </Section>

          <Section title="Snackbar">
            <SnackbarDemo />
          </Section>

          <Section title="NavigationBar">
            <div className="max-w-md rounded-large overflow-hidden border border-outline-variant">
              <NavigationBar.Root value={nav} onValueChange={setNav}>
                <NavigationBar.Item value="home" icon={<Icon name="home" />}>
                  ホーム
                </NavigationBar.Item>
                <NavigationBar.Item value="search" icon={<Icon name="search" />}>
                  検索
                </NavigationBar.Item>
                <NavigationBar.Item value="favorites" icon={<Icon name="favorite" />}>
                  お気に入り
                </NavigationBar.Item>
                <NavigationBar.Item value="profile" icon={<Icon name="person" />}>
                  プロフィール
                </NavigationBar.Item>
              </NavigationBar.Root>
            </div>
          </Section>

          <Section title="Dynamic color (seed)">
            <div className="flex items-center gap-3">
              {['#6750A4', '#386A20', '#B3261E', '#00639B'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSeed(c)}
                  aria-label={`seed ${c}`}
                  className="size-8 rounded-full border border-outline"
                  style={{ background: c }}
                />
              ))}
            </div>
          </Section>
        </main>
      </Snackbar.Provider>
    </ThemeProvider>
  );
}
