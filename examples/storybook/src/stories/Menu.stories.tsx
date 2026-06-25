import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Menu' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { Menu, Button } = useM3();
    return (
      <Menu.Root>
        <Menu.Trigger render={<Button variant="tonal" />}>メニュー</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8}>
            <Menu.Popup>
              <Menu.Item>
                <span data-slot="menu-leading">
                  <Icon name="person" size={24} />
                </span>
                プロフィール
              </Menu.Item>
              <Menu.Item>
                <span data-slot="menu-leading">
                  <Icon name="content_copy" size={24} />
                </span>
                コピー
                <span data-slot="menu-trailing">⌘C</span>
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item>ログアウト</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    );
  },
};

export const WithCheckboxAndRadio: Story = {
  render: () => {
    const { Menu, Button } = useM3();
    return (
      <Menu.Root>
        <Menu.Trigger render={<Button variant="tonal" />}>表示設定</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8}>
            <Menu.Popup>
              <Menu.CheckboxItem defaultChecked>
                <Menu.CheckboxItemIndicator>
                  <Menu.Check />
                </Menu.CheckboxItemIndicator>
                通知を表示
              </Menu.CheckboxItem>
              <Menu.RadioGroup defaultValue="list">
                <Menu.RadioItem value="list">
                  <Menu.RadioItemIndicator>
                    <Menu.Check />
                  </Menu.RadioItemIndicator>
                  リスト表示
                </Menu.RadioItem>
                <Menu.RadioItem value="grid">
                  <Menu.RadioItemIndicator>
                    <Menu.Check />
                  </Menu.RadioItemIndicator>
                  グリッド表示
                </Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    );
  },
};
