import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@otomatty/icons';

const meta = { title: 'Components/Tabs' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const { Tabs } = useM3();
    return (
      <Tabs.Root defaultValue="overview" variant="primary" className="max-w-md">
        <Tabs.List>
          <Tabs.Tab value="overview">概要</Tabs.Tab>
          <Tabs.Tab value="specs">仕様</Tabs.Tab>
          <Tabs.Tab value="reviews">レビュー</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="overview" className="text-body-medium">
          概要のコンテンツ
        </Tabs.Panel>
        <Tabs.Panel value="specs" className="text-body-medium">
          仕様のコンテンツ
        </Tabs.Panel>
        <Tabs.Panel value="reviews" className="text-body-medium">
          レビューのコンテンツ
        </Tabs.Panel>
      </Tabs.Root>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const { Tabs } = useM3();
    return (
      <Tabs.Root defaultValue="home" variant="primary" className="max-w-md">
        <Tabs.List>
          <Tabs.Tab value="home" icon={<Icon name="home" size={24} />}>
            ホーム
          </Tabs.Tab>
          <Tabs.Tab value="search" icon={<Icon name="search" size={24} />}>
            検索
          </Tabs.Tab>
          <Tabs.Tab value="profile" icon={<Icon name="person" size={24} />}>
            プロフィール
          </Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
      </Tabs.Root>
    );
  },
};

export const Scrollable: Story = {
  render: () => {
    const { Tabs } = useM3();
    return (
      <Tabs.Root defaultValue="t1" variant="secondary" className="max-w-xs">
        <Tabs.List scrollable>
          {['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'].map((t) => (
            <Tabs.Tab key={t} value={t}>
              タブ {t.slice(1)}
            </Tabs.Tab>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
      </Tabs.Root>
    );
  },
};
