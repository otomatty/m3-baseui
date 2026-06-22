/**
 * dialog.css.ts — vanilla-extract styles for the M3 basic Dialog.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3/tokens/contract.css';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 40,
  background: `rgb(${vars.sys.color.scrim} / 0.32)`,
  transition: `opacity 200ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
  },
});

export const popup = style({
  position: 'fixed',
  left: '50%',
  top: '50%',
  zIndex: 50,
  transform: 'translate(-50%, -50%)',
  width: 'min(560px, calc(100vw - 48px))',
  maxHeight: 'calc(100vh - 48px)',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '24px',
  background: `rgb(${vars.sys.color.surfaceContainerHigh})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderRadius: vars.sys.shape.extraLarge,
  boxShadow: vars.sys.elevation.level3,
  transformOrigin: 'var(--transform-origin)',
  transition: `opacity 200ms ${vars.sys.motion.easing.emphasized}, transform 200ms ${vars.sys.motion.easing.emphasized}`,
  outline: 'none',
  selectors: {
    '&[data-starting-style], &[data-ending-style]': {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.95)',
    },
  },
});

export const title = style({
  margin: 0,
  fontFamily: vars.sys.typescale.headlineSmall.fontFamily,
  fontWeight: vars.sys.typescale.headlineSmall.fontWeight,
  fontSize: vars.sys.typescale.headlineSmall.fontSize,
  lineHeight: vars.sys.typescale.headlineSmall.lineHeight,
  letterSpacing: vars.sys.typescale.headlineSmall.letterSpacing,
  color: `rgb(${vars.sys.color.onSurface})`,
});

export const description = style({
  margin: 0,
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});

export const close = style({
  display: 'inline-flex',
});
