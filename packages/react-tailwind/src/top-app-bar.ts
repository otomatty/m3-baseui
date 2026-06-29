/**
 * top-app-bar.ts — tailwind-variants slots for the M3 TopAppBar.
 *
 * A `surface` bar. `small`/`center` are a single 64dp row (title-large, left vs.
 * centered); `medium`/`large` add a second headline line (headline-small /
 * headline-medium) below a 64dp action row, for 112dp / 152dp totals. The active
 * variant is exposed as `data-variant`. Same DOM as the VE build.
 */
import { createTopAppBar } from '@m3-baseui/core';
import { tv } from './tv';

export const topAppBarTv = tv({
  slots: {
    root: 'flex flex-col w-full box-border h-16 bg-surface text-on-surface',
    row: 'flex items-center gap-1 h-16 px-1',
    leading: 'flex items-center shrink-0 text-on-surface [&_svg]:size-6',
    headline: 'min-w-0 truncate text-on-surface',
    trailing: 'flex items-center gap-1 shrink-0 text-on-surface-variant [&_svg]:size-6',
  },
  variants: {
    variant: {
      small: { headline: 'flex-1 px-3 text-title-large' },
      center: { headline: 'flex-1 px-3 text-center text-title-large' },
      medium: { root: 'h-28', headline: 'px-4 pb-6 text-headline-small' },
      large: { root: 'h-38', headline: 'px-4 pb-7 text-headline-medium' },
    },
  },
  defaultVariants: {
    variant: 'small',
  },
});

export const TopAppBar = createTopAppBar((args) => {
  const s = topAppBarTv({ variant: args.variant });
  return {
    root: s.root(),
    row: s.row(),
    leading: s.leading(),
    headline: s.headline(),
    trailing: s.trailing(),
  };
});
export type { TopAppBarProps, TopAppBarVariant } from '@m3-baseui/core';
