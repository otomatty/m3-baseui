import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';

const meta = { title: 'Components/LoadingIndicator' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => {
    const { LoadingIndicator } = useM3();
    return (
      <div className="flex items-center gap-6">
        <LoadingIndicator aria-label="読み込み中" />
        <LoadingIndicator aria-label="読み込み中（contained）" contained />
      </div>
    );
  },
};
