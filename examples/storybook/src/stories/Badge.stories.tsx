import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@otomatty/icons';

const meta = { title: 'Components/Badge' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => {
    const { Badge } = useM3();
    return (
      <div className="flex items-center gap-8 text-on-surface">
        <span className="relative inline-flex">
          <Icon name="mail" />
          <Badge aria-label="新着あり" />
        </span>
        <span className="relative inline-flex">
          <Icon name="notifications" />
          <Badge value={3} />
        </span>
        <span className="relative inline-flex">
          <Icon name="chat" />
          <Badge value={120} max={99} />
        </span>
      </div>
    );
  },
};
