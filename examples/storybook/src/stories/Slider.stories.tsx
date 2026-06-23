import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';

const meta = { title: 'Components/Slider' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { Slider } = useM3();
    return (
      <Slider.Root defaultValue={40} className="max-w-sm">
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="音量" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { Slider } = useM3();
    return (
      <Slider.Root defaultValue={60} disabled className="max-w-sm">
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="音量（無効）" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    );
  },
};
