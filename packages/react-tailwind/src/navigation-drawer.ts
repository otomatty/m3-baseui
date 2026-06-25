/**
 * navigation-drawer.ts — tailwind-variants slots for the M3 NavigationDrawer.
 *
 * A 360dp `surface-container-low` panel. `standard` is inline; `modal` floats
 * with elevation + a rounded trailing edge. Destinations are 56dp full-corner
 * pills; the active one (`data-selected`) fills with secondary-container. State
 * layer is the item `::before` (ripple added by the factory); disabled rows dim
 * per-token. Same DOM + `data-*` as the VE build.
 */
import { createNavigationDrawer } from '@m3-baseui/core';
import { tv } from './tv';

export const navigationDrawerTv = tv({
  slots: {
    root: 'flex flex-col gap-1 box-border w-[360px] p-3 bg-surface-container-low text-on-surface',
    headline: 'px-4 pt-4 pb-1 text-title-small text-on-surface-variant',
    item: [
      'group relative flex w-full items-center gap-3 box-border h-14 px-4 rounded-full text-left',
      'bg-transparent border-0 text-on-surface-variant no-underline cursor-pointer select-none overflow-hidden outline-none',
      'text-label-large',
      'transition-colors duration-150 ease-standard',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'data-[selected]:bg-secondary-container data-[selected]:text-on-secondary-container',
      'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0 data-[disabled]:text-on-surface/38',
      'disabled:pointer-events-none disabled:before:opacity-0 disabled:text-on-surface/38',
    ],
    leading: 'flex items-center justify-center shrink-0 [&_svg]:size-6',
    label: 'flex-1 min-w-0 truncate',
    trailing: 'flex items-center shrink-0 text-label-small',
  },
  variants: {
    variant: {
      standard: {},
      modal: { root: 'shadow-level1 rounded-e-large' },
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});

const s = navigationDrawerTv();
export const NavigationDrawer = createNavigationDrawer({
  root: ({ variant }) => navigationDrawerTv({ variant }).root(),
  headline: s.headline(),
  item: s.item(),
  leading: s.leading(),
  label: s.label(),
  trailing: s.trailing(),
});
export type { NavigationDrawerVariant } from '@m3-baseui/core';
