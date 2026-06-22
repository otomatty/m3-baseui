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
      // Disabled: no interaction, no state layer. Per-variant disabled colors
      // (container on-surface/12, icon on-surface/38) live on each variant.
      '&[data-disabled]': { pointerEvents: 'none' },
      '&:disabled': { pointerEvents: 'none' },
      '&[data-disabled]::before': { opacity: 0 },
      '&:disabled::before': { opacity: 0 },
      '&:focus-visible': {
        outline: `3px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
    },
  },
  variants: {
    // Disabled icon is on-surface/38 for every variant; filled/tonal disabled
    // container is on-surface/12; outlined disabled outline is on-surface/12.
    variant: {
      standard: {
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
        selectors: {
          '&:disabled': { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
          '&[data-disabled]': { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
        },
      },
      filled: {
        background: `rgb(${vars.sys.color.primary})`,
        color: `rgb(${vars.sys.color.onPrimary})`,
        selectors: {
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
        },
      },
      tonal: {
        background: `rgb(${vars.sys.color.secondaryContainer})`,
        color: `rgb(${vars.sys.color.onSecondaryContainer})`,
        selectors: {
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
        },
      },
      outlined: {
        border: `1px solid rgb(${vars.sys.color.outline})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
        selectors: {
          '&:disabled': {
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
            borderColor: `rgb(${vars.sys.color.onSurface} / 0.12)`,
          },
          '&[data-disabled]': {
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
            borderColor: `rgb(${vars.sys.color.onSurface} / 0.12)`,
          },
        },
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
        selectors: {
          // M3 disabled + selected: faint on-surface/12 container, no outline
          // (icon falls back to on-surface/38 from the variant). NOT transparent.
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
            borderColor: 'transparent',
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
            borderColor: 'transparent',
          },
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'standard',
  },
});
