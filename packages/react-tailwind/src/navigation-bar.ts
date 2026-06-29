/**
 * navigation-bar.ts — tailwind-variants slots for the M3 NavigationBar.
 *
 * 80dp bar on surface-container. The selected item surfaces `data-pressed`
 * (Base UI Toggle); the pill, icon and label colors key off it via the `group`
 * on each item. State layer is the pill `::before`; the pointer ripple is added
 * by the factory. Same DOM as the VE build.
 */
import { createNavigationBar } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

export const navigationBarTv = tv({
  slots: {
    root: 'flex items-stretch justify-around w-full h-20 bg-surface-container',
    item: [
      'group relative flex flex-1 flex-col items-center justify-center gap-1 px-1 pt-3 pb-4',
      'bg-transparent border-0 cursor-pointer select-none outline-none',
      // M3 disabled is per-token (icon + label dimmed below), not a blanket fade.
      'data-[disabled]:pointer-events-none',
    ],
    iconWrap: 'relative flex items-center justify-center w-16 h-8',
    indicator: [
      'absolute inset-0 rounded-full bg-transparent overflow-hidden',
      'transition-colors duration-150 ease-standard',
      'group-data-[pressed]:bg-secondary-container',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'group-hover:before:opacity-[var(--md-sys-state-hover)]',
      'group-focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'group-active:before:opacity-[var(--md-sys-state-pressed)]',
      // No state layer on a disabled destination.
      'group-data-[disabled]:before:opacity-0',
    ],
    icon: [
      'relative flex items-center justify-center text-on-surface-variant',
      'transition-colors duration-150 ease-standard',
      // Raw <svg> icons render at 24dp (Material Symbols set their own size).
      '[&_svg]:size-6',
      'group-data-[pressed]:text-on-secondary-container',
      // M3 disabled: icon dims to on-surface/0.38; the combined selector keeps a
      // disabled+active destination dimmed (outranks the data-[pressed] color).
      'group-data-[disabled]:text-on-surface/[0.38]',
      'group-data-[disabled]:group-data-[pressed]:text-on-surface/[0.38]',
    ],
    label: [
      'text-label-medium text-on-surface-variant',
      'transition-colors duration-150 ease-standard',
      'group-data-[pressed]:text-on-surface group-data-[pressed]:font-bold',
      // M3 disabled: label dims to on-surface/0.38 (combined selector keeps a
      // disabled+active label dimmed too).
      'group-data-[disabled]:text-on-surface/[0.38]',
      'group-data-[disabled]:group-data-[pressed]:text-on-surface/[0.38]',
    ],
  },
});

const s = navigationBarTv();
export const NavigationBar = createNavigationBar({
  root: s.root(),
  item: s.item(),
  iconWrap: s.iconWrap(),
  indicator: s.indicator(),
  icon: s.icon(),
  label: s.label(),
});
