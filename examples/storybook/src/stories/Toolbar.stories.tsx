import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Toolbar' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => {
    const { Toolbar, IconButton } = useM3();
    return (
      <Toolbar aria-label="標準ツールバー">
        <IconButton aria-label="戻る">
          <Icon name="undo" />
        </IconButton>
        <IconButton aria-label="進む">
          <Icon name="redo" />
        </IconButton>
        <IconButton aria-label="追加">
          <Icon name="add" />
        </IconButton>
      </Toolbar>
    );
  },
};

export const Vibrant: Story = {
  render: () => {
    const { Toolbar, IconButton } = useM3();
    return (
      <Toolbar aria-label="ビビッドなツールバー" variant="vibrant">
        <IconButton aria-label="太字">
          <Icon name="format_bold" />
        </IconButton>
        <IconButton aria-label="斜体">
          <Icon name="format_italic" />
        </IconButton>
        <IconButton aria-label="下線">
          <Icon name="format_underlined" />
        </IconButton>
      </Toolbar>
    );
  },
};
