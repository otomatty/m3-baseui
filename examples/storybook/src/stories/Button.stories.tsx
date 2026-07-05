import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonSize, ButtonVariant } from '@m3-baseui/react-tailwind';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Button' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS: ButtonVariant[] = ['filled', 'tonal', 'outlined', 'elevated', 'text'];
const SIZES: ButtonSize[] = ['xs', 's', 'm', 'l', 'xl'];

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

export const Sizes: Story = {
  render: () => {
    const { Button } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        {SIZES.map((s) => (
          <Button key={s} size={s}>
            {s.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  },
};

export const Shape: Story = {
  render: () => {
    const { Button } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        {SIZES.map((s) => (
          <Button key={s} size={s} shape="square">
            {s.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  },
};

export const Toggle: Story = {
  render: () => {
    const { Button } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        {VARIANTS.map((v) => (
          <Button key={`${v}-off`} variant={v} selected={false}>
            {v}
          </Button>
        ))}
        {VARIANTS.map((v) => (
          <Button key={`${v}-on`} variant={v} selected>
            {v}
          </Button>
        ))}
      </div>
    );
  },
};
