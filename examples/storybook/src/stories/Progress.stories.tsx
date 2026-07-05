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

export const LinearThick: Story = {
  render: () => {
    const { Progress } = useM3();
    return (
      <div className="flex max-w-md flex-col gap-6">
        <Progress.Linear value={66} thickness={8} aria-label="ダウンロード（太 8dp）" />
      </div>
    );
  },
};

export const LinearWavy: Story = {
  render: () => {
    const { Progress } = useM3();
    return (
      <div className="flex max-w-md flex-col gap-6">
        <Progress.Linear value={40} wavy aria-label="ダウンロード（波 40%）" />
        <Progress.Linear value={75} wavy amplitude={4} aria-label="ダウンロード（波 75%）" />
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

export const CircularSizes: Story = {
  render: () => {
    const { Progress } = useM3();
    return (
      <div className="flex items-center gap-6">
        <Progress.Circular value={66} size={24} aria-label="24dp" />
        <Progress.Circular value={66} aria-label="40dp（既定）" />
        <Progress.Circular value={66} size={56} thickness={6} aria-label="56dp / 6dp" />
      </div>
    );
  },
};

export const CircularWavy: Story = {
  render: () => {
    const { Progress } = useM3();
    return (
      <div className="flex items-center gap-6">
        <Progress.Circular value={66} wavy aria-label="アップロード（波）" />
        <Progress.Circular
          value={66}
          size={72}
          thickness={6}
          wavy
          amplitude={4}
          aria-label="大（波）"
        />
      </div>
    );
  },
};
