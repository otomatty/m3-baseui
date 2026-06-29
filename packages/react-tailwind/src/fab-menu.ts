/**
 * fab-menu.ts — tailwind-variants for the M3 FAB menu.
 *
 * The popup stacks the actions in a right-aligned column with the M3 menu
 * enter/exit motion; each item is a 56dp full-corner pill (elevation level3,
 * level4 on hover) with a currentColor state-layer `::before`, a 24dp leading
 * icon slot and a label-large label. The trigger reuses the FAB resolver. Same
 * DOM + ripple as the VE build.
 */
import { createFabMenu } from '@m3-baseui/core';
import { tv } from './tv';
import { fabTv } from './fab';

export const fabMenuTv = tv({
  slots: {
    popup: [
      'flex flex-col items-end gap-2 bg-transparent outline-none',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0',
    ],
    item: [
      'relative inline-flex items-center gap-3 h-14 px-4 overflow-hidden box-border',
      'cursor-pointer select-none outline-none rounded-full text-label-large',
      'shadow-level3 hover:shadow-level4 transition-shadow duration-150 ease-standard',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      // M3 leading icon (24dp).
      '[&_[data-slot=fab-menu-leading]]:inline-flex [&_[data-slot=fab-menu-leading]>svg]:size-6',
      // M3 discourages disabled FABs; when used, match the filled-button tokens
      // (per-token, not a blanket opacity) and suppress the state layer.
      'data-[disabled]:pointer-events-none data-[disabled]:shadow-none data-[disabled]:before:opacity-0',
      'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
    ],
  },
  variants: {
    color: {
      surface: { item: 'bg-surface-container-high text-primary' },
      primary: { item: 'bg-primary-container text-on-primary-container' },
      secondary: { item: 'bg-secondary-container text-on-secondary-container' },
      tertiary: { item: 'bg-tertiary-container text-on-tertiary-container' },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const FabMenu = createFabMenu(({ size, color }) => fabTv({ size, color }), {
  popup: fabMenuTv().popup(),
  item: (color) => fabMenuTv({ color }).item(),
});

export type { FabMenuTriggerProps, FabMenuItemProps } from '@m3-baseui/core';
