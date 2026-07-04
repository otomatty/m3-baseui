import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';

const meta = { title: 'Components/Carousel' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const SWATCHES = [
  'bg-primary-container text-on-primary-container',
  'bg-secondary-container text-on-secondary-container',
  'bg-tertiary-container text-on-tertiary-container',
  'bg-error-container text-on-error-container',
  'bg-surface-container-highest text-on-surface',
] as const;

export const Basic: Story = {
  render: () => {
    const { Carousel } = useM3();
    return (
      <Carousel.Root aria-label="ギャラリー" className="max-w-md">
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
  },
};
