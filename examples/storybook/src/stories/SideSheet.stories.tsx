import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/SideSheet' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { SideSheet, Button, IconButton, Divider } = useM3();
    return (
      <SideSheet.Root>
        <SideSheet.Trigger render={<Button variant="tonal" />}>サイドシート</SideSheet.Trigger>
        <SideSheet.Portal>
          <SideSheet.Backdrop />
          <SideSheet.Viewport>
            <SideSheet.Popup>
              <SideSheet.Header>
                <SideSheet.Title>フィルター</SideSheet.Title>
                <SideSheet.Close render={<IconButton variant="standard" aria-label="閉じる" />}>
                  <Icon name="close" />
                </SideSheet.Close>
              </SideSheet.Header>
              <Divider />
              <SideSheet.Description>補足コンテンツを画面端に表示します。</SideSheet.Description>
            </SideSheet.Popup>
          </SideSheet.Viewport>
        </SideSheet.Portal>
      </SideSheet.Root>
    );
  },
};
