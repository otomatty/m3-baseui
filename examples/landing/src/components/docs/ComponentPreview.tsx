import type { ReactNode } from 'react';
import {
  Badge,
  BottomAppBar,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Checkbox,
  Chip,
  DatePicker,
  Divider,
  Fab,
  IconButton,
  Item,
  List,
  LoadingIndicator,
  NavigationBar,
  NavigationDrawer,
  NavigationRail,
  Progress,
  Radio,
  RadioGroup,
  Search,
  SegmentedButton,
  Select,
  Slider,
  SplitButton,
  Switch,
  Tabs,
  TextField,
  TimePicker,
  Toolbar,
  TopAppBar,
} from '@m3-baseui/react-tailwind';
import { Icon } from '@m3-baseui/icons';
import { PreviewFrame } from './PreviewFrame';

const DEMO_DATE = new Date(2026, 5, 15);

const PREVIEWS: Record<string, () => ReactNode> = {
  button: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="filled" startIcon={<Icon name="arrow_back" size={18} />}>
        Back
      </Button>
      <Button variant="tonal">Edit</Button>
      <Button variant="outlined" endIcon={<Icon name="arrow_forward" size={18} />}>
        Next
      </Button>
    </div>
  ),

  'icon-button': () => (
    <div className="flex items-center gap-2">
      <IconButton variant="standard" aria-label="お気に入り">
        <Icon name="favorite" />
      </IconButton>
      <IconButton variant="filled" aria-label="追加">
        <Icon name="add" />
      </IconButton>
      <IconButton variant="tonal" aria-label="編集">
        <Icon name="edit" />
      </IconButton>
      <IconButton variant="outlined" selected aria-label="ブックマーク">
        <Icon name="bookmark" filled />
      </IconButton>
    </div>
  ),

  'button-group': () => (
    <ButtonGroup variant="connected" aria-label="サイズ">
      <Button variant="tonal">4 oz</Button>
      <Button variant="tonal">8 oz</Button>
      <Button variant="tonal">12 oz</Button>
    </ButtonGroup>
  ),

  'split-button': () => (
    <SplitButton.Root>
      <SplitButton.Group variant="filled" aria-label="保存">
        <SplitButton.Leading>保存</SplitButton.Leading>
        <SplitButton.Trailing aria-label="その他" />
      </SplitButton.Group>
    </SplitButton.Root>
  ),

  fab: () => (
    <div className="flex items-center gap-3">
      <Fab size="medium" color="primary" aria-label="追加">
        <Icon name="add" />
      </Fab>
      <Fab variant="extended" color="primary">
        <Icon name="add" />
        New task
      </Fab>
    </div>
  ),

  'fab-menu': () => (
    <Fab size="medium" color="primary" aria-label="メニュー">
      <Icon name="add" />
    </Fab>
  ),

  'segmented-button': () => (
    <SegmentedButton.Root defaultValue={['week']}>
      <SegmentedButton.Item value="day">日</SegmentedButton.Item>
      <SegmentedButton.Item value="week">週</SegmentedButton.Item>
      <SegmentedButton.Item value="month">月</SegmentedButton.Item>
    </SegmentedButton.Root>
  ),

  'selection-controls': () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Switch defaultChecked aria-label="通知" />
      <Checkbox defaultChecked />
      <RadioGroup defaultValue="a" aria-label="プラン">
        <Radio value="a" />
      </RadioGroup>
    </div>
  ),

  chip: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Chip variant="assist" icon={<Icon name="event" size={18} />}>
        Assist
      </Chip>
      <Chip variant="filter" selected icon={<Icon name="filter_list" size={18} />}>
        Filter
      </Chip>
      <Chip variant="suggestion">候補</Chip>
    </div>
  ),

  textfield: () => (
    <TextField
      variant="outlined"
      label="メール"
      defaultValue="hello@m3.dev"
      leadingIcon={<Icon name="mail" size={20} />}
      className="w-56"
    />
  ),

  search: () => (
    <Search.Root items={[]}>
      <Search.Bar className="w-56">
        <Search.Icon>
          <Search.SearchGlyph />
        </Search.Icon>
        <Search.Input placeholder="検索" aria-label="検索" />
      </Search.Bar>
    </Search.Root>
  ),

  select: () => (
    <Select.Root defaultValue="apple">
      <Select.Trigger aria-label="果物" className="w-44">
        <Select.Value />
        <Select.Icon>
          <Icon name="arrow_drop_down" />
        </Select.Icon>
      </Select.Trigger>
    </Select.Root>
  ),

  slider: () => (
    <Slider.Root defaultValue={40} className="w-48">
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="音量" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  ),

  'date-picker': () => (
    <div className="origin-top scale-[0.72]">
      <DatePicker.Calendar defaultMonth={DEMO_DATE} today={DEMO_DATE} />
    </div>
  ),

  'time-picker': () => (
    <div className="origin-center scale-[0.78]">
      <TimePicker variant="dial" defaultValue={{ hour: 10, minute: 30 }} />
    </div>
  ),

  'navigation-bar': () => (
    <div className="w-56 overflow-hidden rounded-large border border-outline-variant bg-surface">
      <NavigationBar.Root defaultValue={['home']}>
        <NavigationBar.Item value="home" icon={<Icon name="home" />}>
          ホーム
        </NavigationBar.Item>
        <NavigationBar.Item value="search" icon={<Icon name="search" />}>
          検索
        </NavigationBar.Item>
        <NavigationBar.Item value="profile" icon={<Icon name="person" />}>
          プロフィール
        </NavigationBar.Item>
      </NavigationBar.Root>
    </div>
  ),

  'navigation-rail': () => (
    <div className="h-36 overflow-hidden rounded-large border border-outline-variant bg-surface">
      <NavigationRail.Root defaultValue={['home']} className="h-full">
        <NavigationRail.Item value="home" icon={<Icon name="home" />}>
          ホーム
        </NavigationRail.Item>
        <NavigationRail.Item value="search" icon={<Icon name="search" />}>
          検索
        </NavigationRail.Item>
        <NavigationRail.Item value="profile" icon={<Icon name="person" />}>
          プロフィール
        </NavigationRail.Item>
      </NavigationRail.Root>
    </div>
  ),

  'navigation-drawer': () => (
    <NavigationDrawer.Root
      variant="modal"
      aria-label="メール"
      className="w-48 overflow-hidden rounded-large border border-outline-variant"
    >
      <NavigationDrawer.Headline>メール</NavigationDrawer.Headline>
      <NavigationDrawer.Item leading={<Icon name="inbox" />} selected trailing="24">
        受信トレイ
      </NavigationDrawer.Item>
      <NavigationDrawer.Item leading={<Icon name="send" />}>送信済み</NavigationDrawer.Item>
    </NavigationDrawer.Root>
  ),

  'top-app-bar': () => (
    <div className="w-56 overflow-hidden rounded-large border border-outline-variant">
      <TopAppBar
        variant="small"
        leading={
          <IconButton aria-label="メニュー">
            <Icon name="menu" />
          </IconButton>
        }
        trailing={
          <IconButton aria-label="検索">
            <Icon name="search" />
          </IconButton>
        }
      >
        タイトル
      </TopAppBar>
    </div>
  ),

  'bottom-app-bar': () => (
    <div className="w-56 overflow-hidden rounded-large border border-outline-variant">
      <BottomAppBar
        aria-label="アクション"
        fab={
          <Fab size="small" color="primary" aria-label="追加">
            <Icon name="add" />
          </Fab>
        }
      >
        <IconButton aria-label="編集">
          <Icon name="edit" />
        </IconButton>
        <IconButton aria-label="その他">
          <Icon name="more_vert" />
        </IconButton>
      </BottomAppBar>
    </div>
  ),

  card: () => (
    <Card variant="elevated" className="w-44 p-3">
      <p className="text-title-small text-on-surface">Elevated</p>
      <p className="text-body-small text-on-surface-variant">M3 カード</p>
    </Card>
  ),

  dialog: () => (
    <div className="w-48 rounded-extra-large bg-surface-container-high p-4 shadow-level2">
      <p className="m-0 text-title-small text-on-surface">変更を保存しますか？</p>
      <p className="mt-1 text-body-small text-on-surface-variant">この操作は取り消せません。</p>
      <div className="mt-3 flex justify-end gap-1">
        <Button variant="text">キャンセル</Button>
        <Button variant="filled">保存</Button>
      </div>
    </div>
  ),

  'bottom-sheet': () => (
    <div className="w-52 rounded-t-large bg-surface-container-low p-3 shadow-level2">
      <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-outline-variant" />
      <p className="m-0 text-title-small">共有先を選択</p>
      <p className="mt-1 text-body-small text-on-surface-variant">スワイプで閉じます</p>
    </div>
  ),

  'side-sheet': () => (
    <div className="w-44 rounded-s-large border border-outline-variant bg-surface-container-low p-3 shadow-level1">
      <p className="m-0 text-title-small">フィルター</p>
      <p className="mt-1 text-body-small text-on-surface-variant">補足テキスト</p>
    </div>
  ),

  menu: () => (
    <div className="min-w-40 rounded-medium bg-surface-container-low p-1 shadow-level2">
      <div className="flex h-12 items-center gap-3 px-3 text-label-large text-on-surface">
        <span className="inline-flex text-on-surface-variant">
          <Icon name="person" size={24} />
        </span>
        プロフィール
      </div>
      <div className="flex h-12 items-center gap-3 px-3 text-label-large text-on-surface">
        <span className="inline-flex text-on-surface-variant">
          <Icon name="content_copy" size={24} />
        </span>
        コピー
      </div>
      <div className="flex h-12 items-center px-3 text-label-large text-on-surface">ログアウト</div>
    </div>
  ),

  tooltip: () => (
    <div className="flex flex-col items-center gap-2">
      <IconButton variant="standard" aria-label="情報">
        <Icon name="info" />
      </IconButton>
      <div className="rounded-small bg-inverse-surface px-2 py-1 text-label-small text-inverse-on-surface">
        説明的なツールチップ
      </div>
    </div>
  ),

  badge: () => (
    <div className="flex items-center gap-6">
      <span className="relative inline-flex text-on-surface">
        <Icon name="mail" />
        <Badge aria-label="新着あり" />
      </span>
      <span className="relative inline-flex text-on-surface">
        <Icon name="notifications" />
        <Badge value={3} />
      </span>
    </div>
  ),

  divider: () => (
    <div className="w-48 rounded-medium bg-surface-container-low p-3">
      <p className="m-0 text-body-small text-on-surface">最初</p>
      <Divider inset="middle" />
      <p className="m-0 text-body-small text-on-surface">次の段落</p>
    </div>
  ),

  list: () => (
    <div className="w-52 overflow-hidden rounded-large border border-outline-variant bg-surface-container-low">
      <List.Root>
        <List.Item interactive leading={<Icon name="inbox" />} trailing={<span>24</span>}>
          受信トレイ
        </List.Item>
        <List.Item interactive leading={<Icon name="send" />}>
          送信済み
        </List.Item>
      </List.Root>
    </div>
  ),

  item: () => (
    <div className="w-52 overflow-hidden rounded-large border border-outline-variant bg-surface-container-low">
      <Item
        overline="OVERLINE"
        supporting="補助テキスト"
        leading={<Icon name="folder" />}
        trailing={<Icon name="chevron_right" />}
      >
        見出しテキスト
      </Item>
    </div>
  ),

  snackbar: () => (
    <div className="flex w-52 items-center gap-3 rounded-medium bg-inverse-surface px-4 py-3 text-inverse-on-surface shadow-level2">
      <span className="text-body-medium">変更を保存しました</span>
      <Button variant="text" className="text-inverse-primary">
        元に戻す
      </Button>
    </div>
  ),

  progress: () => (
    <div className="flex w-48 flex-col gap-3">
      <Progress.Linear value={66} aria-label="進捗" />
      <Progress.Circular value={66} aria-label="進捗" />
    </div>
  ),

  'loading-indicator': () => <LoadingIndicator aria-label="読み込み中" />,

  tabs: () => (
    <Tabs.Root defaultValue="overview" variant="primary" className="w-52">
      <Tabs.List>
        <Tabs.Tab value="overview">概要</Tabs.Tab>
        <Tabs.Tab value="specs">仕様</Tabs.Tab>
        <Tabs.Tab value="reviews">レビュー</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
    </Tabs.Root>
  ),

  toolbar: () => (
    <Toolbar aria-label="書式">
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
  ),

  carousel: () => (
    <Carousel.Root aria-label="ギャラリー" className="w-52">
      <Carousel.Item className="flex items-end bg-primary-container p-3 text-label-large text-on-primary-container">
        画像 1
      </Carousel.Item>
      <Carousel.Item className="flex items-end bg-secondary-container p-3 text-label-large text-on-secondary-container">
        画像 2
      </Carousel.Item>
    </Carousel.Root>
  ),
};

function FallbackPreview({ slug }: { slug: string }) {
  return (
    <div className="flex size-14 items-center justify-center rounded-full bg-surface-container-high text-primary">
      <Icon name="widgets" size={28} />
      <span className="sr-only">{slug}</span>
    </div>
  );
}

interface ComponentPreviewProps {
  slug: string;
}

export function ComponentPreview({ slug }: ComponentPreviewProps) {
  const render = PREVIEWS[slug];
  return <PreviewFrame>{render ? render() : <FallbackPreview slug={slug} />}</PreviewFrame>;
}
