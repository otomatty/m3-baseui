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
  NavigationDrawer,
  BottomSheet,
  SideSheet,
  TopAppBar,
  BottomAppBar,
  NavigationRail,
  SegmentedButton,
  ButtonGroup,
  SplitButton,
  Card,
  Badge,
  Item,
  Fab,
  FabMenu,
  Divider,
  Progress,
  LoadingIndicator,
  Toolbar,
  Carousel,
  List,
  Snackbar,
  useSnackbar,
  Search,
  DatePicker,
  TimePicker,
  ThemeProvider,
  useTheme,
} from '@m3-baseui/react-tailwind';
import type { ButtonVariant } from '@m3-baseui/react-tailwind';
import { Icon } from '@m3-baseui/icons';

const BUTTON_VARIANTS: ButtonVariant[] = ['filled', 'tonal', 'outlined', 'elevated', 'text'];

// Fixed reference date so the date-picker demos stay deterministic for visual
// regression (a live `new Date()` would shift the month/today every CI run).
const DEMO_DATE = new Date(2026, 5, 15);

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
  const [view, setView] = useState<string[]>(['week']);
  const [textStyles, setTextStyles] = useState<string[]>(['bold']);
  const [drawer, setDrawer] = useState('inbox');
  const [rail, setRail] = useState<string[]>(['home']);

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
                <Switch defaultChecked aria-label="Wi-Fi" />
                <Switch aria-label="Bluetooth" />
                <Switch disabled defaultChecked aria-label="機内モード（無効）" />
                <Switch
                  defaultChecked
                  aria-label="ダークテーマ"
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
            <div className="flex max-w-sm flex-col gap-6">
              <Slider.Root defaultValue={40}>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Indicator />
                    <Slider.Thumb aria-label="音量">
                      <Slider.ValueLabel />
                    </Slider.Thumb>
                  </Slider.Track>
                </Slider.Control>
              </Slider.Root>

              <Slider.Root defaultValue={50} min={0} max={100} step={25}>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.TickList />
                    <Slider.Indicator />
                    <Slider.Thumb aria-label="離散スライダー" />
                  </Slider.Track>
                </Slider.Control>
              </Slider.Root>

              <Slider.Root defaultValue={[25, 75]} min={0} max={100} step={5}>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Indicator />
                    <Slider.Thumb index={0} aria-label="最低価格">
                      <Slider.ValueLabel index={0} />
                    </Slider.Thumb>
                    <Slider.Thumb index={1} aria-label="最高価格">
                      <Slider.ValueLabel index={1} />
                    </Slider.Thumb>
                  </Slider.Track>
                </Slider.Control>
              </Slider.Root>
            </div>
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

            {/* primary tabs with icon-above layout */}
            <Tabs.Root defaultValue="home" variant="primary" className="mt-4">
              <Tabs.List>
                <Tabs.Tab value="home" icon={<Icon name="home" size={24} />}>
                  ホーム
                </Tabs.Tab>
                <Tabs.Tab value="search" icon={<Icon name="search" size={24} />}>
                  検索
                </Tabs.Tab>
                <Tabs.Tab value="profile" icon={<Icon name="person" size={24} />}>
                  プロフィール
                </Tabs.Tab>
                <Tabs.Indicator />
              </Tabs.List>
            </Tabs.Root>

            {/* scrollable tabs */}
            <Tabs.Root defaultValue="t1" variant="secondary" className="mt-4 max-w-xs">
              <Tabs.List scrollable>
                {['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'].map((t) => (
                  <Tabs.Tab key={t} value={t}>
                    タブ {t.slice(1)}
                  </Tabs.Tab>
                ))}
                <Tabs.Indicator />
              </Tabs.List>
            </Tabs.Root>
          </Section>

          <Section title="Menu / Select / Tooltip / Dialog">
            <div className="flex flex-wrap items-center gap-3">
              <Menu.Root>
                <Menu.Trigger render={<Button variant="tonal" />}>メニュー</Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner sideOffset={8}>
                    <Menu.Popup>
                      <Menu.Item>
                        <span data-slot="menu-leading">
                          <Icon name="person" size={24} />
                        </span>
                        プロフィール
                      </Menu.Item>
                      <Menu.Item>
                        <span data-slot="menu-leading">
                          <Icon name="content_copy" size={24} />
                        </span>
                        コピー
                        <span data-slot="menu-trailing">⌘C</span>
                      </Menu.Item>
                      <Menu.Separator />
                      <Menu.CheckboxItem defaultChecked>
                        <Menu.CheckboxItemIndicator>
                          <Menu.Check />
                        </Menu.CheckboxItemIndicator>
                        通知を表示
                      </Menu.CheckboxItem>
                      <Menu.RadioGroup defaultValue="list">
                        <Menu.RadioItem value="list">
                          <Menu.RadioItemIndicator>
                            <Menu.Check />
                          </Menu.RadioItemIndicator>
                          リスト表示
                        </Menu.RadioItem>
                        <Menu.RadioItem value="grid">
                          <Menu.RadioItemIndicator>
                            <Menu.Check />
                          </Menu.RadioItemIndicator>
                          グリッド表示
                        </Menu.RadioItem>
                      </Menu.RadioGroup>
                      <Menu.Separator />
                      <Menu.SubmenuRoot>
                        <Menu.SubmenuTrigger>
                          <span className="flex items-center gap-3">
                            <span data-slot="menu-leading">
                              <Icon name="share" size={24} />
                            </span>
                            共有
                          </span>
                          <Icon name="chevron_right" size={20} />
                        </Menu.SubmenuTrigger>
                        <Menu.Portal>
                          <Menu.Positioner>
                            <Menu.Popup>
                              <Menu.Item>メール</Menu.Item>
                              <Menu.Item>リンクをコピー</Menu.Item>
                            </Menu.Popup>
                          </Menu.Positioner>
                        </Menu.Portal>
                      </Menu.SubmenuRoot>
                      <Menu.Separator />
                      <Menu.Item>ログアウト</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>

              <Select.Root defaultValue="apple">
                <Select.Trigger aria-label="果物を選択">
                  <Select.Value />
                  <Select.Icon>
                    <Icon name="arrow_drop_down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner sideOffset={4}>
                    <Select.Popup>
                      <Select.ScrollUpArrow />
                      {[
                        ['apple', 'りんご', '01'],
                        ['banana', 'バナナ', '02'],
                        ['cherry', 'さくらんぼ', '03'],
                        ['grape', 'ぶどう', '04'],
                        ['melon', 'メロン', '05'],
                        ['orange', 'オレンジ', '06'],
                        ['peach', 'もも', '07'],
                        ['pear', 'なし', '08'],
                        ['kiwi', 'キウイ', '09'],
                        ['mango', 'マンゴー', '10'],
                      ].map(([value, label, meta]) => (
                        <Select.Item key={value} value={value}>
                          <Select.ItemIndicator>
                            <Icon name="check" size={20} />
                          </Select.ItemIndicator>
                          <Select.ItemText>{label}</Select.ItemText>
                          <span data-slot="select-trailing">{meta}</span>
                        </Select.Item>
                      ))}
                      <Select.ScrollDownArrow />
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

          <Section title="Bottom sheet / Side sheet">
            <div className="flex flex-wrap gap-2">
              <BottomSheet.Root>
                <BottomSheet.Trigger render={<Button variant="tonal" />}>
                  ボトムシート
                </BottomSheet.Trigger>
                <BottomSheet.Portal>
                  <BottomSheet.Backdrop />
                  <BottomSheet.Viewport>
                    <BottomSheet.Popup>
                      <BottomSheet.Handle />
                      <BottomSheet.Title>共有先を選択</BottomSheet.Title>
                      <BottomSheet.Description>
                        スワイプまたは背景タップで閉じます。
                      </BottomSheet.Description>
                      <div className="p-2">
                        <List.Root>
                          <List.Item interactive leading={<Icon name="link" />}>
                            リンクをコピー
                          </List.Item>
                          <List.Item interactive leading={<Icon name="mail" />}>
                            メールで送信
                          </List.Item>
                          <List.Item interactive leading={<Icon name="download" />}>
                            ダウンロード
                          </List.Item>
                        </List.Root>
                      </div>
                    </BottomSheet.Popup>
                  </BottomSheet.Viewport>
                </BottomSheet.Portal>
              </BottomSheet.Root>

              <SideSheet.Root>
                <SideSheet.Trigger render={<Button variant="tonal" />}>
                  サイドシート
                </SideSheet.Trigger>
                <SideSheet.Portal>
                  <SideSheet.Backdrop />
                  <SideSheet.Viewport>
                    <SideSheet.Popup>
                      <SideSheet.Header>
                        <SideSheet.Title>フィルター</SideSheet.Title>
                        <SideSheet.Close
                          render={<IconButton variant="standard" aria-label="閉じる" />}
                        >
                          <Icon name="close" />
                        </SideSheet.Close>
                      </SideSheet.Header>
                      <Divider />
                      <SideSheet.Description>
                        補足コンテンツを画面端に表示します。
                      </SideSheet.Description>
                    </SideSheet.Popup>
                  </SideSheet.Viewport>
                </SideSheet.Portal>
              </SideSheet.Root>
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
              <FabMenu.Root>
                <FabMenu.Trigger color="primary" aria-label="FAB メニュー">
                  <Icon name="add" />
                </FabMenu.Trigger>
                <FabMenu.Portal>
                  <FabMenu.Positioner sideOffset={12} align="end" side="top">
                    <FabMenu.Popup>
                      <FabMenu.Item icon={<Icon name="description" />}>ドキュメント</FabMenu.Item>
                      <FabMenu.Item icon={<Icon name="table_chart" />}>
                        スプレッドシート
                      </FabMenu.Item>
                      <FabMenu.Item icon={<Icon name="slideshow" />}>スライド</FabMenu.Item>
                    </FabMenu.Popup>
                  </FabMenu.Positioner>
                </FabMenu.Portal>
              </FabMenu.Root>
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

          <Section title="Card">
            <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
              <Card variant="elevated" className="p-4">
                <p className="text-title-medium text-on-surface">Elevated</p>
                <p className="text-body-medium text-on-surface-variant">surface + level1</p>
              </Card>
              <Card variant="filled" className="p-4">
                <p className="text-title-medium text-on-surface">Filled</p>
                <p className="text-body-medium text-on-surface-variant">container-highest</p>
              </Card>
              <Card variant="outlined" className="p-4">
                <p className="text-title-medium text-on-surface">Outlined</p>
                <p className="text-body-medium text-on-surface-variant">outline-variant</p>
              </Card>
              <Card variant="outlined" interactive className="p-4">
                <p className="text-title-medium">押せるカード</p>
                <p className="text-body-medium text-on-surface-variant">state layer + ripple</p>
              </Card>
              <Card variant="filled" interactive disabled className="p-4">
                <p className="text-title-medium">無効カード</p>
                <p className="text-body-medium">操作できません</p>
              </Card>
            </div>
          </Section>

          <Section title="Badge">
            <div className="flex items-center gap-8">
              <span className="relative inline-flex text-on-surface">
                <Icon name="mail" />
                <Badge aria-label="新着あり" />
              </span>
              <span className="relative inline-flex text-on-surface">
                <Icon name="notifications" />
                <Badge value={3} />
              </span>
              <span className="relative inline-flex text-on-surface">
                <Icon name="chat" />
                <Badge value={120} max={99} />
              </span>
            </div>
          </Section>

          <Section title="Item (行レイアウト primitive)">
            <div className="max-w-md overflow-hidden rounded-large border border-outline-variant bg-surface-container-low">
              <Item
                overline="OVERLINE"
                supporting="補助テキスト"
                leading={<Icon name="folder" />}
                trailing={<Icon name="chevron_right" />}
              >
                見出しテキスト
              </Item>
            </div>
          </Section>

          <Section title="SegmentedButton">
            <div className="flex flex-col gap-4">
              <SegmentedButton.Root value={view} onValueChange={setView}>
                <SegmentedButton.Item value="day">日</SegmentedButton.Item>
                <SegmentedButton.Item value="week">週</SegmentedButton.Item>
                <SegmentedButton.Item value="month">月</SegmentedButton.Item>
              </SegmentedButton.Root>
              <SegmentedButton.Root multiple value={textStyles} onValueChange={setTextStyles}>
                <SegmentedButton.Item value="bold" icon={<Icon name="format_bold" />}>
                  太字
                </SegmentedButton.Item>
                <SegmentedButton.Item value="italic" icon={<Icon name="format_italic" />}>
                  斜体
                </SegmentedButton.Item>
                <SegmentedButton.Item value="underline" icon={<Icon name="format_underlined" />}>
                  下線
                </SegmentedButton.Item>
              </SegmentedButton.Root>
            </div>
          </Section>

          <Section title="ButtonGroup">
            <div className="flex flex-col gap-4">
              <ButtonGroup aria-label="標準のボタングループ">
                <Button variant="tonal">前へ</Button>
                <Button variant="tonal">次へ</Button>
              </ButtonGroup>
              <ButtonGroup variant="connected" aria-label="連結したボタングループ">
                <Button variant="tonal" startIcon={<Icon name="format_align_left" />}>
                  左
                </Button>
                <Button variant="tonal" startIcon={<Icon name="format_align_center" />}>
                  中央
                </Button>
                <Button variant="tonal" startIcon={<Icon name="format_align_right" />}>
                  右
                </Button>
              </ButtonGroup>
            </div>
          </Section>

          <Section title="SplitButton">
            <div className="flex flex-wrap gap-4">
              {(['filled', 'tonal', 'outlined', 'elevated'] as const).map((variant) => (
                <SplitButton.Root key={variant}>
                  <SplitButton.Group variant={variant} aria-label={`${variant} 保存`}>
                    <SplitButton.Leading>保存</SplitButton.Leading>
                    <SplitButton.Trailing aria-label="その他の保存オプション" />
                  </SplitButton.Group>
                  <SplitButton.Portal>
                    <SplitButton.Positioner sideOffset={4} align="end">
                      <SplitButton.Popup>
                        <SplitButton.Item>下書き保存</SplitButton.Item>
                        <SplitButton.Item>名前を付けて保存</SplitButton.Item>
                        <SplitButton.Item>コピーを保存</SplitButton.Item>
                      </SplitButton.Popup>
                    </SplitButton.Positioner>
                  </SplitButton.Portal>
                </SplitButton.Root>
              ))}
            </div>
          </Section>

          <Section title="NavigationDrawer">
            <div className="flex flex-wrap gap-6">
              <NavigationDrawer.Root variant="modal" aria-label="メール" className="max-w-[280px]">
                <NavigationDrawer.Headline>メール</NavigationDrawer.Headline>
                <NavigationDrawer.Item
                  leading={<Icon name="inbox" />}
                  trailing="24"
                  selected={drawer === 'inbox'}
                  onClick={() => setDrawer('inbox')}
                >
                  受信トレイ
                </NavigationDrawer.Item>
                <NavigationDrawer.Item
                  leading={<Icon name="send" />}
                  selected={drawer === 'sent'}
                  onClick={() => setDrawer('sent')}
                >
                  送信済み
                </NavigationDrawer.Item>
                <NavigationDrawer.Item
                  leading={<Icon name="delete" />}
                  selected={drawer === 'trash'}
                  onClick={() => setDrawer('trash')}
                >
                  ゴミ箱
                </NavigationDrawer.Item>
                <NavigationDrawer.Item leading={<Icon name="drafts" />} disabled>
                  下書き（無効）
                </NavigationDrawer.Item>
              </NavigationDrawer.Root>
            </div>
          </Section>

          <Section title="TopAppBar">
            <div className="flex max-w-md flex-col gap-4">
              {(['small', 'center', 'medium', 'large'] as const).map((variant) => (
                <div
                  key={variant}
                  className="overflow-hidden rounded-large border border-outline-variant"
                >
                  <TopAppBar
                    variant={variant}
                    leading={
                      <IconButton aria-label="ナビゲーション">
                        <Icon name="menu" />
                      </IconButton>
                    }
                    trailing={
                      <>
                        <IconButton aria-label="バー内検索">
                          <Icon name="search" />
                        </IconButton>
                        <IconButton aria-label="その他">
                          <Icon name="more_vert" />
                        </IconButton>
                      </>
                    }
                  >
                    {variant}
                  </TopAppBar>
                </div>
              ))}
            </div>
          </Section>

          <Section title="BottomAppBar">
            <div className="max-w-md overflow-hidden rounded-large border border-outline-variant">
              <BottomAppBar
                aria-label="アクション"
                fab={
                  <Fab color="primary" aria-label="追加">
                    <Icon name="add" />
                  </Fab>
                }
              >
                <IconButton aria-label="チェック">
                  <Icon name="check_box" />
                </IconButton>
                <IconButton aria-label="編集">
                  <Icon name="edit" />
                </IconButton>
                <IconButton aria-label="ブックマーク">
                  <Icon name="bookmark" />
                </IconButton>
                <IconButton aria-label="その他">
                  <Icon name="more_vert" />
                </IconButton>
              </BottomAppBar>
            </div>
          </Section>

          <Section title="NavigationRail">
            <div className="h-80 w-fit overflow-hidden rounded-large border border-outline-variant">
              <NavigationRail.Root
                value={rail}
                onValueChange={setRail}
                header={
                  <Fab color="primary" aria-label="作成">
                    <Icon name="add" />
                  </Fab>
                }
              >
                <NavigationRail.Item value="home" icon={<Icon name="home" />}>
                  ホーム
                </NavigationRail.Item>
                <NavigationRail.Item value="search" icon={<Icon name="search" />}>
                  検索
                </NavigationRail.Item>
                <NavigationRail.Item value="favorites" icon={<Icon name="favorite" />}>
                  お気に入り
                </NavigationRail.Item>
                <NavigationRail.Item value="profile" icon={<Icon name="person" />} disabled>
                  プロフィール
                </NavigationRail.Item>
              </NavigationRail.Root>
            </div>
          </Section>

          <Section title="Divider">
            <div className="max-w-md rounded-large border border-outline-variant bg-surface-container-low p-4">
              <p className="text-body-medium text-on-surface">最初の段落</p>
              <Divider inset="middle" />
              <p className="text-body-medium text-on-surface">次の段落</p>
              <div className="mt-4 flex h-6 items-center gap-3 text-body-medium text-on-surface">
                <span>下書き</span>
                <Divider orientation="vertical" />
                <span>送信済み</span>
                <Divider orientation="vertical" />
                <span>ゴミ箱</span>
              </div>
            </div>
          </Section>

          <Section title="Progress">
            <div className="flex max-w-md flex-col gap-6">
              <Progress.Linear value={66} aria-label="ダウンロード" />
              <Progress.Linear aria-label="読み込み中" />
              <div className="flex items-center gap-6">
                <Progress.Circular value={66} aria-label="アップロード" />
                <Progress.Circular aria-label="処理中" />
              </div>
            </div>
          </Section>

          <Section title="LoadingIndicator">
            <div className="flex items-center gap-6">
              <LoadingIndicator aria-label="読み込み中" />
              <LoadingIndicator aria-label="読み込み中（contained）" contained />
            </div>
          </Section>

          <Section title="Toolbar">
            <div className="flex flex-col items-start gap-6">
              <Toolbar aria-label="標準ツールバー">
                <IconButton aria-label="戻る">
                  <Icon name="undo" />
                </IconButton>
                <IconButton aria-label="進む">
                  <Icon name="redo" />
                </IconButton>
                <IconButton aria-label="追加">
                  <Icon name="add" />
                </IconButton>
              </Toolbar>
              <Toolbar aria-label="ビビッドなツールバー" variant="vibrant">
                <IconButton aria-label="太字">
                  <Icon name="format_bold" />
                </IconButton>
                <IconButton aria-label="斜体">
                  <Icon name="format_italic" />
                </IconButton>
                <IconButton aria-label="下線">
                  <Icon name="format_underlined" />
                </IconButton>
              </Toolbar>
            </div>
          </Section>

          <Section title="Carousel">
            <Carousel.Root aria-label="ギャラリー" className="max-w-md">
              {[
                'bg-primary-container text-on-primary-container',
                'bg-secondary-container text-on-secondary-container',
                'bg-tertiary-container text-on-tertiary-container',
                'bg-error-container text-on-error-container',
                'bg-surface-container-highest text-on-surface',
              ].map((swatch, i) => (
                <Carousel.Item
                  // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
                  key={i}
                  className={`${swatch} flex items-end p-3 text-label-large`}
                >
                  画像 {i + 1}
                </Carousel.Item>
              ))}
            </Carousel.Root>
          </Section>

          <Section title="List">
            <div className="max-w-md overflow-hidden rounded-large border border-outline-variant bg-surface-container-low">
              <List.Root>
                <List.Item
                  interactive
                  leading={<Icon name="inbox" />}
                  trailing={<span>24</span>}
                  supportingText="未読 3 件"
                >
                  受信トレイ
                </List.Item>
                {/* wrap in <li> so the role="list" only owns list items (valid ARIA) */}
                <li>
                  <Divider inset="inset" />
                </li>
                <List.Item
                  interactive
                  leading={<Icon name="send" />}
                  trailing={<Icon name="chevron_right" />}
                >
                  送信済み
                </List.Item>
                {/* wrap in <li> so the role="list" only owns list items (valid ARIA) */}
                <li>
                  <Divider inset="inset" />
                </li>
                <List.Item interactive disabled leading={<Icon name="delete" />}>
                  ゴミ箱（無効）
                </List.Item>
              </List.Root>
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

          <Section title="Search（search bar + docked view）">
            <Search.Root items={['りんご', 'みかん', 'ぶどう', 'もも', 'なし', 'いちご']}>
              <Search.Bar>
                <Search.Icon>
                  <Search.SearchGlyph />
                </Search.Icon>
                <Search.Input placeholder="果物を検索" aria-label="果物を検索" />
                <Search.Clear>
                  <Icon name="close" size={24} />
                </Search.Clear>
              </Search.Bar>
              <Search.Portal>
                <Search.Positioner sideOffset={4}>
                  <Search.Popup>
                    <Search.Empty>該当なし</Search.Empty>
                    <Search.List>
                      {(item: string) => (
                        <Search.Item key={item} value={item}>
                          <span data-slot="search-leading">
                            <Icon name="history" size={24} />
                          </span>
                          {item}
                          <Search.ItemIndicator>
                            <Search.Check />
                          </Search.ItemIndicator>
                        </Search.Item>
                      )}
                    </Search.List>
                  </Search.Popup>
                </Search.Positioner>
              </Search.Portal>
            </Search.Root>
          </Section>

          <Section title="Date pickers（calendar + docked + modal）">
            <div className="flex flex-wrap items-start gap-6">
              <div className="rounded-large bg-surface-container-high">
                <DatePicker.Calendar defaultMonth={DEMO_DATE} today={DEMO_DATE} />
              </div>

              <DatePicker.Root>
                <DatePicker.Field>
                  <DatePicker.Input placeholder="YYYY/MM/DD" aria-label="日付" />
                  <DatePicker.FieldIcon aria-label="カレンダーを開く">
                    <Icon name="calendar_today" size={24} />
                  </DatePicker.FieldIcon>
                </DatePicker.Field>
                <DatePicker.Portal>
                  <DatePicker.Positioner sideOffset={4} align="start">
                    <DatePicker.Popup>
                      <DatePicker.Calendar defaultMonth={DEMO_DATE} today={DEMO_DATE} />
                    </DatePicker.Popup>
                  </DatePicker.Positioner>
                </DatePicker.Portal>
              </DatePicker.Root>

              <DatePicker.Modal>
                <DatePicker.ModalTrigger render={<Button variant="tonal" />}>
                  カレンダー（モーダル）
                </DatePicker.ModalTrigger>
                <DatePicker.ModalPortal>
                  <DatePicker.ModalBackdrop />
                  <DatePicker.ModalPopup>
                    <DatePicker.ModalHeader>日付を選択</DatePicker.ModalHeader>
                    <DatePicker.ModalHeadline>
                      {new Intl.DateTimeFormat('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(DEMO_DATE)}
                    </DatePicker.ModalHeadline>
                    <DatePicker.Calendar defaultMonth={DEMO_DATE} today={DEMO_DATE} />
                    <DatePicker.ModalActions>
                      <DatePicker.ModalClose render={<Button variant="text" />}>
                        キャンセル
                      </DatePicker.ModalClose>
                      <DatePicker.ModalClose render={<Button variant="text" />}>
                        OK
                      </DatePicker.ModalClose>
                    </DatePicker.ModalActions>
                  </DatePicker.ModalPopup>
                </DatePicker.ModalPortal>
              </DatePicker.Modal>
            </div>
          </Section>

          <Section title="Time pickers（dial + input）">
            <div className="flex flex-wrap items-start gap-8">
              <TimePicker variant="dial" defaultValue={{ hour: 10, minute: 30 }} />
              <TimePicker variant="input" defaultValue={{ hour: 14, minute: 45 }} />
            </div>
          </Section>
        </main>
      </Snackbar.Provider>
    </ThemeProvider>
  );
}
