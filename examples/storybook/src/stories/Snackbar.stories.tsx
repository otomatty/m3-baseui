import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Snackbar' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function SnackbarList() {
  const { Snackbar, useSnackbar } = useM3();
  const { toasts } = useSnackbar();
  return (
    <>
      {toasts.map((toast) => (
        <Snackbar.Root key={toast.id} toast={toast}>
          <Snackbar.Content>
            <Snackbar.Title />
            {toast.description ? <Snackbar.Description /> : null}
          </Snackbar.Content>
          {toast.actionProps ? <Snackbar.Action /> : null}
          <Snackbar.Close aria-label="閉じる">
            <Icon name="close" size={20} />
          </Snackbar.Close>
        </Snackbar.Root>
      ))}
    </>
  );
}

function SnackbarDemo() {
  const { Snackbar, Button, useSnackbar } = useM3();
  const { add } = useSnackbar();
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="tonal" onClick={() => add({ title: '変更を保存しました' })}>
          単一行
        </Button>
        <Button
          variant="tonal"
          onClick={() =>
            add({
              title: 'メッセージをアーカイブしました',
              description: '受信トレイから移動しました',
              actionProps: { children: '元に戻す' },
            })
          }
        >
          アクション付き
        </Button>
      </div>
      <Snackbar.Viewport>
        <SnackbarList />
      </Snackbar.Viewport>
    </>
  );
}

export const Basic: Story = {
  render: () => {
    const { Snackbar } = useM3();
    return (
      <Snackbar.Provider>
        <SnackbarDemo />
      </Snackbar.Provider>
    );
  },
};
