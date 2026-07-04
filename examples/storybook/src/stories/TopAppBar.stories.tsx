import type { Meta, StoryObj } from '@storybook/react-vite';
import type { TopAppBarVariant } from '@m3-baseui/react-tailwind';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/TopAppBar' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS: TopAppBarVariant[] = ['small', 'center', 'medium', 'large'];

export const Variants: Story = {
  render: () => {
    const { TopAppBar, IconButton } = useM3();
    return (
      <div className="flex max-w-md flex-col gap-4">
        {VARIANTS.map((variant) => (
          <div
            key={variant}
            className="overflow-hidden rounded-large border border-outline-variant"
          >
            <TopAppBar
              variant={variant}
              leading={
                <IconButton aria-label="ナビゲーション">
                  <Icon name="menu" />
                </IconButton>
              }
              trailing={
                <>
                  <IconButton aria-label="バー内検索">
                    <Icon name="search" />
                  </IconButton>
                  <IconButton aria-label="その他">
                    <Icon name="more_vert" />
                  </IconButton>
                </>
              }
            >
              {variant}
            </TopAppBar>
          </div>
        ))}
      </div>
    );
  },
};
