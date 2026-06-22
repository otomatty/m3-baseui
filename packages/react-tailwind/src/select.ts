/**
 * select.ts — Tailwind classes for the M3 Select.
 *
 * Trigger = outlined field (56dp, primary 2dp border when open/focused). Popup =
 * M3 menu surface sized to the anchor. Items mirror the Menu item (state layer +
 * ripple) with a leading check indicator. Same DOM as the VE build.
 */
import { createSelect } from '@m3/core';
import { tv } from 'tailwind-variants';

export const selectTv = tv({
  slots: {
    trigger: [
      'group relative inline-flex items-center justify-between gap-2 box-border',
      'h-14 min-w-[200px] px-4 rounded-extra-small border border-outline bg-transparent',
      'text-on-surface text-body-large cursor-pointer outline-none text-left',
      'transition-colors duration-150 ease-standard',
      'data-[popup-open]:border-primary data-[popup-open]:border-2 data-[popup-open]:px-[15px]',
      'focus-visible:border-primary focus-visible:border-2 focus-visible:px-[15px]',
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
    ],
    value: 'flex-1 truncate',
    icon: 'flex text-on-surface-variant transition-transform duration-150 group-data-[popup-open]:rotate-180',
    popup: [
      'min-w-[var(--anchor-width)] max-h-[var(--available-height)] py-2 overflow-auto',
      'bg-surface-container text-on-surface rounded-extra-small shadow-level2',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0',
      'focus:outline-none',
    ],
    item: [
      'group relative grid grid-cols-[24px_1fr] items-center gap-2 h-12 px-3 overflow-hidden',
      'cursor-pointer select-none outline-none text-body-large text-on-surface',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
    ],
    itemIndicator:
      'inline-flex items-center justify-center text-primary invisible group-data-[selected]:visible',
    groupLabel: 'px-3 py-2 text-label-small text-on-surface-variant',
  },
});

const s = selectTv();
export const Select = createSelect({
  trigger: s.trigger(),
  value: s.value(),
  icon: s.icon(),
  popup: s.popup(),
  item: s.item(),
  itemIndicator: s.itemIndicator(),
  groupLabel: s.groupLabel(),
});
