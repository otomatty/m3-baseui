/** Component reference metadata for `/docs/components/[slug]`. */

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  group: string;
  description: string;
  /** Registry key for an optional live demo (`DocDemo`). */
  demoId?: string;
  importCode: string;
  usageCode: string;
  props: PropDoc[];
  notes?: string[];
}

const TW = '@m3-baseui/react-tailwind';

function twImport(name: string): string {
  return `import { ${name} } from '${TW}';`;
}

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    group: 'Actions',
    description:
      'M3 のボタン。filled / tonal / outlined / elevated / text の 5 バリアントをサポートし、先頭・末尾アイコンとリップル効果を備えます。',
    demoId: 'button',
    importCode: twImport('Button, ThemeProvider'),
    usageCode: `<ThemeProvider seed="#6750A4" scheme="tonalSpot" mode="system">
  <Button variant="filled">送信</Button>
  <Button variant="outlined">キャンセル</Button>
</ThemeProvider>`,
    props: [
      {
        name: 'variant',
        type: "'filled' | 'tonal' | 'outlined' | 'elevated' | 'text'",
        default: "'filled'",
        description: 'M3 ボタンバリアント',
      },
      { name: 'startIcon', type: 'ReactNode', description: '先頭アイコン（18dp）' },
      { name: 'endIcon', type: 'ReactNode', description: '末尾アイコン（18dp）' },
      { name: 'ripple', type: 'boolean', default: 'true', description: '押下時のリップル表示' },
      { name: 'disabled', type: 'boolean', description: 'ネイティブ button の disabled' },
    ],
  },
  {
    slug: 'icon-button',
    name: 'IconButton',
    group: 'Actions',
    description:
      'アイコンのみのボタン。standard / filled / tonal / outlined とトグル（selected）をサポートします。',
    importCode: twImport('IconButton, ThemeProvider'),
    usageCode: `<IconButton variant="tonal" aria-label="設定">
  <Icon name="settings" />
</IconButton>`,
    props: [
      {
        name: 'variant',
        type: "'standard' | 'filled' | 'tonal' | 'outlined'",
        default: "'standard'",
        description: 'M3 アイコンボタンバリアント',
      },
      { name: 'selected', type: 'boolean', description: 'トグル状態（standard 以外）' },
      { name: 'aria-label', type: 'string', description: 'アクセシブル名（必須）' },
    ],
  },
  {
    slug: 'button-group',
    name: 'ButtonGroup',
    group: 'Actions',
    description:
      '関連するボタンをグループ化するコンテナ。connected スタイルで隣接ボタンの角丸を調整します。',
    importCode: twImport('ButtonGroup, Button, ThemeProvider'),
    usageCode: `<ButtonGroup>
  <Button variant="outlined">左</Button>
  <Button variant="outlined">中央</Button>
  <Button variant="outlined">右</Button>
</ButtonGroup>`,
    props: [{ name: 'children', type: 'ReactNode', description: 'Button 要素' }],
  },
  {
    slug: 'split-button',
    name: 'SplitButton',
    group: 'Actions',
    description:
      '複合コンポーネント（SplitButton.Root / Group / Leading / Trailing）。主要アクションとドロップダウンメニューを組み合わせた分割ボタン。',
    importCode: twImport('SplitButton, ThemeProvider'),
    usageCode: `<SplitButton.Root>
  <SplitButton.Group variant="filled" aria-label="保存">
    <SplitButton.Leading>保存</SplitButton.Leading>
    <SplitButton.Trailing aria-label="その他" />
  </SplitButton.Group>
</SplitButton.Root>`,
    props: [
      {
        name: 'SplitButton.Group variant',
        type: 'ButtonVariant',
        default: "'filled'",
        description: 'Leading / Trailing 共有の M3 バリアント',
      },
    ],
    notes: ['Trailing は Menu.Trigger。メニュー内容は Base UI Menu の Popup / Item で構成します。'],
  },
  {
    slug: 'fab',
    name: 'Fab',
    group: 'Actions',
    description:
      'Floating Action Button。primary / secondary / tertiary / surface のサイズとバリアントを提供します。',
    importCode: twImport('Fab, ThemeProvider'),
    usageCode: `<Fab variant="primary" size="medium" aria-label="作成">
  <Icon name="add" />
</Fab>`,
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'tertiary' | 'surface'",
        default: "'primary'",
        description: 'FAB バリアント',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'FAB サイズ',
      },
    ],
  },
  {
    slug: 'fab-menu',
    name: 'FabMenu',
    group: 'Actions',
    description: 'FAB から展開する Speed Dial メニュー。子アクションを縦に配置します。',
    importCode: twImport('FabMenu, Fab, ThemeProvider'),
    usageCode: `<FabMenu.Root>
  <FabMenu.Trigger color="primary" aria-label="作成">
    <Icon name="add" />
  </FabMenu.Trigger>
  <FabMenu.Portal>
    <FabMenu.Positioner sideOffset={12} align="end" side="top">
      <FabMenu.Popup>
        <FabMenu.Item icon={<Icon name="edit" />}>編集</FabMenu.Item>
        <FabMenu.Item icon={<Icon name="share" />}>共有</FabMenu.Item>
      </FabMenu.Popup>
    </FabMenu.Positioner>
  </FabMenu.Portal>
</FabMenu.Root>`,
    props: [{ name: 'FabMenu.Item icon', type: 'ReactNode', description: '先頭アイコン' }],
  },
  {
    slug: 'segmented-button',
    name: 'SegmentedButton',
    group: 'Actions',
    description: '排他的な選択肢を提示するセグメントボタン。単一選択モードをサポートします。',
    importCode: twImport('SegmentedButton, ThemeProvider'),
    usageCode: `<SegmentedButton.Root defaultValue={['list']}>
  <SegmentedButton.Item value="list">リスト</SegmentedButton.Item>
  <SegmentedButton.Item value="grid">グリッド</SegmentedButton.Item>
</SegmentedButton.Root>`,
    props: [
      {
        name: 'defaultValue / value',
        type: 'readonly string[]',
        description: '選択中の値（ToggleGroup）',
      },
    ],
    notes: ['単一選択が既定。複数選択は Root に multiple を指定。'],
  },
  {
    slug: 'selection-controls',
    name: 'Selection controls',
    group: 'Selection',
    description:
      'Switch・Checkbox・Radio の選択コントロール群。Base UI の状態属性（data-checked 等）に M3 スタイルを適用します。',
    demoId: 'selection-controls',
    importCode: twImport('Switch, Checkbox, Radio, RadioGroup, ThemeProvider'),
    usageCode: `<Switch checked={on} onCheckedChange={setOn} aria-label="通知" />
<Checkbox checked={agree} onCheckedChange={setAgree} />
<RadioGroup value={plan} onValueChange={setPlan}>
  <Radio value="free" label="無料" />
  <Radio value="pro" label="Pro" />
</RadioGroup>`,
    props: [
      { name: 'checked / value', type: 'boolean | string', description: '選択状態' },
      { name: 'indeterminate', type: 'boolean', description: 'Checkbox の中間状態' },
      { name: 'disabled', type: 'boolean', description: '無効状態' },
    ],
  },
  {
    slug: 'chip',
    name: 'Chip',
    group: 'Selection',
    description:
      'assist / filter / input / suggestion の 4 バリアント。filter はトグル選択、input は削除可能です。',
    demoId: 'chip',
    importCode: twImport('Chip, ThemeProvider'),
    usageCode: `<Chip variant="filter" selected={active} onSelectedChange={setActive}>
  フィルター
</Chip>`,
    props: [
      {
        name: 'variant',
        type: "'assist' | 'filter' | 'input' | 'suggestion'",
        default: "'assist'",
        description: 'チップ種別',
      },
      { name: 'selected', type: 'boolean', description: 'filter バリアントの選択状態' },
    ],
  },
  {
    slug: 'textfield',
    name: 'TextField',
    group: 'Text input',
    description:
      'filled / outlined の M3 テキストフィールド。フローティングラベル、エラー、支援テキストを Field パーツで構成します。',
    demoId: 'textfield',
    importCode: twImport('TextField, ThemeProvider'),
    usageCode: `<TextField variant="outlined" label="メールアドレス" type="email" />
<TextField variant="filled" label="名前" error="必須項目です" />`,
    props: [
      {
        name: 'variant',
        type: "'filled' | 'outlined'",
        default: "'outlined'",
        description: 'M3 テキストフィールドバリアント',
      },
      { name: 'label', type: 'string', description: 'フローティングラベル' },
      { name: 'error', type: 'string', description: 'エラーメッセージ（設定時 invalid）' },
      { name: 'supportingText', type: 'string', description: '補助テキスト' },
    ],
  },
  {
    slug: 'search',
    name: 'Search',
    group: 'Text input',
    description:
      'M3 検索バー。leading 検索アイコンとクリアボタンを備えた TextField 派生コンポーネントです。',
    importCode: twImport('Search, ThemeProvider'),
    usageCode: `<Search.Root items={['りんご', 'みかん', 'ぶどう']}>
  <Search.Bar>
    <Search.Icon>
      <Search.SearchGlyph />
    </Search.Icon>
    <Search.Input placeholder="検索" aria-label="検索" />
    <Search.Clear aria-label="クリア">×</Search.Clear>
  </Search.Bar>
  <Search.Portal>
    <Search.Positioner sideOffset={4}>
      <Search.Popup>
        <Search.Empty>該当なし</Search.Empty>
        <Search.List>
          {(item) => (
            <Search.Item key={item} value={item}>
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
</Search.Root>`,
    props: [
      { name: 'Search.Root items', type: 'readonly string[]', description: '候補リスト' },
      { name: 'value / onValueChange', type: 'string', description: '選択値と変更ハンドラ' },
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    group: 'Text input',
    description:
      '複合コンポーネント（Select.Root / Trigger / Value / Icon / Portal / Positioner / Popup / Item）。M3 の outlined トリガーとメニュー popup を提供します。',
    importCode: twImport('Select, ThemeProvider'),
    usageCode: `<Select.Root value={fruit} onValueChange={setFruit}>
  <Select.Trigger>
    <Select.Value placeholder="果物を選択" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="apple">りんご</Select.Item>
        <Select.Item value="orange">みかん</Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`,
    props: [{ name: 'value / onValueChange', type: 'string', description: '選択値と変更ハンドラ' }],
    notes: ['複合 API の詳細は Base UI Select の part 構成に準拠します。'],
  },
  {
    slug: 'slider',
    name: 'Slider',
    group: 'Text input',
    description:
      '複合コンポーネント（Slider.Root / Control / Track / Indicator / Thumb）。M3 レールとハンドルのステートレイヤーを提供します。',
    importCode: twImport('Slider, ThemeProvider'),
    usageCode: `<Slider.Root defaultValue={50} min={0} max={100}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb aria-label="音量" />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>`,
    props: [
      { name: 'value / defaultValue', type: 'number', description: '現在値' },
      { name: 'min / max', type: 'number', description: '範囲' },
    ],
  },
  {
    slug: 'date-picker',
    name: 'DatePicker',
    group: 'Text input',
    description:
      'カレンダーポップアップ付き日付入力。TextField トリガーとカレンダーグリッドを組み合わせます。',
    importCode: twImport('DatePicker, ThemeProvider'),
    usageCode: `<DatePicker.Root>
  <DatePicker.Field>
    <DatePicker.Input placeholder="YYYY/MM/DD" aria-label="日付" />
    <DatePicker.FieldIcon aria-label="カレンダーを開く">
      <Icon name="calendar_today" />
    </DatePicker.FieldIcon>
  </DatePicker.Field>
  <DatePicker.Portal>
    <DatePicker.Positioner sideOffset={4} align="start">
      <DatePicker.Popup>
        <DatePicker.Calendar value={date} onValueChange={setDate} />
      </DatePicker.Popup>
    </DatePicker.Positioner>
  </DatePicker.Portal>
</DatePicker.Root>`,
    props: [
      { name: 'DatePicker.Calendar value', type: 'Date | null', description: '選択日' },
      {
        name: 'DatePicker.Calendar onValueChange',
        type: '(date: Date) => void',
        description: '変更コールバック',
      },
    ],
  },
  {
    slug: 'time-picker',
    name: 'TimePicker',
    group: 'Text input',
    description: '時刻入力フィールド。ダイアログまたはポップアップで時・分を選択します。',
    importCode: twImport('TimePicker, ThemeProvider'),
    usageCode: `const [time, setTime] = useState({ hour: 10, minute: 30 });

<TimePicker variant="dial" value={time} onValueChange={setTime} />`,
    props: [
      {
        name: 'value / defaultValue',
        type: 'TimeValue ({ hour: number; minute: number })',
        description: '0–23 時・0–59 分',
      },
      {
        name: 'onValueChange',
        type: '(value: TimeValue) => void',
        description: '変更コールバック',
      },
      {
        name: 'variant',
        type: "'dial' | 'input'",
        default: "'dial'",
        description: '時計盤 / 数値入力レイアウト',
      },
    ],
  },
  {
    slug: 'navigation-bar',
    name: 'NavigationBar',
    group: 'Navigation',
    description: 'モバイル向けボトムナビゲーションバー。NavigationBar.Item で目的地を配置します。',
    importCode: twImport('NavigationBar, ThemeProvider'),
    usageCode: `<NavigationBar.Root defaultValue={['home']}>
  <NavigationBar.Item value="home" icon={<Icon name="home" />}>ホーム</NavigationBar.Item>
  <NavigationBar.Item value="search" icon={<Icon name="search" />}>検索</NavigationBar.Item>
</NavigationBar.Root>`,
    props: [
      {
        name: 'defaultValue / value',
        type: 'readonly string[]',
        description: '選択中の目的地',
      },
    ],
  },
  {
    slug: 'navigation-rail',
    name: 'NavigationRail',
    group: 'Navigation',
    description:
      'コンパクト／展開可能なサイドレール。NavigationRail.Item で主要目的地を配置します。',
    importCode: twImport('NavigationRail, ThemeProvider'),
    usageCode: `<NavigationRail.Root defaultValue={['home']}>
  <NavigationRail.Item value="home" icon={<Icon name="home" />}>ホーム</NavigationRail.Item>
</NavigationRail.Root>`,
    props: [
      {
        name: 'defaultValue / value',
        type: 'readonly string[]',
        description: '選択中の目的地',
      },
    ],
  },
  {
    slug: 'navigation-drawer',
    name: 'NavigationDrawer',
    group: 'Navigation',
    description:
      'モーダル／標準／永続の M3 ナビゲーションドロワー。NavigationDrawer.Item でメニュー項目を構成します。',
    importCode: twImport('NavigationDrawer, ThemeProvider'),
    usageCode: `<NavigationDrawer.Root variant="modal" aria-label="メール">
  <NavigationDrawer.Headline>メール</NavigationDrawer.Headline>
  <NavigationDrawer.Item leading={<Icon name="inbox" />} selected>
    受信トレイ
  </NavigationDrawer.Item>
  <NavigationDrawer.Item leading={<Icon name="send" />}>
    送信済み
  </NavigationDrawer.Item>
</NavigationDrawer.Root>`,
    props: [
      {
        name: 'NavigationDrawer.Root variant',
        type: "'modal' | 'standard' | 'persistent'",
        description: 'ドロワー種別',
      },
      { name: 'NavigationDrawer.Item selected', type: 'boolean', description: '選択状態' },
    ],
  },
  {
    slug: 'top-app-bar',
    name: 'TopAppBar',
    group: 'Navigation',
    description: '画面上部のアプリバー。small / center / medium / large のバリアントを提供します。',
    importCode: twImport('TopAppBar, ThemeProvider'),
    usageCode: `<TopAppBar variant="center">
  ページタイトル
</TopAppBar>`,
    props: [
      {
        name: 'variant',
        type: "'small' | 'center' | 'medium' | 'large'",
        default: "'small'",
        description: 'App bar バリアント',
      },
      { name: 'children', type: 'ReactNode', description: 'ヘッドライン（タイトル）' },
      { name: 'leading / trailing', type: 'ReactNode', description: '先頭・末尾アクション' },
    ],
  },
  {
    slug: 'bottom-app-bar',
    name: 'BottomAppBar',
    group: 'Navigation',
    description: '画面下部のアプリバー。FAB スロットとアクションボタンを配置できます。',
    importCode: twImport('BottomAppBar, ThemeProvider'),
    usageCode: `<BottomAppBar>
  <IconButton variant="standard" aria-label="メニュー"><Icon name="menu" /></IconButton>
</BottomAppBar>`,
    props: [{ name: 'children', type: 'ReactNode', description: 'アクションボタン等' }],
  },
  {
    slug: 'card',
    name: 'Card',
    group: 'Containment',
    description:
      'elevated / filled / outlined の M3 カードコンテナ。コンテンツグループ化に使用します。',
    demoId: 'card',
    importCode: twImport('Card, ThemeProvider'),
    usageCode: `<Card variant="elevated" className="p-4">
  <h3 className="text-title-medium">タイトル</h3>
  <p className="text-body-medium">本文</p>
</Card>`,
    props: [
      {
        name: 'variant',
        type: "'elevated' | 'filled' | 'outlined'",
        default: "'elevated'",
        description: 'カードバリアント',
      },
    ],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    group: 'Containment',
    description:
      '複合コンポーネント（Dialog.Root / Trigger / Portal / Backdrop / Popup / Title / Description / Close）。M3 スクリムとサーフェスダイアログ。',
    importCode: twImport('Dialog, Button, ThemeProvider'),
    usageCode: `<Dialog.Root>
  <Dialog.Trigger render={<Button variant="tonal">開く</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>確認</Dialog.Title>
      <Dialog.Description>続行しますか？</Dialog.Description>
      <Dialog.Close render={<Button variant="text">閉じる</Button>} />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`,
    props: [{ name: 'open / onOpenChange', type: 'boolean', description: '制御モードの開閉状態' }],
    notes: [
      'ポータル描画のため ThemeProvider の動的配色は document ルートへ伝播させる必要がある場合があります。',
    ],
  },
  {
    slug: 'bottom-sheet',
    name: 'BottomSheet',
    group: 'Containment',
    description: '画面下部からスライドするシート。ドラッグハンドルとスクリムを備えます。',
    importCode: twImport('BottomSheet, Button, ThemeProvider'),
    usageCode: `<BottomSheet.Root>
  <BottomSheet.Trigger render={<Button variant="tonal">開く</Button>} />
  <BottomSheet.Portal>
    <BottomSheet.Backdrop />
    <BottomSheet.Viewport>
      <BottomSheet.Popup>
        <BottomSheet.Handle />
        <BottomSheet.Title>タイトル</BottomSheet.Title>
        <BottomSheet.Description>本文</BottomSheet.Description>
      </BottomSheet.Popup>
    </BottomSheet.Viewport>
  </BottomSheet.Portal>
</BottomSheet.Root>`,
    props: [
      {
        name: 'open / onOpenChange',
        type: 'boolean',
        description: 'BottomSheet.Root の制御モード',
      },
    ],
  },
  {
    slug: 'side-sheet',
    name: 'SideSheet',
    group: 'Containment',
    description: '画面端からスライドするサイドシート。modal / standard バリアント。',
    importCode: twImport('SideSheet, Button, ThemeProvider'),
    usageCode: `<SideSheet.Root>
  <SideSheet.Trigger render={<Button variant="tonal">開く</Button>} />
  <SideSheet.Portal>
    <SideSheet.Backdrop />
    <SideSheet.Viewport>
      <SideSheet.Popup>
        <SideSheet.Header>
          <SideSheet.Title>タイトル</SideSheet.Title>
          <SideSheet.Close aria-label="閉じる" />
        </SideSheet.Header>
        <SideSheet.Description>本文</SideSheet.Description>
      </SideSheet.Popup>
    </SideSheet.Viewport>
  </SideSheet.Portal>
</SideSheet.Root>`,
    props: [
      {
        name: 'SideSheet.Root side',
        type: "'left' | 'right'",
        default: "'right'",
        description: '表示する端',
      },
      { name: 'open / onOpenChange', type: 'boolean', description: 'SideSheet.Root の制御モード' },
    ],
  },
  {
    slug: 'menu',
    name: 'Menu',
    group: 'Containment',
    description:
      '複合コンポーネント（Menu.Root / Trigger / Portal / Positioner / Popup / Item / Separator）。M3 メニューサーフェスとリップル付き項目。',
    importCode: twImport('Menu, Button, ThemeProvider'),
    usageCode: `<Menu.Root>
  <Menu.Trigger render={<Button variant="outlined">メニュー</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item onClick={...}>編集</Menu.Item>
        <Menu.Item onClick={...}>削除</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`,
    props: [{ name: 'open / onOpenChange', type: 'boolean', description: '制御モードの開閉状態' }],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    group: 'Containment',
    description:
      '複合コンポーネント（Tooltip.Root / Trigger / Portal / Positioner / Popup）。inverse-surface のプレーンツールチップ。',
    importCode: twImport('Tooltip, IconButton, ThemeProvider'),
    usageCode: `<Tooltip.Root>
  <Tooltip.Trigger render={<IconButton aria-label="情報"><Icon name="info" /></IconButton>} />
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>ヒントテキスト</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`,
    props: [{ name: 'delay', type: 'number', description: '表示までの遅延（ms）' }],
  },
  {
    slug: 'badge',
    name: 'Badge',
    group: 'Communication',
    description: 'small / large の M3 バッジ。数値カウントやドット表示に使用します。',
    importCode: twImport('Badge, ThemeProvider'),
    usageCode: `<span className="relative inline-flex">
  <Icon name="notifications" />
  <Badge value={3} aria-label="3件の通知" />
</span>`,
    props: [
      { name: 'value', type: 'ReactNode', description: '表示する数（省略時はドット）' },
      { name: 'max', type: 'number', description: '数値の上限（例: 99+）' },
    ],
  },
  {
    slug: 'divider',
    name: 'Divider',
    group: 'Communication',
    description:
      '水平／垂直の M3 ディバイダー。inset バリアントでリスト項目向けの余白付き区切り線。',
    importCode: twImport('Divider, ThemeProvider'),
    usageCode: `<Divider />
<Divider inset />`,
    props: [
      { name: 'vertical', type: 'boolean', description: '垂直方向' },
      { name: 'inset', type: 'boolean', description: 'リスト項目向け inset' },
    ],
  },
  {
    slug: 'list',
    name: 'List',
    group: 'Communication',
    description:
      'M3 リストコンテナ。List.Item または Item コンポーネントと組み合わせて使用します。',
    importCode: twImport('List, ThemeProvider'),
    usageCode: `<List.Root>
  <List.Item interactive leading={<Icon name="inbox" />} supportingText="未読 3 件">
    受信トレイ
  </List.Item>
  <List.Item interactive leading={<Icon name="send" />}>
    送信済み
  </List.Item>
</List.Root>`,
    props: [
      { name: 'List.Item interactive', type: 'boolean', description: 'クリック可能な行' },
      {
        name: 'leading / trailing / supportingText',
        type: 'ReactNode | string',
        description: 'スロット',
      },
    ],
  },
  {
    slug: 'item',
    name: 'Item',
    group: 'Communication',
    description:
      '1 行／2 行／3 行の M3 リスト項目。leading / trailing スロットとインタラクティブ状態をサポート。',
    importCode: twImport('Item, ThemeProvider'),
    usageCode: `<Item
  headline="タイトル"
  supportingText="補助テキスト"
  leading={<Icon name="person" />}
  trailing={<Icon name="chevron_right" />}
/>`,
    props: [
      { name: 'headline', type: 'string', description: '主テキスト' },
      { name: 'supportingText', type: 'string', description: '補助テキスト' },
      { name: 'leading / trailing', type: 'ReactNode', description: '前後スロット' },
    ],
  },
  {
    slug: 'snackbar',
    name: 'Snackbar',
    group: 'Communication',
    description:
      'Snackbar.Provider と useSnackbar によるトースト通知。Viewport 内に Root を描画してメッセージを表示します。',
    importCode: twImport('Snackbar, useSnackbar, Button, ThemeProvider'),
    usageCode: `function App() {
  return (
    <ThemeProvider seed="#6750A4">
      <Snackbar.Provider>
        <SnackbarDemo />
      </Snackbar.Provider>
    </ThemeProvider>
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
          </Snackbar.Content>
        </Snackbar.Root>
      ))}
    </>
  );
}

function SnackbarDemo() {
  const { add } = useSnackbar();
  return (
    <>
      <Button onClick={() => add({ title: '保存しました' })}>表示</Button>
      <Snackbar.Viewport>
        <SnackbarList />
      </Snackbar.Viewport>
    </>
  );
}`,
    props: [{ name: 'add', type: '(options) => void', description: 'useSnackbar フックから取得' }],
    notes: ['Snackbar.Provider は ThemeProvider の内側に配置してください。'],
  },
  {
    slug: 'progress',
    name: 'Progress',
    group: 'Communication',
    description:
      'linear / circular の M3 プログレスインジケーター。determinate / indeterminate をサポート。',
    importCode: twImport('Progress, ThemeProvider'),
    usageCode: `<Progress.Linear value={60} aria-label="進捗" />
<Progress.Circular value={66} aria-label="進捗" />`,
    props: [
      { name: 'Progress.Linear value', type: 'number', description: '0–100（determinate）' },
      { name: 'Progress.Circular value', type: 'number', description: '0–100（determinate）' },
    ],
  },
  {
    slug: 'loading-indicator',
    name: 'LoadingIndicator',
    group: 'Communication',
    description: 'M3 Expressive のローディングインジケーター（wave / circular）。',
    importCode: twImport('LoadingIndicator, ThemeProvider'),
    usageCode: `<LoadingIndicator variant="circular" />
<LoadingIndicator variant="wave" />`,
    props: [{ name: 'variant', type: "'circular' | 'wave'", description: 'アニメーション種別' }],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    group: 'Layout & media',
    description:
      '複合コンポーネント（Tabs.Root / List / Tab / Indicator / Panel）。primary / secondary バリアント。',
    importCode: twImport('Tabs, ThemeProvider'),
    usageCode: `<Tabs.Root defaultValue="tab1" variant="primary">
  <Tabs.List>
    <Tabs.Tab value="tab1">タブ 1</Tabs.Tab>
    <Tabs.Tab value="tab2">タブ 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab1">内容 1</Tabs.Panel>
  <Tabs.Panel value="tab2">内容 2</Tabs.Panel>
</Tabs.Root>`,
    props: [{ name: 'variant', type: "'primary' | 'secondary'", description: 'タブバリアント' }],
  },
  {
    slug: 'toolbar',
    name: 'Toolbar',
    group: 'Layout & media',
    description: 'ツールバーコンテナ。Toolbar.Group でボタン群を区切ります。',
    importCode: twImport('Toolbar, IconButton, ThemeProvider'),
    usageCode: `<Toolbar>
  <Toolbar.Group>
    <IconButton variant="standard" aria-label="太字"><Icon name="format_bold" /></IconButton>
  </Toolbar.Group>
</Toolbar>`,
    props: [{ name: 'children', type: 'ReactNode', description: 'ツールバー内容' }],
  },
  {
    slug: 'carousel',
    name: 'Carousel',
    group: 'Layout & media',
    description: '横スクロールカルーセル。Carousel.Root / Item で各スライドを配置します。',
    importCode: twImport('Carousel, ThemeProvider'),
    usageCode: `<Carousel.Root aria-label="ギャラリー">
  <Carousel.Item>スライド 1</Carousel.Item>
  <Carousel.Item>スライド 2</Carousel.Item>
</Carousel.Root>`,
    props: [{ name: 'Carousel.Item', type: 'component', description: '各スライド' }],
  },
];

