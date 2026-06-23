import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';

const meta = { title: 'Components/Divider' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => {
    const { Divider } = useM3();
    return (
      <div className="max-w-md rounded-large border border-outline-variant bg-surface-container-low p-4">
        <p className="text-body-medium text-on-surface">最初の段落</p>
        <Divider />
        <p className="text-body-medium text-on-surface">次の段落</p>
        <Divider inset="middle" />
        <p className="text-body-medium text-on-surface">最後の段落（middle inset）</p>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const { Divider } = useM3();
    return (
      <div className="flex h-6 items-center gap-3 text-body-medium text-on-surface">
        <span>下書き</span>
        <Divider orientation="vertical" />
        <span>送信済み</span>
        <Divider orientation="vertical" />
        <span>ゴミ箱</span>
      </div>
    );
  },
};
