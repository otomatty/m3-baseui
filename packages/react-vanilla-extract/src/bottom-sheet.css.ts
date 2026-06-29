/**
 * bottom-sheet.css.ts — vanilla-extract styles for the M3 Bottom sheet.
 * Same DOM + `data-*` hooks as the Tailwind build: a surface-container-low
 * surface docked to the bottom edge with extra-large top corners, elevation 1,
 * and a 32×4dp drag handle. The popup slides via the drawer's
 * `--drawer-swipe-movement-y` so the swipe gesture tracks the finger.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 40,
  background: `rgb(${vars.sys.color.scrim} / 0.32)`,
  transition: `opacity 300ms ${vars.sys.motion.easing.emphasized}`,
  selectors: {
    '&[data-swiping]': { transition: 'none' },
    '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
  },
});

export const viewport = style({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
});

export const popup = style({
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '640px',
  maxHeight: 'calc(100dvh - 56px)',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  touchAction: 'auto',
  outline: 'none',
  paddingBottom: '24px',
  background: `rgb(${vars.sys.color.surfaceContainerLow})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderTopLeftRadius: vars.sys.shape.extraLarge,
  borderTopRightRadius: vars.sys.shape.extraLarge,
  boxShadow: vars.sys.elevation.level1,
  transform: 'translateY(calc(var(--drawer-snap-point-offset) + var(--drawer-swipe-movement-y)))',
  transition: `transform 300ms ${vars.sys.motion.easing.emphasized}`,
  selectors: {
    '&[data-swiping]': { userSelect: 'none' },
    '&[data-starting-style], &[data-ending-style]': { transform: 'translateY(100%)' },
  },
});

export const handle = style({
  margin: '16px auto 8px',
  height: '4px',
  width: '32px',
  flexShrink: 0,
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.onSurfaceVariant} / 0.4)`,
});

export const title = style({
  margin: 0,
  paddingInline: '24px',
  paddingTop: '8px',
  color: `rgb(${vars.sys.color.onSurface})`,
  fontFamily: vars.sys.typescale.titleLarge.fontFamily,
  fontWeight: vars.sys.typescale.titleLarge.fontWeight,
  fontSize: vars.sys.typescale.titleLarge.fontSize,
  lineHeight: vars.sys.typescale.titleLarge.lineHeight,
  letterSpacing: vars.sys.typescale.titleLarge.letterSpacing,
});

export const description = style({
  margin: 0,
  paddingInline: '24px',
  paddingTop: '4px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
});
