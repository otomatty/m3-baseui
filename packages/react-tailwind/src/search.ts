/**
 * search.ts — Tailwind classes for the M3 Search (search bar + docked view).
 *
 * Resting bar: surface-container-high pill (full corner, 56dp) with a leading
 * magnifier and a body-large input. The docked view is a surface-container-high
 * popup (elevation 3) whose suggestion rows carry a `before:` state layer keyed
 * to hover + Base UI's data-[highlighted]/data-[selected]. Same DOM + ripple as
 * the VE build.
 */
import { createSearch } from '@m3-baseui/core';
import { tv } from './tv';

export const searchTv = tv({
  slots: {
    bar: [
      'flex items-center gap-1 h-14 min-w-[360px] max-w-full pl-4 pr-2',
      'bg-surface-container-high text-on-surface rounded-full',
      'transition-shadow duration-150 ease-standard',
      'focus-within:shadow-level1',
    ],
    icon: [
      'inline-flex shrink-0 items-center justify-center text-on-surface-variant',
      '[&>svg]:size-6',
    ],
    input: [
      'flex-1 min-w-0 h-full bg-transparent border-0 outline-none',
      'text-body-large text-on-surface placeholder:text-on-surface-variant',
    ],
    clear: [
      'relative inline-flex shrink-0 items-center justify-center size-10 rounded-full overflow-hidden',
      'text-on-surface-variant cursor-pointer outline-none [&>svg]:size-6',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
    ],
    popup: [
      'w-[var(--anchor-width)] min-w-[360px] max-h-[min(72vh,480px)] overflow-y-auto py-2',
      'bg-surface-container-high text-on-surface rounded-large shadow-level3',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0',
      'focus:outline-none',
    ],
    list: ['outline-none'],
    item: [
      'group relative grid grid-cols-[24px_1fr_24px] items-center gap-4 h-14 px-4 overflow-hidden',
      'cursor-pointer select-none outline-none text-body-large text-on-surface',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
      'data-[selected]:before:opacity-[var(--md-sys-state-pressed)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'data-[disabled]:text-on-surface/[0.38] data-[disabled]:before:opacity-0 data-[disabled]:pointer-events-none',
      '[&_[data-slot=search-leading]]:inline-flex [&_[data-slot=search-leading]]:text-on-surface-variant [&_[data-slot=search-leading]>svg]:size-6',
    ],
    itemIndicator: [
      'inline-flex items-center justify-center text-on-surface',
      'invisible group-data-[selected]:visible',
    ],
    empty: ['px-4 py-3 text-body-medium text-on-surface-variant'],
    separator: ['my-2 h-px border-0 bg-outline-variant'],
    groupLabel: ['px-4 py-2 text-label-small text-on-surface-variant'],
  },
});

const s = searchTv();
export const Search = createSearch({
  bar: s.bar(),
  icon: s.icon(),
  input: s.input(),
  clear: s.clear(),
  popup: s.popup(),
  list: s.list(),
  item: s.item(),
  itemIndicator: s.itemIndicator(),
  empty: s.empty(),
  separator: s.separator(),
  groupLabel: s.groupLabel(),
});
