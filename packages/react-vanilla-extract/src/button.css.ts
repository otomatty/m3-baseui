/**
 * button.css.ts — vanilla-extract recipe for the M3 Button.
 *
 * Colors are channel triples, so every color value is wrapped in rgb(). The
 * state layer is a `::before` overlay tinted with currentColor whose opacity is
 * switched by Base UI's `data-*` state attributes.
 */
import { globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@otomatty/tokens/contract.css';

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
    transitionProperty: 'box-shadow, background-color, color, border-color',
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
      // Disabled: no interaction, no state layer, no elevation. Per-variant
      // disabled colors (container on-surface/12, label on-surface/38) below.
      '&[data-disabled]': { pointerEvents: 'none', boxShadow: 'none' },
      '&:disabled': { pointerEvents: 'none', boxShadow: 'none' },
      '&[data-disabled]::before': { opacity: 0 },
      '&:disabled::before': { opacity: 0 },
      '&:focus-visible': {
        outline: `3px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
      // M3 with-icon padding: the icon side trims to 16dp (label side stays 24dp).
      '&[data-with-start-icon]': { paddingLeft: '16px' },
      '&[data-with-end-icon]': { paddingRight: '16px' },
    },
  },
  variants: {
    // M3 elevation per variant: filled/tonal rest level0→hover level1→pressed
    // level0; elevated rest level1→hover level2→pressed level1. Disabled
    // container is on-surface/12 and label on-surface/38 (material-web parity).
    variant: {
      filled: {
        background: `rgb(${vars.sys.color.primary})`,
        color: `rgb(${vars.sys.color.onPrimary})`,
        selectors: {
          '&:hover': { boxShadow: vars.sys.elevation.level1 },
          '&:active': { boxShadow: vars.sys.elevation.level0 },
          '&[data-pressed]': { boxShadow: vars.sys.elevation.level0 },
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
          '&:hover': { boxShadow: vars.sys.elevation.level1 },
          '&:active': { boxShadow: vars.sys.elevation.level0 },
          '&[data-pressed]': { boxShadow: vars.sys.elevation.level0 },
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
        background: 'transparent',
        color: `rgb(${vars.sys.color.primary})`,
        border: `1px solid rgb(${vars.sys.color.outline})`,
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
      elevated: {
        background: `rgb(${vars.sys.color.surfaceContainerLow})`,
        color: `rgb(${vars.sys.color.primary})`,
        boxShadow: vars.sys.elevation.level1,
        selectors: {
          '&:hover': { boxShadow: vars.sys.elevation.level2 },
          '&:active': { boxShadow: vars.sys.elevation.level1 },
          '&[data-pressed]': { boxShadow: vars.sys.elevation.level1 },
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
      text: {
        background: 'transparent',
        color: `rgb(${vars.sys.color.primary})`,
        paddingInline: '12px',
        selectors: {
          '&:disabled': { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
          '&[data-disabled]': { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

// Icon slot: 18dp, centered. The slot lives inside the button; VE forbids
// descendant selectors in a recipe, so target the (button-unique) data-slot
// globally — matching the Tailwind build's `[&_[data-slot=button-icon]]` rules.
globalStyle('[data-slot="button-icon"]', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});
globalStyle('[data-slot="button-icon"] > svg', { width: '18px', height: '18px' });
