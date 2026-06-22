/**
 * divider.ts — tailwind-variants for the M3 Divider.
 *
 * 1dp `outline-variant` rule. `self-stretch` fills the cross axis in flex
 * layouts; horizontal is 1dp tall, vertical 1dp wide. The inset variants add a
 * 16dp leading (`inset`) or both-ends (`middle`) margin along the main axis.
 * Same DOM + `role="separator"` as the VE build.
 */
import { createDivider } from '@m3/core';
import { tv } from 'tailwind-variants';

export const dividerTv = tv({
  base: 'shrink-0 self-stretch border-0 bg-outline-variant',
  variants: {
    orientation: {
      horizontal: 'h-px w-auto',
      vertical: 'w-px h-auto',
    },
    inset: {
      full: '',
      inset: '',
      middle: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', inset: 'inset', class: 'ms-4' },
    { orientation: 'horizontal', inset: 'middle', class: 'mx-4' },
    { orientation: 'vertical', inset: 'inset', class: 'mt-4' },
    { orientation: 'vertical', inset: 'middle', class: 'my-4' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    inset: 'full',
  },
});

export const Divider = createDivider(({ inset, orientation }) => dividerTv({ inset, orientation }));
export type { DividerProps, DividerInset, DividerOrientation } from '@m3/core';
