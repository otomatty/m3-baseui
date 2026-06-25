import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Item' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { Item } = useM3();
    return (
      <div className="max-w-md overflow-hidden rounded-large border border-outline-variant bg-surface-container-low">
        <Item
          overline="OVERLINE"
          supporting="補助テキスト"
          leading={<Icon name="folder" />}
          trailing={<Icon name="chevron_right" />}
        >
          見出しテキスト
        </Item>
      </div>
    );
  },
};
