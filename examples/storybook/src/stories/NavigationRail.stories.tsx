import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/NavigationRail' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const { NavigationRail, Fab } = useM3();
    const [rail, setRail] = useState<string[]>(['home']);
    return (
      <div className="h-80 w-fit overflow-hidden rounded-large border border-outline-variant">
        <NavigationRail.Root
          value={rail}
          onValueChange={setRail}
          header={
            <Fab color="primary" aria-label="作成">
              <Icon name="add" />
            </Fab>
          }
        >
          <NavigationRail.Item value="home" icon={<Icon name="home" />}>
            ホーム
          </NavigationRail.Item>
          <NavigationRail.Item value="search" icon={<Icon name="search" />}>
            検索
          </NavigationRail.Item>
          <NavigationRail.Item value="favorites" icon={<Icon name="favorite" />}>
            お気に入り
          </NavigationRail.Item>
          <NavigationRail.Item value="profile" icon={<Icon name="person" />} disabled>
            プロフィール
          </NavigationRail.Item>
        </NavigationRail.Root>
      </div>
    );
  },
};
