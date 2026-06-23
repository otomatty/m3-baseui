import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3/icons';

const meta = { title: 'Components/SegmentedButton' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  render: () => {
    const { SegmentedButton } = useM3();
    const [view, setView] = useState<string[]>(['week']);
    return (
      <SegmentedButton.Root value={view} onValueChange={setView}>
        <SegmentedButton.Item value="day">日</SegmentedButton.Item>
        <SegmentedButton.Item value="week">週</SegmentedButton.Item>
        <SegmentedButton.Item value="month">月</SegmentedButton.Item>
      </SegmentedButton.Root>
    );
  },
};

export const MultiSelectWithIcons: Story = {
  render: () => {
    const { SegmentedButton } = useM3();
    const [styles, setStyles] = useState<string[]>(['bold']);
    return (
      <SegmentedButton.Root multiple value={styles} onValueChange={setStyles}>
        <SegmentedButton.Item value="bold" icon={<Icon name="format_bold" />}>
          太字
        </SegmentedButton.Item>
        <SegmentedButton.Item value="italic" icon={<Icon name="format_italic" />}>
          斜体
        </SegmentedButton.Item>
        <SegmentedButton.Item value="underline" icon={<Icon name="format_underlined" />}>
          下線
        </SegmentedButton.Item>
      </SegmentedButton.Root>
    );
  },
};
