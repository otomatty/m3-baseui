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
    const { RichTooltip, Button } = useM3();
    // Rich tooltip is Popover-based: it opens on click so its actions are
    // reachable by keyboard and touch (a plain tooltip is visual-only).
    return (
      <RichTooltip.Root>
        <RichTooltip.Trigger render={<Button variant="text" />}>リッチ</RichTooltip.Trigger>
        <RichTooltip.Portal>
          <RichTooltip.Positioner sideOffset={6}>
            <RichTooltip.Popup>
              <RichTooltip.Subhead>リッチツールチップ</RichTooltip.Subhead>
              <RichTooltip.SupportingText>
                補足説明を含む、操作可能なツールチップです。
              </RichTooltip.SupportingText>
              <RichTooltip.Actions>
                <RichTooltip.Close render={<Button variant="text" />}>詳細</RichTooltip.Close>
              </RichTooltip.Actions>
            </RichTooltip.Popup>
          </RichTooltip.Positioner>
        </RichTooltip.Portal>
      </RichTooltip.Root>
    );
  },
};
