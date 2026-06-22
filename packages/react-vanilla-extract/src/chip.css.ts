/**
 * chip.css.ts — vanilla-extract recipe for the M3 Chip.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3/tokens/contract.css';

export const chip = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxSizing: 'border-box',
    height: '32px',
    paddingInline: '16px',
    borderRadius: '8px',
    overflow: 'hidden',
    userSelect: 'none',
    border: `1px solid rgb(${vars.sys.color.outline})`,
    background: 'transparent',
    fontFamily: vars.sys.typescale.labelLarge.fontFamily,
    fontWeight: vars.sys.typescale.labelLarge.fontWeight,
    fontSize: vars.sys.typescale.labelLarge.fontSize,
    lineHeight: vars.sys.typescale.labelLarge.lineHeight,
    letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
    transition: `background-color 150ms ${vars.sys.motion.easing.standard}, border-color 150ms ${vars.sys.motion.easing.standard}`,
    selectors: {
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'currentColor',
        opacity: 0,
        pointerEvents: 'none',
        transition: `opacity 100ms ${vars.sys.motion.easing.standard}`,
      },
      '&:hover::before': { opacity: vars.sys.state.hover },
      '&:focus-visible::before': { opacity: vars.sys.state.focus },
      '&:active::before': { opacity: vars.sys.state.pressed },
      '&:focus-visible': {
        outline: `2px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
      '&[data-disabled]': { opacity: 0.38, pointerEvents: 'none' },
    },
  },
  variants: {
    variant: {
      assist: { color: `rgb(${vars.sys.color.onSurface})`, cursor: 'pointer' },
      suggestion: { color: `rgb(${vars.sys.color.onSurfaceVariant})`, cursor: 'pointer' },
      input: { color: `rgb(${vars.sys.color.onSurfaceVariant})`, cursor: 'default', paddingRight: '8px' },
      filter: { color: `rgb(${vars.sys.color.onSurfaceVariant})`, cursor: 'pointer' },
    },
    selected: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'filter', selected: true },
      style: {
        background: `rgb(${vars.sys.color.secondaryContainer})`,
        color: `rgb(${vars.sys.color.onSecondaryContainer})`,
        borderColor: 'transparent',
      },
    },
  ],
  defaultVariants: {
    variant: 'assist',
  },
});

export const remove = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '18px',
  height: '18px',
  marginLeft: '4px',
  marginRight: '-4px',
  border: 'none',
  borderRadius: vars.sys.shape.full,
  background: 'transparent',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  cursor: 'pointer',
});
