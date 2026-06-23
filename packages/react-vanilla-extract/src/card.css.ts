/**
 * card.css.ts — vanilla-extract recipe for the M3 Card.
 * Same DOM + `data-*` hooks as the Tailwind build: elevated/filled/outlined
 * surfaces with 12dp corners; interactive cards carry a currentColor state-layer
 * `::before` + focus ring and dim per-token when disabled.
 */
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3/tokens/contract.css';

export const card = recipe({
  base: {
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: vars.sys.shape.medium,
    color: `rgb(${vars.sys.color.onSurface})`,
  },
  variants: {
    variant: {
      elevated: {
        background: `rgb(${vars.sys.color.surfaceContainerLow})`,
        boxShadow: vars.sys.elevation.level1,
      },
      filled: {
        background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
      },
      outlined: {
        background: `rgb(${vars.sys.color.surface})`,
        border: `1px solid rgb(${vars.sys.color.outlineVariant})`,
      },
    },
    interactive: {
      true: {
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
        textAlign: 'left',
        width: '100%',
        outline: 'none',
        transition: `box-shadow 150ms ${vars.sys.motion.easing.standard}`,
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
            outline: `3px solid rgb(${vars.sys.color.secondary})`,
            outlineOffset: '2px',
          },
          '&:disabled, &[data-disabled]': {
            pointerEvents: 'none',
            boxShadow: 'none',
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
          '&:disabled::before, &[data-disabled]::before': { opacity: 0 },
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'elevated', interactive: true },
      style: {
        selectors: {
          '&:hover': { boxShadow: vars.sys.elevation.level2 },
          '&:active': { boxShadow: vars.sys.elevation.level1 },
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'elevated',
    interactive: false,
  },
});
