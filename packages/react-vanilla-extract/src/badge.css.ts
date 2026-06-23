/**
 * badge.css.ts — vanilla-extract recipe for the M3 Badge.
 * Same DOM + `data-size` as the Tailwind build: a 6dp error dot (`small`) or a
 * 16dp on-error pill carrying a number (`large`), anchored to a positioned
 * parent's top-right corner.
 */
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@otomatty/tokens/contract.css';

export const badge = recipe({
  base: {
    position: 'absolute',
    pointerEvents: 'none',
    userSelect: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `rgb(${vars.sys.color.error})`,
    color: `rgb(${vars.sys.color.onError})`,
    borderRadius: vars.sys.shape.full,
  },
  variants: {
    size: {
      small: {
        top: '4px',
        right: '4px',
        width: '6px',
        height: '6px',
      },
      large: {
        top: '-4px',
        right: '-4px',
        minWidth: '16px',
        height: '16px',
        paddingInline: '4px',
        fontVariantNumeric: 'tabular-nums',
        fontFamily: vars.sys.typescale.labelSmall.fontFamily,
        fontWeight: vars.sys.typescale.labelSmall.fontWeight,
        fontSize: vars.sys.typescale.labelSmall.fontSize,
        lineHeight: '1',
        letterSpacing: vars.sys.typescale.labelSmall.letterSpacing,
      },
    },
  },
});
