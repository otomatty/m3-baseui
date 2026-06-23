import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@otomatty/icons';

const meta = { title: 'Components/Tooltip' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { Tooltip, IconButton } = useM3();
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger render={<IconButton variant="standard" aria-label="情報" />}>
            <Icon name="info" />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={6}>
              <Tooltip.Popup>説明的なツールチップ</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  },
};
