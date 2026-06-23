import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';

const meta = { title: 'Components/Progress' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = {
  render: () => {
    const { Progress } = useM3();
    return (
      <div className="flex max-w-md flex-col gap-6">
        <Progress.Linear value={66} aria-label="ダウンロード" />
        <Progress.Linear aria-label="読み込み中" />
      </div>
    );
  },
};

export const Circular: Story = {
  render: () => {
    const { Progress } = useM3();
    return (
      <div className="flex items-center gap-6">
        <Progress.Circular value={66} aria-label="アップロード" />
        <Progress.Circular aria-label="処理中" />
      </div>
    );
  },
};
