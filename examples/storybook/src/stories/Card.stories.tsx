import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';

const meta = { title: 'Components/Card' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => {
    const { Card } = useM3();
    return (
      <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
        <Card variant="elevated" className="p-4">
          <p className="text-title-medium text-on-surface">Elevated</p>
          <p className="text-body-medium text-on-surface-variant">surface + level1</p>
        </Card>
        <Card variant="filled" className="p-4">
          <p className="text-title-medium text-on-surface">Filled</p>
          <p className="text-body-medium text-on-surface-variant">container-highest</p>
        </Card>
        <Card variant="outlined" className="p-4">
          <p className="text-title-medium text-on-surface">Outlined</p>
          <p className="text-body-medium text-on-surface-variant">outline-variant</p>
        </Card>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const { Card } = useM3();
    return (
      <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
        <Card variant="outlined" interactive className="p-4">
          <p className="text-title-medium">押せるカード</p>
          <p className="text-body-medium text-on-surface-variant">state layer + ripple</p>
        </Card>
        <Card variant="filled" interactive disabled className="p-4">
          <p className="text-title-medium">無効カード</p>
          <p className="text-body-medium">操作できません</p>
        </Card>
      </div>
    );
  },
};
