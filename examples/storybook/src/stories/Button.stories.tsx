import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonVariant } from '@m3/react-tailwind';
import { useM3 } from '../engine';
import { Icon } from '@m3/icons';

const meta = { title: 'Components/Button' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS: ButtonVariant[] = ['filled', 'tonal', 'outlined', 'elevated', 'text'];

export const Variants: Story = {
  render: () => {
    const { Button } = useM3();
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { Button } = useM3();
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v} disabled>
            {v}
          </Button>
        ))}
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const { Button } = useM3();
    return (
      <div className="flex flex-wrap gap-3">
        <Button variant="filled" startIcon={<Icon name="add" size={18} />}>
          Leading
        </Button>
        <Button variant="tonal" endIcon={<Icon name="arrow_forward" size={18} />}>
          Trailing
        </Button>
      </div>
    );
  },
};
