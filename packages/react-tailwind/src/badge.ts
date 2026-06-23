/**
 * badge.ts — tailwind-variants slots for the M3 Badge.
 *
 * error/on-error marker that anchors to the top-right of a positioned parent.
 * `small` is a 6dp dot; `large` is a 16dp pill carrying a `label-small` number.
 * Same DOM + `data-size` as the VE build.
 */
import { createBadge } from '@otomatty/core';
import { tv } from './tv';

export const badgeTv = tv({
  base: 'pointer-events-none select-none inline-flex items-center justify-center bg-error text-on-error',
  variants: {
    size: {
      small: 'absolute top-1 right-1 size-1.5 rounded-full',
      large:
        'absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full text-label-small leading-none tabular-nums',
    },
  },
});

export const Badge = createBadge({
  root: ({ size }) => badgeTv({ size }),
});
export type { BadgeProps, BadgeSize } from '@otomatty/core';
