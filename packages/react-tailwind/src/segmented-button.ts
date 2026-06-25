/**
 * segmented-button.ts — tailwind-variants slots for the M3 SegmentedButton.
 *
 * A 40dp-tall connected row with a shared outline; segments divide with a left
 * border. The selected segment surfaces `data-pressed` (Base UI Toggle) → a
 * secondary-container fill that reveals the leading checkmark (and hides any
 * provided icon) via the `group`. State layer is the item `::before`; the
 * pointer ripple is added by the factory. Same DOM as the VE build.
 */
import { createSegmentedButton } from '@m3-baseui/core';
import { tv } from './tv';

export const segmentedButtonTv = tv({
  slots: {
    root: 'inline-flex items-stretch h-10 rounded-full border border-outline overflow-hidden',
    item: [
      'group relative inline-flex flex-1 items-center justify-center gap-2 px-3 min-w-12',
      'bg-transparent border-0 border-l border-outline first:border-l-0 cursor-pointer select-none outline-none',
      'text-label-large text-on-surface',
      'transition-colors duration-150 ease-standard',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'data-[pressed]:bg-secondary-container data-[pressed]:text-on-secondary-container',
      'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0 data-[disabled]:text-on-surface/38',
      'disabled:pointer-events-none disabled:before:opacity-0 disabled:text-on-surface/38',
    ],
    check: [
      'inline-flex items-center justify-center shrink-0 h-[18px] w-0 opacity-0 overflow-hidden pointer-events-none',
      'transition-all duration-150 ease-standard',
      'group-data-[pressed]:w-[18px] group-data-[pressed]:opacity-100',
    ],
    icon: 'inline-flex items-center justify-center shrink-0 [&_svg]:size-[18px] group-data-[pressed]:hidden',
    label: 'truncate',
  },
});

const s = segmentedButtonTv();
export const SegmentedButton = createSegmentedButton({
  root: s.root(),
  item: s.item(),
  check: s.check(),
  icon: s.icon(),
  label: s.label(),
});
