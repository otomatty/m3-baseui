/**
 * date-picker.css.ts — vanilla-extract styles for the M3 Date picker.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

const labelLarge = {
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontWeight: vars.sys.typescale.labelLarge.fontWeight,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
} as const;
const bodyLarge = {
  fontFamily: vars.sys.typescale.bodyLarge.fontFamily,
  fontWeight: vars.sys.typescale.bodyLarge.fontWeight,
  fontSize: vars.sys.typescale.bodyLarge.fontSize,
  lineHeight: vars.sys.typescale.bodyLarge.lineHeight,
  letterSpacing: vars.sys.typescale.bodyLarge.letterSpacing,
} as const;

const stateBefore = {
  content: '""',
  position: 'absolute',
  inset: 0,
  background: 'currentColor',
  opacity: 0,
  pointerEvents: 'none',
  transition: `opacity 100ms ${vars.sys.motion.easing.standard}`,
} as const;

export const calendar = style({
  width: '328px',
  maxWidth: '100%',
  padding: '12px',
  color: `rgb(${vars.sys.color.onSurface})`,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  height: '48px',
  paddingLeft: '12px',
  paddingRight: '4px',
});

export const navButton = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: vars.sys.shape.full,
  overflow: 'hidden',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  cursor: 'pointer',
  outline: 'none',
  border: 0,
  background: 'transparent',
  selectors: {
    '&::before': stateBefore,
    '&:hover::before': { opacity: vars.sys.state.hover },
    '&:focus-visible::before': { opacity: vars.sys.state.focus },
    '&:active::before': { opacity: vars.sys.state.pressed },
    '&:disabled': { color: `rgb(${vars.sys.color.onSurface} / 0.38)`, pointerEvents: 'none' },
    '&:disabled::before': { opacity: 0 },
  },
});
globalStyle(`${navButton} > svg`, { width: '24px', height: '24px' });

export const monthLabel = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  height: '36px',
  paddingInline: '12px',
  borderRadius: vars.sys.shape.full,
  overflow: 'hidden',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  cursor: 'pointer',
  outline: 'none',
  border: 0,
  background: 'transparent',
  ...labelLarge,
  selectors: {
    '&::before': stateBefore,
    '&:hover::before': { opacity: vars.sys.state.hover },
  },
});
globalStyle(`${monthLabel} > svg`, { transition: 'transform 150ms' });
globalStyle(`${monthLabel}[data-view="years"] > svg`, { transform: 'rotate(180deg)' });

export const grid = style({ marginTop: '8px', borderCollapse: 'collapse' });
globalStyle(`${grid} td`, { padding: 0, textAlign: 'center' });

export const weekdays = style({});

export const weekday = style({
  width: '48px',
  height: '48px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  ...bodyLarge,
});

export const day = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: vars.sys.shape.full,
  overflow: 'hidden',
  color: `rgb(${vars.sys.color.onSurface})`,
  cursor: 'pointer',
  outline: 'none',
  border: 0,
  background: 'transparent',
  ...bodyLarge,
  selectors: {
    '&::before': { ...stateBefore, borderRadius: vars.sys.shape.full },
    '&:hover::before': { opacity: vars.sys.state.hover },
    '&:focus-visible::before': { opacity: vars.sys.state.focus },
    '&:active::before': { opacity: vars.sys.state.pressed },
    '&[data-today]': {
      boxShadow: `inset 0 0 0 1px rgb(${vars.sys.color.primary})`,
    },
    '&[data-selected]': {
      background: `rgb(${vars.sys.color.primary})`,
      color: `rgb(${vars.sys.color.onPrimary})`,
    },
    '&[data-disabled]': { color: `rgb(${vars.sys.color.onSurface} / 0.38)`, pointerEvents: 'none' },
    '&[data-disabled]::before': { opacity: 0 },
  },
});

export const yearGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',
  maxHeight: '280px',
  overflowY: 'auto',
  paddingInline: '12px',
  paddingBlock: '8px',
});

export const yearButton = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '36px',
  borderRadius: vars.sys.shape.full,
  overflow: 'hidden',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  cursor: 'pointer',
  outline: 'none',
  border: 0,
  background: 'transparent',
  ...labelLarge,
  selectors: {
    '&::before': stateBefore,
    '&:hover::before': { opacity: vars.sys.state.hover },
    '&[data-selected]': {
      background: `rgb(${vars.sys.color.primary})`,
      color: `rgb(${vars.sys.color.onPrimary})`,
    },
  },
});

export const field = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  height: '56px',
  paddingLeft: '16px',
  paddingRight: '4px',
  minWidth: '200px',
  background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderTopLeftRadius: vars.sys.shape.extraSmall,
  borderTopRightRadius: vars.sys.shape.extraSmall,
  borderBottom: `1px solid rgb(${vars.sys.color.onSurfaceVariant})`,
});

export const input = style({
  flex: 1,
  minWidth: 0,
  height: '100%',
  background: 'transparent',
  border: 0,
  outline: 'none',
  color: `rgb(${vars.sys.color.onSurface})`,
  ...bodyLarge,
  '::placeholder': { color: `rgb(${vars.sys.color.onSurfaceVariant})` },
});

export const fieldIcon = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: vars.sys.shape.full,
  overflow: 'hidden',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  cursor: 'pointer',
  outline: 'none',
  border: 0,
  background: 'transparent',
  selectors: {
    '&::before': stateBefore,
    '&:hover::before': { opacity: vars.sys.state.hover },
    '&:active::before': { opacity: vars.sys.state.pressed },
  },
});
globalStyle(`${fieldIcon} > svg`, { width: '24px', height: '24px' });

export const popup = style({
  background: `rgb(${vars.sys.color.surfaceContainerHigh})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderRadius: vars.sys.shape.large,
  boxShadow: vars.sys.elevation.level2,
  transformOrigin: 'var(--transform-origin)',
  outline: 'none',
  transition: `opacity 150ms ${vars.sys.motion.easing.standard}, transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style]': { opacity: 0, transform: 'scale(0.95)' },
    '&[data-ending-style]': { opacity: 0 },
  },
});

export const modalBackdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 40,
  background: `rgb(${vars.sys.color.scrim} / 0.32)`,
  transition: `opacity 200ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
  },
});

export const modalPopup = style({
  position: 'fixed',
  left: '50%',
  top: '50%',
  zIndex: 50,
  transform: 'translate(-50%, -50%)',
  width: 'min(360px, calc(100vw - 48px))',
  maxHeight: 'calc(100vh - 48px)',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  background: `rgb(${vars.sys.color.surfaceContainerHigh})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderRadius: vars.sys.shape.extraLarge,
  boxShadow: vars.sys.elevation.level3,
  transformOrigin: 'var(--transform-origin)',
  outline: 'none',
  transition: `opacity 200ms ${vars.sys.motion.easing.emphasized}, transform 200ms ${vars.sys.motion.easing.emphasized}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.95)',
    },
  },
});

export const modalHeader = style({
  paddingInline: '24px',
  paddingTop: '16px',
  margin: 0,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelMedium.fontFamily,
  fontWeight: vars.sys.typescale.labelMedium.fontWeight,
  fontSize: vars.sys.typescale.labelMedium.fontSize,
  lineHeight: vars.sys.typescale.labelMedium.lineHeight,
  letterSpacing: vars.sys.typescale.labelMedium.letterSpacing,
});

export const modalHeadline = style({
  paddingInline: '24px',
  paddingTop: '4px',
  paddingBottom: '16px',
  margin: 0,
  color: `rgb(${vars.sys.color.onSurface})`,
  fontFamily: vars.sys.typescale.headlineLarge.fontFamily,
  fontWeight: vars.sys.typescale.headlineLarge.fontWeight,
  fontSize: vars.sys.typescale.headlineLarge.fontSize,
  lineHeight: vars.sys.typescale.headlineLarge.lineHeight,
  letterSpacing: vars.sys.typescale.headlineLarge.letterSpacing,
});

export const modalActions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  paddingInline: '24px',
  paddingBottom: '16px',
  paddingTop: '8px',
});
