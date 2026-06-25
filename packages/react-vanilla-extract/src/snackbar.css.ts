/**
 * snackbar.css.ts — vanilla-extract styles for the M3 Snackbar.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const viewport = style({
  position: 'fixed',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 50,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: 'min(560px, calc(100vw - 32px))',
});

export const root = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minHeight: '48px',
  boxSizing: 'border-box',
  paddingLeft: '16px',
  paddingRight: '8px',
  paddingBlock: '8px',
  borderRadius: vars.sys.shape.extraSmall,
  background: `rgb(${vars.sys.color.inverseSurface})`,
  color: `rgb(${vars.sys.color.inverseOnSurface})`,
  boxShadow: vars.sys.elevation.level3,
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
  transition: `opacity 200ms ${vars.sys.motion.easing.emphasized}, transform 200ms ${vars.sys.motion.easing.emphasized}`,
  selectors: {
    '&[data-starting-style]': { opacity: 0, transform: 'translateY(8px)' },
    '&[data-ending-style]': { opacity: 0 },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  gap: '2px',
});

export const title = style({
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
});

export const description = style({
  opacity: 0.9,
  fontFamily: vars.sys.typescale.bodySmall.fontFamily,
  fontWeight: vars.sys.typescale.bodySmall.fontWeight,
  fontSize: vars.sys.typescale.bodySmall.fontSize,
  lineHeight: vars.sys.typescale.bodySmall.lineHeight,
  letterSpacing: vars.sys.typescale.bodySmall.letterSpacing,
});

export const action = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  height: '36px',
  paddingInline: '12px',
  overflow: 'hidden',
  borderRadius: vars.sys.shape.extraSmall,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  color: `rgb(${vars.sys.color.inversePrimary})`,
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontWeight: vars.sys.typescale.labelLarge.fontWeight,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
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
  },
});

export const close = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '32px',
  height: '32px',
  overflow: 'hidden',
  borderRadius: vars.sys.shape.full,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  color: `rgb(${vars.sys.color.inverseOnSurface})`,
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
    '&[data-pressed]::before': { opacity: vars.sys.state.pressed },
  },
});
