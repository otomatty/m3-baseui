import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

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

// M3 Expressive `shape` prop: round = full circle, square = a rounded box.
export const Shapes: Story = {
  render: () => {
    const { IconButton } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        <IconButton variant="filled" shape="round" size="m" aria-label="Round">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="filled" shape="square" size="m" aria-label="Square">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="outlined" shape="round" size="m" aria-label="Round outlined">
          <Icon name="edit" />
        </IconButton>
        <IconButton variant="outlined" shape="square" size="m" aria-label="Square outlined">
          <Icon name="edit" />
        </IconButton>
      </div>
    );
  },
};

// Toggle: `selected` swaps to the opposite shape (round↔square) and the
// Selected/Unselected color set — tonal selected is now visibly distinct.
export const Toggle: Story = {
  render: () => {
    const { IconButton } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        <IconButton variant="filled" selected={false} aria-label="Filled オフ">
          <Icon name="favorite" />
        </IconButton>
        <IconButton variant="filled" selected aria-label="Filled オン">
          <Icon name="favorite" filled />
        </IconButton>
        <IconButton variant="tonal" selected={false} aria-label="Tonal オフ">
          <Icon name="star" />
        </IconButton>
        <IconButton variant="tonal" selected aria-label="Tonal オン">
          <Icon name="star" filled />
        </IconButton>
        <IconButton variant="filled" shape="square" selected aria-label="Square 選択（→full）">
          <Icon name="bookmark" filled />
        </IconButton>
      </div>
    );
  },
};
