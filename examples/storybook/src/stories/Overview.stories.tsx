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
