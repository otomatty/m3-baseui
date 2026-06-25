import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3-baseui/icons';

const meta = { title: 'Components/Select' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const FRUITS: [string, string, string][] = [
  ['apple', 'りんご', '01'],
  ['banana', 'バナナ', '02'],
  ['cherry', 'さくらんぼ', '03'],
  ['grape', 'ぶどう', '04'],
  ['melon', 'メロン', '05'],
  ['orange', 'オレンジ', '06'],
];

export const Basic: Story = {
  render: () => {
    const { Select } = useM3();
    return (
      <Select.Root defaultValue="apple">
        <Select.Trigger aria-label="果物を選択">
          <Select.Value />
          <Select.Icon>
            <Icon name="arrow_drop_down" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4}>
            <Select.Popup>
              <Select.ScrollUpArrow />
              {FRUITS.map(([value, label, meta]) => (
                <Select.Item key={value} value={value}>
                  <Select.ItemIndicator>
                    <Icon name="check" size={20} />
                  </Select.ItemIndicator>
                  <Select.ItemText>{label}</Select.ItemText>
                  <span data-slot="select-trailing">{meta}</span>
                </Select.Item>
              ))}
              <Select.ScrollDownArrow />
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    );
  },
};
