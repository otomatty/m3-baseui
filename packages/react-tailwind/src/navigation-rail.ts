/**
 * navigation-rail.ts — tailwind-variants slots for the M3 NavigationRail.
 *
 * 80dp vertical rail on `surface`. The selected destination surfaces
 * `data-pressed` (Base UI Toggle); the pill, icon and label colors key off it
 * via the `group` on each item. State layer is the pill `::before`; the pointer
 * ripple is added by the factory. `Root` renders an optional leading `header`
 * (menu button / FAB). Same DOM + `data-*` as the VE build (mirrors NavigationBar).
 */
import { createNavigationRail } from '@m3-baseui/core';
import { tv } from './tv';

export const navigationRailTv = tv({
  slots: {
    root: 'flex flex-col items-center gap-3 h-full w-20 py-5 bg-surface',
    header: 'flex flex-col items-center gap-3 mb-1',
    item: [
      'group relative flex flex-col items-center justify-center gap-1 px-1 py-1',
      'bg-transparent border-0 cursor-pointer select-none outline-none',
      // M3 disabled is per-token (icon + label dimmed below), not a blanket fade.
      'data-[disabled]:pointer-events-none',
    ],
    iconWrap: 'relative flex items-center justify-center w-14 h-8',
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
      // M3 disabled: icon dims to on-surface/0.38. The item is the only `.group`,
      // so the disabled+active override tests both attributes on that single
      // element (see NavigationBar for the rationale).
      'group-data-[disabled]:text-on-surface/[0.38]',
      'group-[&[data-disabled][data-pressed]]:text-on-surface/[0.38]',
    ],
    label: [
      'text-label-medium text-on-surface-variant',
      'transition-colors duration-150 ease-standard',
      'group-data-[pressed]:text-on-surface group-data-[pressed]:font-bold',
      // M3 disabled: label dims to on-surface/0.38 (same-element override).
      'group-data-[disabled]:text-on-surface/[0.38]',
      'group-[&[data-disabled][data-pressed]]:text-on-surface/[0.38]',
    ],
  },
});

const s = navigationRailTv();
export const NavigationRail = createNavigationRail({
  root: s.root(),
  header: s.header(),
  item: s.item(),
  iconWrap: s.iconWrap(),
  indicator: s.indicator(),
  icon: s.icon(),
  label: s.label(),
});
