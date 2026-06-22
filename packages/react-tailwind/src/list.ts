/**
 * list.ts — tailwind-variants slots for the M3 List.
 *
 * `surface` container with 8dp block padding; rows are 56/72/88dp for
 * one/two/three-line. Interactive rows get a `currentColor` state-layer
 * `::before` (the pointer ripple is added by the factory) and dim per-token when
 * `data-disabled`. Headline is `body-large`/`on-surface`, supporting
 * `body-medium`/`on-surface-variant`, leading/trailing `on-surface-variant`.
 * Same DOM as the VE build.
 */
import { createList } from '@m3/core';
import { tv } from './tv';

export const listTv = tv({
  slots: {
    root: 'list-none m-0 px-0 py-2 bg-transparent',
    item: [
      'group relative flex w-full items-center gap-4 box-border px-4 text-left',
      'bg-transparent border-0 text-on-surface no-underline',
    ],
    leading: 'flex items-center justify-center shrink-0 text-on-surface-variant [&_svg]:size-6',
    content: 'flex flex-col min-w-0 flex-1',
    headline: 'text-body-large text-on-surface group-data-[disabled]:text-on-surface/38',
    supporting: 'text-body-medium text-on-surface-variant group-data-[disabled]:text-on-surface/38',
    trailing: [
      'flex items-center shrink-0 text-label-small text-on-surface-variant [&_svg]:size-6',
      'group-data-[disabled]:text-on-surface/38',
    ],
  },
  variants: {
    lines: {
      1: { item: 'min-h-14 py-2' },
      2: { item: 'min-h-[72px] py-2' },
      3: { item: 'min-h-[88px] items-start py-3' },
    },
    interactive: {
      true: {
        item: [
          'cursor-pointer select-none overflow-hidden outline-none',
          'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
          'hover:before:opacity-[var(--md-sys-state-hover)]',
          'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
          'active:before:opacity-[var(--md-sys-state-pressed)]',
          'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0',
          'disabled:pointer-events-none disabled:before:opacity-0',
        ],
      },
      false: {},
    },
  },
  defaultVariants: {
    lines: 1,
    interactive: false,
  },
});

export const List = createList({
  root: listTv().root(),
  item: ({ lines, interactive }) => {
    const c = listTv({ lines, interactive });
    return {
      item: c.item(),
      leading: c.leading(),
      content: c.content(),
      headline: c.headline(),
      supporting: c.supporting(),
      trailing: c.trailing(),
    };
  },
});
export type { ListItemProps, ListItemLines } from '@m3/core';
