/**
 * icon-button.css.ts — vanilla-extract recipe for the M3 Icon Button.
 * Mirrors the Tailwind build: same DOM, same data-* state hooks.
 */
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3/tokens/contract.css';

export const iconButton = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '40px',
    height: '40px',
    padding: '8px',
    border: 'none',
    background: 'transparent',
    borderRadius: vars.sys.shape.full,
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none',
    color: `rgb(${vars.sys.color.onSurfaceVariant})`,
    transitionProperty: 'box-shadow, background-color, color',
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
      '&[data-disabled]': { opacity: 0.38, pointerEvents: 'none' },
      '&:disabled': { opacity: 0.38, pointerEvents: 'none' },
      '&:focus-visible': {
        outline: `2px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
    },
  },
  variants: {
    variant: {
      standard: { color: `rgb(${vars.sys.color.onSurfaceVariant})` },
      filled: {
        background: `rgb(${vars.sys.color.primary})`,
        color: `rgb(${vars.sys.color.onPrimary})`,
      },
      tonal: {
        background: `rgb(${vars.sys.color.secondaryContainer})`,
        color: `rgb(${vars.sys.color.onSecondaryContainer})`,
      },
      outlined: {
        border: `1px solid rgb(${vars.sys.color.outline})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
      },
    },
    selected: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'standard', selected: true },
      style: { color: `rgb(${vars.sys.color.primary})` },
    },
    {
      variants: { variant: 'filled', selected: false },
      style: {
        background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
        color: `rgb(${vars.sys.color.primary})`,
      },
    },
    {
      variants: { variant: 'tonal', selected: false },
      style: {
        background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
      },
    },
    {
      variants: { variant: 'outlined', selected: true },
      style: {
        background: `rgb(${vars.sys.color.inverseSurface})`,
        color: `rgb(${vars.sys.color.inverseOnSurface})`,
        borderColor: 'transparent',
      },
    },
  ],
  defaultVariants: {
    variant: 'standard',
  },
});
