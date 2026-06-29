import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

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

export const Rich: Story = {
  render: () => {
    const { Tooltip, Button } = useM3();
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger render={<Button variant="text" />}>リッチ</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={6}>
              <Tooltip.RichPopup>
                <Tooltip.Subhead>リッチツールチップ</Tooltip.Subhead>
                <Tooltip.SupportingText>
                  補足説明を含む、操作可能なツールチップです。
                </Tooltip.SupportingText>
                <Tooltip.Actions>
                  <Button variant="text">詳細</Button>
                </Tooltip.Actions>
              </Tooltip.RichPopup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  },
};
