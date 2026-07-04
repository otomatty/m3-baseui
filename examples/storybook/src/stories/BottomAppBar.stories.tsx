import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/BottomAppBar' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { BottomAppBar, Fab, IconButton } = useM3();
    return (
      <div className="max-w-md overflow-hidden rounded-large border border-outline-variant">
        <BottomAppBar
          aria-label="アクション"
          fab={
            <Fab color="primary" aria-label="追加">
              <Icon name="add" />
            </Fab>
          }
        >
          <IconButton aria-label="チェック">
            <Icon name="check_box" />
          </IconButton>
          <IconButton aria-label="編集">
            <Icon name="edit" />
          </IconButton>
          <IconButton aria-label="ブックマーク">
            <Icon name="bookmark" />
          </IconButton>
          <IconButton aria-label="その他">
            <Icon name="more_vert" />
          </IconButton>
        </BottomAppBar>
      </div>
    );
  },
};
