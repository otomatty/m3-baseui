import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';

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
            <div className="flex justify-end gap-2">
              <Dialog.Close render={<Button variant="text" />}>キャンセル</Dialog.Close>
              <Dialog.Close render={<Button variant="filled" />}>保存</Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
};
