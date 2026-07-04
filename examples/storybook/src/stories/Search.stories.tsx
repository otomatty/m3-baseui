import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Search' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const FRUITS = ['りんご', 'みかん', 'ぶどう', 'もも', 'なし', 'いちご'];

export const Basic: Story = {
  render: () => {
    const { Search } = useM3();
    return (
      <div className="max-w-md">
        <Search.Root items={FRUITS}>
          <Search.Bar>
            <Search.Icon>
              <Search.SearchGlyph />
            </Search.Icon>
            <Search.Input placeholder="果物を検索" aria-label="果物を検索" />
            <Search.Clear>
              <Icon name="close" size={24} />
            </Search.Clear>
          </Search.Bar>
          <Search.Portal>
            <Search.Positioner sideOffset={4}>
              <Search.Popup>
                <Search.Empty>該当なし</Search.Empty>
                <Search.List>
                  {(item: string) => (
                    <Search.Item key={item} value={item}>
                      <span data-slot="search-leading">
                        <Icon name="history" size={24} />
                      </span>
                      {item}
                      <Search.ItemIndicator>
                        <Search.Check />
                      </Search.ItemIndicator>
                    </Search.Item>
                  )}
                </Search.List>
              </Search.Popup>
            </Search.Positioner>
          </Search.Portal>
        </Search.Root>
      </div>
    );
  },
};