const bySlug = new Map(COMPONENT_DOCS.map((doc) => [doc.slug, doc]));

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return bySlug.get(slug);
}

export function getAllComponentSlugs(): string[] {
  return COMPONENT_DOCS.map((doc) => doc.slug);
}

/**
 * 参照している Material Design 3 公式ガイドライン（https://m3.material.io）の
 * 各コンポーネント overview ページ。実装はこの仕様に準拠しています。
 */
export const M3_DOC_URLS: Record<string, string> = {
  button: 'https://m3.material.io/components/buttons/overview',
  'icon-button': 'https://m3.material.io/components/icon-buttons/overview',
  'button-group': 'https://m3.material.io/components/button-groups/overview',
  'split-button': 'https://m3.material.io/components/split-buttons/overview',
  fab: 'https://m3.material.io/components/floating-action-button/overview',
  'fab-menu': 'https://m3.material.io/components/fab-menu/overview',
  'segmented-button': 'https://m3.material.io/components/segmented-buttons/overview',
  'selection-controls': 'https://m3.material.io/components/checkbox/overview',
  chip: 'https://m3.material.io/components/chips/overview',
  textfield: 'https://m3.material.io/components/text-fields/overview',
  search: 'https://m3.material.io/components/search/overview',
  select: 'https://m3.material.io/components/menus/overview',
  slider: 'https://m3.material.io/components/sliders/overview',
  'date-picker': 'https://m3.material.io/components/date-pickers/overview',
  'time-picker': 'https://m3.material.io/components/time-pickers/overview',
  'navigation-bar': 'https://m3.material.io/components/navigation-bar/overview',
  'navigation-rail': 'https://m3.material.io/components/navigation-rail/overview',
  'navigation-drawer': 'https://m3.material.io/components/navigation-drawer/overview',
  'top-app-bar': 'https://m3.material.io/components/app-bars/overview',
  'bottom-app-bar': 'https://m3.material.io/components/bottom-app-bar/overview',
  card: 'https://m3.material.io/components/cards/overview',
  dialog: 'https://m3.material.io/components/dialogs/overview',
  'bottom-sheet': 'https://m3.material.io/components/bottom-sheets/overview',
  'side-sheet': 'https://m3.material.io/components/side-sheets/overview',
  menu: 'https://m3.material.io/components/menus/overview',
  tooltip: 'https://m3.material.io/components/tooltips/overview',
  badge: 'https://m3.material.io/components/badges/overview',
  divider: 'https://m3.material.io/components/divider/overview',
  list: 'https://m3.material.io/components/lists/overview',
  item: 'https://m3.material.io/components/lists/overview',
  snackbar: 'https://m3.material.io/components/snackbar/overview',
  progress: 'https://m3.material.io/components/progress-indicators/overview',
  'loading-indicator': 'https://m3.material.io/components/loading-indicator/overview',
  tabs: 'https://m3.material.io/components/tabs/overview',
  toolbar: 'https://m3.material.io/components/toolbars/overview',
  carousel: 'https://m3.material.io/components/carousel/overview',
};

export function getM3DocUrl(slug: string): string | undefined {
  return M3_DOC_URLS[slug];
}
