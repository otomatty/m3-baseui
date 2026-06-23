import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useM3 } from '../engine';
import { Icon } from '@m3/icons';

const meta = { title: 'Components/Chip' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => {
    const { Chip } = useM3();
    const [filterOn, setFilterOn] = useState(true);
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Chip variant="assist">
          <Icon name="event" size={18} /> Assist
        </Chip>
        <Chip variant="filter" selected={filterOn} onSelectedChange={setFilterOn}>
          {filterOn ? <Icon name="check" size={18} /> : null} Filter
        </Chip>
        <Chip variant="suggestion">Suggestion</Chip>
        <Chip variant="input" onRemove={() => {}}>
          Input
        </Chip>
        <Chip variant="assist" elevated>
          <Icon name="bolt" size={18} /> Elevated
        </Chip>
        <Chip variant="input" avatar={<Icon name="person" size={18} />} onRemove={() => {}}>
          Avatar
        </Chip>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { Chip } = useM3();
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Chip variant="assist" disabled>
          Assist
        </Chip>
        <Chip variant="filter" disabled>
          Filter
        </Chip>
        <Chip variant="input" disabled onRemove={() => {}}>
          Input
        </Chip>
      </div>
    );
  },
};
