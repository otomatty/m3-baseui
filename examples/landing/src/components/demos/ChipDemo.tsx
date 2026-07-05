import { useState } from 'react';
import { Chip } from '@m3-baseui/react-tailwind';
import { Icon } from '@m3-baseui/icons';

export function ChipDemo() {
  const [filter, setFilter] = useState(true);

  return (
    <div className="flex flex-wrap gap-3">
      <Chip variant="filter" selected={filter} onSelectedChange={setFilter}>
        フィルター
      </Chip>
      <Chip variant="assist">
        <Icon name="star" size={18} />
        おすすめ
      </Chip>
      <Chip variant="suggestion">候補</Chip>
    </div>
  );
}
