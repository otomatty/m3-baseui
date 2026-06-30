import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

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

export const LeadingVariants: Story = {
  render: () => {
    const { List } = useM3();
    return (
      <div className="max-w-md overflow-hidden rounded-large border border-outline-variant bg-surface-container-low">
        <List.Root>
          {/* avatar: 40dp circle — informative, so it stays in the a11y tree. */}
          <List.Item
            leadingVariant="avatar"
            leading={
              <span
                role="img"
                aria-label="田中 太郎"
                className="grid size-full place-items-center bg-primary-container text-on-primary-container text-label-large"
              >
                田
              </span>
            }
            supportingText="オンライン"
          >
            田中 太郎
          </List.Item>
          {/* image: 56dp square. */}
          <List.Item
            leadingVariant="image"
            leading={
              <span
                role="img"
                aria-label="サムネイル"
                className="block size-full bg-secondary-container"
              />
            }
            supportingText="画像 56dp"
          >
            写真
          </List.Item>
          {/* video thumbnail: 100×56dp; pairs naturally with a taller 3-line row. */}
          <List.Item
            lines={3}
            leadingVariant="video"
            leading={
              <span
                role="img"
                aria-label="動画サムネイル"
                className="block size-full bg-tertiary-container"
              />
            }
            supportingText="動画サムネイル 100×56dp — 3 行レイアウトで top 揃え"
          >
            動画クリップ
          </List.Item>
        </List.Root>
      </div>
    );
  },
};
