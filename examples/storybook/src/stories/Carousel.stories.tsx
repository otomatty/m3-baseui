import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CarouselVariant } from '@m3-baseui/react-tailwind';
import { useM3 } from '../engine';

const meta = {
  title: 'Components/Carousel',
  parameters: {
    docs: {
      description: {
        component:
          'Scroll-snap carousel with the four M3 layouts (multi-browse / uncontained / hero / full-screen). ' +
          'The scroller is keyboard-focusable: tab to it, then use the arrow keys along the scroll axis ' +
          '(←/→ horizontally, ↑/↓ for full-screen) to advance one item at a time. A keyboard-only focus ' +
          'ring shows where you are, and the scroll animation drops under prefers-reduced-motion.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const SWATCHES = [
  'bg-primary-container text-on-primary-container',
  'bg-secondary-container text-on-secondary-container',
  'bg-tertiary-container text-on-tertiary-container',
  'bg-error-container text-on-error-container',
  'bg-surface-container-highest text-on-surface',
] as const;

function Gallery({ variant, label }: { variant?: CarouselVariant; label: string }) {
  const { Carousel } = useM3();
  return (
    <Carousel.Root aria-label={label} variant={variant} className="max-w-md">
      {SWATCHES.map((swatch, i) => (
        <Carousel.Item
          // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
          key={i}
          className={`${swatch} flex items-end p-3 text-label-large`}
        >
          画像 {i + 1}
        </Carousel.Item>
      ))}
    </Carousel.Root>
  );
}

export const Basic: Story = {
  render: () => <Gallery label="ギャラリー（multi-browse）" />,
};

export const Uncontained: Story = {
  render: () => <Gallery variant="uncontained" label="ギャラリー（uncontained）" />,
};

export const Hero: Story = {
  render: () => <Gallery variant="hero" label="ギャラリー（hero）" />,
};
