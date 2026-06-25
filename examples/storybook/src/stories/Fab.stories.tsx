import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Fab' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => {
    const { Fab } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-4">
        <Fab size="small" color="surface" aria-label="編集">
          <Icon name="edit" />
        </Fab>
        <Fab color="primary" aria-label="追加">
          <Icon name="add" />
        </Fab>
        <Fab size="large" color="secondary" aria-label="作成">
          <Icon name="edit" />
        </Fab>
        <Fab size="extended" color="tertiary">
          <Icon name="add" /> 作成
        </Fab>
      </div>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const { Fab } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-4">
        <Fab color="surface" aria-label="surface">
          <Icon name="add" />
        </Fab>
        <Fab color="primary" aria-label="primary">
          <Icon name="add" />
        </Fab>
        <Fab color="secondary" aria-label="secondary">
          <Icon name="add" />
        </Fab>
        <Fab color="tertiary" aria-label="tertiary">
          <Icon name="add" />
        </Fab>
      </div>
    );
  },
};
