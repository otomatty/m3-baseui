import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Dialog' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { Dialog, Button } = useM3();
    return (
      <Dialog.Root>
        <Dialog.Trigger render={<Button variant="filled" />}>ダイアログを開く</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>変更を保存しますか？</Dialog.Title>
            <Dialog.Description>
              この操作は取り消せません。保存して続行してください。
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Close render={<Button variant="text" />}>キャンセル</Dialog.Close>
              <Dialog.Close render={<Button variant="filled" />}>保存</Dialog.Close>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const { Dialog, Button } = useM3();
    return (
      <Dialog.Root>
        <Dialog.Trigger render={<Button variant="tonal" />}>アイコン付き</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Icon>
              <Icon name="delete" />
            </Dialog.Icon>
            <Dialog.Title>項目を削除しますか？</Dialog.Title>
            <Dialog.Description>削除した項目は元に戻せません。</Dialog.Description>
            <Dialog.Actions>
              <Dialog.Close render={<Button variant="text" />}>キャンセル</Dialog.Close>
              <Dialog.Close render={<Button variant="filled" />}>削除</Dialog.Close>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
};

export const Fullscreen: Story = {
  render: () => {
    const { Dialog, Button, IconButton } = useM3();
    return (
      <Dialog.Root>
        <Dialog.Trigger render={<Button variant="outlined" />}>フルスクリーン</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup fullscreen>
            <Dialog.Header>
              <Dialog.Close render={<IconButton variant="standard" aria-label="閉じる" />}>
                <Icon name="close" />
              </Dialog.Close>
              <Dialog.Title>新しいイベント</Dialog.Title>
              <Dialog.Close render={<Button variant="text" />}>保存</Dialog.Close>
            </Dialog.Header>
            <Dialog.Divider />
            <div className="p-6">
              <Dialog.Description>
                フルスクリーンダイアログは edge-to-edge のサーフェスに
                ヘッダ・区切り線・コンテンツを並べます。
              </Dialog.Description>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
};
