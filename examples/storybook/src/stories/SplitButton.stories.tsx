import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SplitButtonVariant } from '@m3-baseui/react-tailwind';
import { useM3 } from '../engine';

const meta = { title: 'Components/SplitButton' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS: SplitButtonVariant[] = ['filled', 'tonal', 'outlined', 'elevated'];

export const Variants: Story = {
  render: () => {
    const { SplitButton } = useM3();
    return (
      <div className="flex flex-wrap gap-4">
        {VARIANTS.map((variant) => (
          <SplitButton.Root key={variant}>
            <SplitButton.Group variant={variant} aria-label={`${variant} 保存`}>
              <SplitButton.Leading>保存</SplitButton.Leading>
              <SplitButton.Trailing aria-label="その他の保存オプション" />
            </SplitButton.Group>
            <SplitButton.Portal>
              <SplitButton.Positioner sideOffset={4} align="end">
                <SplitButton.Popup>
                  <SplitButton.Item>下書き保存</SplitButton.Item>
                  <SplitButton.Item>名前を付けて保存</SplitButton.Item>
                  <SplitButton.Item>コピーを保存</SplitButton.Item>
                </SplitButton.Popup>
              </SplitButton.Positioner>
            </SplitButton.Portal>
          </SplitButton.Root>
        ))}
      </div>
    );
  },
};
