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
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
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
    ],
    icon: [
      'relative flex items-center justify-center text-on-surface-variant',
      'transition-colors duration-150 ease-standard',
      'group-data-[pressed]:text-on-secondary-container',
    ],
    label: [
      'text-label-medium text-on-surface-variant',
      'transition-colors duration-150 ease-standard',
      'group-data-[pressed]:text-on-surface group-data-[pressed]:font-bold',
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
