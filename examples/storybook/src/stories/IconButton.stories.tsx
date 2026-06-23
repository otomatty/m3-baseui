import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@otomatty/icons';

const meta = { title: 'Components/IconButton' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => {
    const { IconButton } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        <IconButton variant="standard" aria-label="お気に入り">
          <Icon name="favorite" />
        </IconButton>
        <IconButton variant="filled" aria-label="追加">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="tonal" aria-label="編集">
          <Icon name="edit" />
        </IconButton>
        <IconButton variant="outlined" aria-label="その他">
          <Icon name="more_vert" />
        </IconButton>
        <IconButton variant="outlined" selected aria-label="ブックマーク">
          <Icon name="bookmark" filled />
        </IconButton>
        <IconButton variant="filled" disabled aria-label="無効">
          <Icon name="delete" />
        </IconButton>
      </div>
    );
  },
};

const SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;

export const Sizes: Story = {
  render: () => {
    const { IconButton } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        {SIZES.map((size) => (
          <IconButton key={size} variant="tonal" size={size} aria-label={size}>
            <Icon name="favorite" />
          </IconButton>
        ))}
      </div>
    );
  },
};

export const Widths: Story = {
  render: () => {
    const { IconButton } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        <IconButton variant="filled" size="m" width="narrow" aria-label="Narrow">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="filled" size="m" aria-label="Default">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="filled" size="m" width="wide" aria-label="Wide">
          <Icon name="add" />
        </IconButton>
      </div>
    );
  },
};
