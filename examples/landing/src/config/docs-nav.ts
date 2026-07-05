/** Sidebar and index navigation for the docs section. */

export interface NavLink {
  label: string;
  href: string;
}

export const GUIDE_LINKS: NavLink[] = [
  { label: 'はじめに', href: '/docs' },
  { label: '導入', href: '/docs/getting-started' },
  { label: 'テーマ・動的配色', href: '/docs/theming' },
  { label: 'スタイリングエンジン', href: '/docs/engines' },
  { label: 'コンポーネント一覧', href: '/docs/components' },
];

export interface ComponentGroup {
  title: string;
  items: NavLink[];
}

/** Component sidebar groups — slugs must match `src/data/components.ts`. */
export const COMPONENT_GROUPS: ComponentGroup[] = [
  {
    title: 'Actions',
    items: [
      { label: 'Button', href: '/docs/components/button' },
      { label: 'IconButton', href: '/docs/components/icon-button' },
      { label: 'ButtonGroup', href: '/docs/components/button-group' },
      { label: 'SplitButton', href: '/docs/components/split-button' },
      { label: 'Fab', href: '/docs/components/fab' },
      { label: 'FabMenu', href: '/docs/components/fab-menu' },
      { label: 'SegmentedButton', href: '/docs/components/segmented-button' },
    ],
  },
  {
    title: 'Selection',
    items: [
      { label: 'Selection controls', href: '/docs/components/selection-controls' },
      { label: 'Chip', href: '/docs/components/chip' },
    ],
  },
  {
    title: 'Text input',
    items: [
      { label: 'TextField', href: '/docs/components/textfield' },
      { label: 'Search', href: '/docs/components/search' },
      { label: 'Select', href: '/docs/components/select' },
      { label: 'Slider', href: '/docs/components/slider' },
      { label: 'DatePicker', href: '/docs/components/date-picker' },
      { label: 'TimePicker', href: '/docs/components/time-picker' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'NavigationBar', href: '/docs/components/navigation-bar' },
      { label: 'NavigationRail', href: '/docs/components/navigation-rail' },
      { label: 'NavigationDrawer', href: '/docs/components/navigation-drawer' },
      { label: 'TopAppBar', href: '/docs/components/top-app-bar' },
      { label: 'BottomAppBar', href: '/docs/components/bottom-app-bar' },
    ],
  },
  {
    title: 'Containment',
    items: [
      { label: 'Card', href: '/docs/components/card' },
      { label: 'Dialog', href: '/docs/components/dialog' },
      { label: 'BottomSheet', href: '/docs/components/bottom-sheet' },
      { label: 'SideSheet', href: '/docs/components/side-sheet' },
      { label: 'Menu', href: '/docs/components/menu' },
      { label: 'Tooltip', href: '/docs/components/tooltip' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { label: 'Badge', href: '/docs/components/badge' },
      { label: 'Divider', href: '/docs/components/divider' },
      { label: 'List', href: '/docs/components/list' },
      { label: 'Item', href: '/docs/components/item' },
      { label: 'Snackbar', href: '/docs/components/snackbar' },
      { label: 'Progress', href: '/docs/components/progress' },
      { label: 'LoadingIndicator', href: '/docs/components/loading-indicator' },
    ],
  },
  {
    title: 'Layout & media',
    items: [
      { label: 'Tabs', href: '/docs/components/tabs' },
      { label: 'Toolbar', href: '/docs/components/toolbar' },
      { label: 'Carousel', href: '/docs/components/carousel' },
    ],
  },
];
