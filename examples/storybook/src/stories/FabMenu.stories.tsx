import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/FabMenu' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { FabMenu } = useM3();
    return (
      <FabMenu.Root>
        <FabMenu.Trigger color="primary" aria-label="作成">
          <Icon name="add" />
        </FabMenu.Trigger>
        <FabMenu.Portal>
          <FabMenu.Positioner sideOffset={12} align="end" side="top">
            <FabMenu.Popup>
              <FabMenu.Item icon={<Icon name="description" />}>ドキュメント</FabMenu.Item>
              <FabMenu.Item icon={<Icon name="table_chart" />}>スプレッドシート</FabMenu.Item>
              <FabMenu.Item icon={<Icon name="slideshow" />}>スライド</FabMenu.Item>
            </FabMenu.Popup>
          </FabMenu.Positioner>
        </FabMenu.Portal>
      </FabMenu.Root>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const { FabMenu } = useM3();
    return (
      <FabMenu.Root>
        <FabMenu.Trigger color="tertiary" aria-label="共有">
          <Icon name="share" />
        </FabMenu.Trigger>
        <FabMenu.Portal>
          <FabMenu.Positioner sideOffset={12} align="end" side="top">
            <FabMenu.Popup>
              <FabMenu.Item color="tertiary" icon={<Icon name="link" />}>
                リンクをコピー
              </FabMenu.Item>
              <FabMenu.Item color="tertiary" icon={<Icon name="mail" />}>
                メールで送信
              </FabMenu.Item>
              <FabMenu.Item color="tertiary" icon={<Icon name="download" />}>
                ダウンロード
              </FabMenu.Item>
            </FabMenu.Popup>
          </FabMenu.Positioner>
        </FabMenu.Portal>
      </FabMenu.Root>
    );
  },
};
