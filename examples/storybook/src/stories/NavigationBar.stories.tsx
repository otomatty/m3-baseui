import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/NavigationBar' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { NavigationBar } = useM3();
    const [nav, setNav] = useState<string[]>(['home']);
    return (
      <div className="max-w-md overflow-hidden rounded-large border border-outline-variant">
        <NavigationBar.Root value={nav} onValueChange={setNav}>
          <NavigationBar.Item value="home" icon={<Icon name="home" />}>
            ホーム
          </NavigationBar.Item>
          <NavigationBar.Item value="search" icon={<Icon name="search" />}>
            検索
          </NavigationBar.Item>
          <NavigationBar.Item value="favorites" icon={<Icon name="favorite" />}>
            お気に入り
          </NavigationBar.Item>
          <NavigationBar.Item value="profile" icon={<Icon name="person" />}>
            プロフィール
          </NavigationBar.Item>
        </NavigationBar.Root>
      </div>
    );
  },
};
