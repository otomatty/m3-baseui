/**
 * select.ts — Tailwind classes for the M3 Select.
 *
 * Trigger = outlined field (56dp; 3dp primary border when open/focused, per the
 * M3 outlined-field focus-outline-width). Popup = M3 menu surface sized to the
 * anchor. Items mirror the Menu item (state layer + ripple) with a leading check
 * indicator. Same DOM as the VE build.
 *
 * Disabled follows the M3 outlined-field per-token opacities (not a blanket
 * fade): outline on-surface/0.12, label/value + icon on-surface/0.38.
 */
import { createSelect } from '@m3/core';
import { tv } from './tv';

export const selectTv = tv({
  slots: {
    trigger: [
      'group relative inline-flex items-center justify-between gap-2 box-border',
      'h-14 min-w-[200px] px-4 rounded-extra-small border border-outline bg-transparent',
      'text-on-surface text-body-large cursor-pointer outline-none text-left',
      'transition-colors duration-150 ease-standard',
      // focus/open = 3dp primary outline; padding drops 2px to keep content steady
      'data-[popup-open]:border-primary data-[popup-open]:border-[3px] data-[popup-open]:px-[14px]',
      'focus-visible:border-primary focus-visible:border-[3px] focus-visible:px-[14px]',
      'data-[disabled]:border-on-surface/[0.12] data-[disabled]:text-on-surface/[0.38] data-[disabled]:pointer-events-none',
    ],
    value: 'flex-1 truncate',
    icon: 'flex text-on-surface-variant transition-transform duration-150 group-data-[popup-open]:rotate-180 group-data-[disabled]:text-on-surface/[0.38]',
    popup: [
      'min-w-[var(--anchor-width)] max-h-[var(--available-height)] py-2 overflow-auto',
      'bg-surface-container text-on-surface rounded-extra-small shadow-level2',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0',
      'focus:outline-none',
    ],
    item: [
      'group relative grid grid-cols-[24px_1fr_auto] items-center gap-2 h-12 px-3 overflow-hidden',
      'cursor-pointer select-none outline-none text-body-large text-on-surface',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
      // M3 trailing supporting text (e.g. meta) sits in the last column.
      '[&_[data-slot=select-trailing]]:pl-4 [&_[data-slot=select-trailing]]:text-label-large [&_[data-slot=select-trailing]]:text-on-surface-variant',
    ],
    itemIndicator:
      'inline-flex items-center justify-center text-primary invisible group-data-[selected]:visible',
    groupLabel: 'px-3 py-2 text-label-small text-on-surface-variant',
    // Sticky scroll affordances at the popup edges; surface-tinted with a chevron.
    scrollUpArrow: [
      'sticky top-0 z-[1] flex items-center justify-center h-6 cursor-default',
      'bg-surface-container text-on-surface-variant [&>svg]:size-5',
    ],
    scrollDownArrow: [
      'sticky bottom-0 z-[1] flex items-center justify-center h-6 cursor-default',
      'bg-surface-container text-on-surface-variant [&>svg]:size-5',
    ],
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
  scrollUpArrow: s.scrollUpArrow(),
  scrollDownArrow: s.scrollDownArrow(),
});
