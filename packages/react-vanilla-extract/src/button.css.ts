/**
 * button.css.ts — vanilla-extract recipe for the M3 Button.
 *
 * Colors are channel triples, so every color value is wrapped in rgb(). The
 * state layer is a `::before` overlay tinted with currentColor whose opacity is
 * switched by Base UI's `data-*` state attributes.
 */
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3/tokens/contract.css';

export const button = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '40px',
    paddingInline: '24px',
    border: 'none',
    borderRadius: vars.sys.shape.full,
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: vars.sys.typescale.labelLarge.fontFamily,
    fontWeight: vars.sys.typescale.labelLarge.fontWeight,
    fontSize: vars.sys.typescale.labelLarge.fontSize,
    lineHeight: vars.sys.typescale.labelLarge.lineHeight,
    letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
    transitionProperty: 'box-shadow, background-color',
    transitionDuration: vars.sys.motion.duration.short4,
    transitionTimingFunction: vars.sys.motion.easing.standard,
    selectors: {
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        background: 'currentColor',
        opacity: 0,
        pointerEvents: 'none',
        transition: `opacity ${vars.sys.motion.duration.short2} ${vars.sys.motion.easing.standard}`,
      },
      '&:hover::before': { opacity: vars.sys.state.hover },
      '&:focus-visible::before': { opacity: vars.sys.state.focus },
      '&[data-pressed]::before': { opacity: vars.sys.state.pressed },
      '&:active::before': { opacity: vars.sys.state.pressed },
      '&[data-disabled]': { opacity: 0.38, pointerEvents: 'none', boxShadow: 'none' },
      '&:disabled': { opacity: 0.38, pointerEvents: 'none', boxShadow: 'none' },
      '&:focus-visible': {
        outline: `2px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
    },
  },
  variants: {
    variant: {
      filled: {
        background: `rgb(${vars.sys.color.primary})`,
        color: `rgb(${vars.sys.color.onPrimary})`,
      },
      tonal: {
        background: `rgb(${vars.sys.color.secondaryContainer})`,
        color: `rgb(${vars.sys.color.onSecondaryContainer})`,
      },
      outlined: {
        background: 'transparent',
        color: `rgb(${vars.sys.color.primary})`,
        border: `1px solid rgb(${vars.sys.color.outline})`,
      },
      elevated: {
        background: `rgb(${vars.sys.color.surfaceContainerLow})`,
        color: `rgb(${vars.sys.color.primary})`,
        boxShadow: vars.sys.elevation.level1,
      },
      text: {
        background: 'transparent',
        color: `rgb(${vars.sys.color.primary})`,
        paddingInline: '12px',
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});
