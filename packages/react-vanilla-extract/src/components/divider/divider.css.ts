/**
 * divider.css.ts — vanilla-extract recipe for the M3 Divider.
 * Same DOM + `role="separator"` as the Tailwind build: a 1dp outline-variant
 * rule with full / inset / middle insets along the main axis.
 */
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

export const divider = recipe({
  base: {
    flexShrink: 0,
    alignSelf: 'stretch',
    border: 'none',
    background: `rgb(${vars.sys.color.outlineVariant})`,
  },
  variants: {
    orientation: {
      horizontal: { height: '1px', width: 'auto' },
      vertical: { width: '1px', height: 'auto' },
    },
    inset: {
      full: {},
      inset: {},
      middle: {},
    },
  },
  compoundVariants: [
    {
      variants: { orientation: 'horizontal', inset: 'inset' },
      style: { marginInlineStart: '16px' },
    },
    { variants: { orientation: 'horizontal', inset: 'middle' }, style: { marginInline: '16px' } },
    { variants: { orientation: 'vertical', inset: 'inset' }, style: { marginBlockStart: '16px' } },
    { variants: { orientation: 'vertical', inset: 'middle' }, style: { marginBlock: '16px' } },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    inset: 'full',
  },
});
