import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@otomatty/icons';

const meta = { title: 'Components/List' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { List, Divider } = useM3();
    return (
      <div className="max-w-md overflow-hidden rounded-large border border-outline-variant bg-surface-container-low">
        <List.Root>
          <List.Item
            interactive
            leading={<Icon name="inbox" />}
            trailing={<span>24</span>}
            supportingText="未読 3 件"
          >
            受信トレイ
          </List.Item>
          {/* wrap in <li> so the role="list" only owns list items (valid ARIA) */}
          <li>
            <Divider inset="inset" />
          </li>
          <List.Item
            interactive
            leading={<Icon name="send" />}
            trailing={<Icon name="chevron_right" />}
          >
            送信済み
          </List.Item>
          <li>
            <Divider inset="inset" />
          </li>
          <List.Item interactive disabled leading={<Icon name="delete" />}>
            ゴミ箱（無効）
          </List.Item>
        </List.Root>
      </div>
    );
  },
};
