/**
 * bottom-app-bar.ts — tailwind-variants slots for the M3 BottomAppBar.
 *
 * An 80dp `surface-container` `role="toolbar"`: leading action icons + an
 * optional trailing FAB. Same DOM as the VE build.
 */
import { createBottomAppBar } from '@m3-baseui/core';
import { tv } from './tv';

export const bottomAppBarTv = tv({
  slots: {
    root: 'flex items-center justify-between w-full box-border h-20 px-1 bg-surface-container text-on-surface-variant',
    actions: 'flex items-center gap-1 pl-2 [&_svg]:size-6',
    fab: 'flex items-center pr-3',
  },
});

const s = bottomAppBarTv();
export const BottomAppBar = createBottomAppBar({
  root: s.root(),
  actions: s.actions(),
  fab: s.fab(),
});
export type { BottomAppBarProps } from '@m3-baseui/core';
