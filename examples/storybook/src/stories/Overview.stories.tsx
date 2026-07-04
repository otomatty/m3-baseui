import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = {
  title: 'Overview/Introduction',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Literal class names — Tailwind v4 only generates classes it finds verbatim.
const ROLES = [
  ['primary', 'bg-primary text-on-primary'],
  ['secondary', 'bg-secondary text-on-secondary'],
  ['tertiary', 'bg-tertiary text-on-tertiary'],
  ['error', 'bg-error text-on-error'],
  ['surface-container', 'bg-surface-container text-on-surface'],
  ['surface-variant', 'bg-surface-variant text-on-surface-variant'],
] as const;

const OVERVIEW_COMPONENT_GROUPS = [
  {
    title: 'Actions',
    items: [
      'Button',
      'IconButton',
      'ButtonGroup',
      'SplitButton',
      'Fab',
      'FabMenu',
      'SegmentedButton',
    ],
  },
  {
    title: 'Selection',
    items: ['Selection controls', 'Chip'],
  },
  {
    title: 'Text input',
    items: ['TextField', 'Search', 'Select', 'Slider', 'DatePicker', 'TimePicker'],
  },
  {
    title: 'Navigation',
    items: ['NavigationBar', 'NavigationRail', 'NavigationDrawer', 'TopAppBar', 'BottomAppBar'],
  },
  {
    title: 'Containment',
    items: ['Card', 'Dialog', 'BottomSheet', 'SideSheet', 'Menu', 'Tooltip'],
  },
  {
    title: 'Communication',
    items: ['Badge', 'Divider', 'List', 'Item', 'Snackbar', 'Progress', 'LoadingIndicator'],
  },
  {
    title: 'Layout & media',
    items: ['Tabs', 'Toolbar', 'Carousel'],
  },
] as const;

/**
 * Landing story. Explains the dual-engine setup and shows a live swatch grid
 * driven by the Theme controls (seed/scheme/contrast/mode) — flip the Engine
 * toolbar to confirm both builds render identically.
 */
export const Introduction: Story = {
  render: () => {
    const { Button, Card } = useM3();
    return (
      <div className="flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-headline-medium">M3 on Base UI</h1>
          <p className="text-body-medium text-on-surface-variant">
            Material Design 3 components on Base UI, shipped for two styling engines (Tailwind CSS
            v4 &amp; vanilla-extract). Use the <strong>Engine</strong> toolbar to switch builds and
            the <strong>Controls</strong> panel to drive dynamic color (seed / scheme / contrast /
            mode).
          </p>
          <p className="text-body-medium text-on-surface-variant">
            左サイドバーの <strong>Components</strong>{' '}
            から各コンポーネントのバリアント・状態を確認できます。
          </p>
        </div>

        <Card variant="filled" className="p-4">
          <p className="text-title-medium text-on-surface">Dynamic color roles</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ROLES.map(([name, classes]) => (
              <div
                key={name}
                className={`rounded-medium flex h-16 items-end p-2 text-label-small ${classes}`}
              >
                {name}
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="filled" startIcon={<Icon name="palette" size={18} />}>
            Adjust the seed in Controls
          </Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </div>
      </div>
    );
  },
};

export const ComponentIndex: Story = {
  render: () => {
    const { Card } = useM3();
    return (
      <div className="flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-headline-small">Component index</h2>
          <p className="text-body-medium text-on-surface-variant">
            公開 API の全コンポーネントに対応するストーリーです。Engine ツールバーで Tailwind /
            vanilla-extract を切り替え、同一 DOM・同一 data-* 契約を確認できます。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {OVERVIEW_COMPONENT_GROUPS.map(({ title, items }) => (
            <Card key={title} variant="filled" className="p-4">
              <p className="text-title-medium text-on-surface">{title}</p>
              <ul className="mt-2 flex flex-col gap-1 text-body-medium text-on-surface-variant">
                {items.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};
