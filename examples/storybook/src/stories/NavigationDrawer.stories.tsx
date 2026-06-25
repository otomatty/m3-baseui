import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/NavigationDrawer' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => {
    const { NavigationDrawer } = useM3();
    const [drawer, setDrawer] = useState('inbox');
    return (
      <NavigationDrawer.Root variant="standard" aria-label="メール" className="max-w-[280px]">
        <NavigationDrawer.Headline>メール</NavigationDrawer.Headline>
        <NavigationDrawer.Item
          leading={<Icon name="inbox" />}
          trailing="24"
          selected={drawer === 'inbox'}
          onClick={() => setDrawer('inbox')}
        >
          受信トレイ
        </NavigationDrawer.Item>
        <NavigationDrawer.Item
          leading={<Icon name="send" />}
          selected={drawer === 'sent'}
          onClick={() => setDrawer('sent')}
        >
          送信済み
        </NavigationDrawer.Item>
        <NavigationDrawer.Item
          leading={<Icon name="delete" />}
          selected={drawer === 'trash'}
          onClick={() => setDrawer('trash')}
        >
          ゴミ箱
        </NavigationDrawer.Item>
        <NavigationDrawer.Item leading={<Icon name="drafts" />} disabled>
          下書き（無効）
        </NavigationDrawer.Item>
      </NavigationDrawer.Root>
    );
  },
};
