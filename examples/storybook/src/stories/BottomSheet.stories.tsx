import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/BottomSheet' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { BottomSheet, Button, List } = useM3();
    return (
      <BottomSheet.Root>
        <BottomSheet.Trigger render={<Button variant="tonal" />}>ボトムシート</BottomSheet.Trigger>
        <BottomSheet.Portal>
          <BottomSheet.Backdrop />
          <BottomSheet.Viewport>
            <BottomSheet.Popup>
              <BottomSheet.Handle />
              <BottomSheet.Title>共有先を選択</BottomSheet.Title>
              <BottomSheet.Description>スワイプまたは背景タップで閉じます。</BottomSheet.Description>
              <div className="p-2">
                <List.Root>
                  <List.Item interactive leading={<Icon name="link" />}>
                    リンクをコピー
                  </List.Item>
                  <List.Item interactive leading={<Icon name="mail" />}>
                    メールで送信
                  </List.Item>
                  <List.Item interactive leading={<Icon name="download" />}>
                    ダウンロード
                  </List.Item>
                </List.Root>
              </div>
            </BottomSheet.Popup>
          </BottomSheet.Viewport>
        </BottomSheet.Portal>
      </BottomSheet.Root>
    );
  },
};
