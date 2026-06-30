/**
 * dialog.css.ts — vanilla-extract styles for the M3 Dialog (basic + fullscreen).
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

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

const popupBase = style({
  position: 'fixed',
  // Keep min/max-width inclusive of padding so the 280–560dp contract holds
  // without relying on a consumer global reset (Tailwind preflight does this).
  boxSizing: 'border-box',
  zIndex: 50,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  color: `rgb(${vars.sys.color.onSurface})`,
  transformOrigin: 'var(--transform-origin)',
  transition: `opacity 200ms ${vars.sys.motion.easing.emphasized}, transform 200ms ${vars.sys.motion.easing.emphasized}`,
  outline: 'none',
  selectors: {
    // Icon present → center the headline + supporting text (M3 hero icon).
    '&:has([data-slot="dialog-icon"])': { textAlign: 'center' },
  },
});

export const popupBasic = style([
  popupBase,
  {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(560px, calc(100vw - 48px))',
    minWidth: '280px',
    maxHeight: 'calc(100vh - 48px)',
    gap: '16px',
    padding: '24px',
    background: `rgb(${vars.sys.color.surfaceContainerHigh})`,
    borderRadius: vars.sys.shape.extraLarge,
    boxShadow: vars.sys.elevation.level3,
    selectors: {
      '&[data-starting-style], &[data-ending-style]': {
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(0.95)',
      },
    },
  },
]);

export const popupFullscreen = style([
  popupBase,
  {
    inset: 0,
    width: '100vw',
    height: '100vh',
    maxWidth: 'none',
    borderRadius: 0,
    background: `rgb(${vars.sys.color.surface})`,
    selectors: {
      '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
    },
  },
]);

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '0 8px',
  height: '56px',
  flexShrink: 0,
});

// Title (2nd child) grows so the trailing action sits at the end; min-width:0 +
// ellipsis lets a long title shrink instead of pushing the action off-screen.
globalStyle(`${header} > *:nth-child(2)`, {
  flexGrow: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const icon = style({
  display: 'inline-flex',
  alignSelf: 'center',
  color: `rgb(${vars.sys.color.secondary})`,
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

export const divider = style({
  height: '1px',
  width: '100%',
  margin: 0,
  border: 0,
  flexShrink: 0,
  background: `rgb(${vars.sys.color.outlineVariant})`,
});

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
  // popup gap (16dp) + 8dp = 24dp M3 spacing above the actions.
  marginTop: '8px',
});

export const close = style({
  display: 'inline-flex',
});
