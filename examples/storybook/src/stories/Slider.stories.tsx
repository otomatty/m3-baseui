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
            <Slider.Thumb aria-label="音量">
              <Slider.ValueLabel />
            </Slider.Thumb>
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

export const Discrete: Story = {
  render: () => {
    const { Slider } = useM3();
    return (
      <Slider.Root defaultValue={50} min={0} max={100} step={25} className="max-w-sm">
        <Slider.Control>
          <Slider.Track>
            <Slider.TickList />
            <Slider.Indicator />
            <Slider.Thumb aria-label="離散スライダー" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    );
  },
};

export const Range: Story = {
  render: () => {
    const { Slider } = useM3();
    return (
      <Slider.Root defaultValue={[25, 75]} min={0} max={100} step={5} className="max-w-sm">
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb index={0} aria-label="最低価格">
              <Slider.ValueLabel />
            </Slider.Thumb>
            <Slider.Thumb index={1} aria-label="最高価格">
              <Slider.ValueLabel />
            </Slider.Thumb>
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    );
  },
};
