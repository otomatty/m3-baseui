/**
 * time-picker.css.ts — vanilla-extract styles for the M3 Time picker.
 * Same DOM + data-* hooks as the Tailwind build.
 * Dimensions match Material Android timepicker dimens.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

const displayLarge = {
  fontFamily: vars.sys.typescale.displayLarge.fontFamily,
  fontWeight: vars.sys.typescale.displayLarge.fontWeight,
  fontSize: vars.sys.typescale.displayLarge.fontSize,
  lineHeight: vars.sys.typescale.displayLarge.lineHeight,
  letterSpacing: vars.sys.typescale.displayLarge.letterSpacing,
} as const;
const titleMedium = {
  fontFamily: vars.sys.typescale.titleMedium.fontFamily,
  fontWeight: vars.sys.typescale.titleMedium.fontWeight,
  fontSize: vars.sys.typescale.titleMedium.fontSize,
  lineHeight: vars.sys.typescale.titleMedium.lineHeight,
  letterSpacing: vars.sys.typescale.titleMedium.letterSpacing,
} as const;
const bodyLarge = {
  fontFamily: vars.sys.typescale.bodyLarge.fontFamily,
  fontWeight: vars.sys.typescale.bodyLarge.fontWeight,
  fontSize: vars.sys.typescale.bodyLarge.fontSize,
  lineHeight: vars.sys.typescale.bodyLarge.lineHeight,
  letterSpacing: vars.sys.typescale.bodyLarge.letterSpacing,
} as const;

const stateLayerSelectors = {
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
    outline: `2px solid rgb(${vars.sys.color.primary})`,
    outlineOffset: '2px',
  },
} as const;

export const root = style({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '8px',
  color: `rgb(${vars.sys.color.onSurface})`,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minHeight: '98px',
});

export const display = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const field = style({
  position: 'relative',
  display: 'inline-grid',
  placeItems: 'center',
  width: '96px',
  height: '80px',
  borderRadius: vars.sys.shape.small,
  overflow: 'hidden',
  boxSizing: 'border-box',
  background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  ...displayLarge,
  cursor: 'pointer',
  outline: 'none',
  border: '1px solid transparent',
  transition: 'background-color 100ms, color 100ms',
  selectors: {
    ...stateLayerSelectors,
    '&[data-selected]': {
      background: `rgb(${vars.sys.color.primaryContainer})`,
      color: `rgb(${vars.sys.color.onPrimaryContainer})`,
    },
  },
});

export const colon = style({
  ...displayLarge,
  color: `rgb(${vars.sys.color.onSurface})`,
  paddingInline: '4px',
  lineHeight: 1,
  alignSelf: 'center',
});

export const periods = style({
  display: 'inline-flex',
  flexDirection: 'column',
  flexShrink: 0,
  borderRadius: vars.sys.shape.small,
  overflow: 'hidden',
  border: `1px solid rgb(${vars.sys.color.outline})`,
  width: '52px',
  height: '98px',
  margin: 0,
  padding: 0,
  minInlineSize: 0,
  boxSizing: 'border-box',
});

export const period = style({
  position: 'relative',
  flex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '48px',
  height: '48px',
  width: '100%',
  ...titleMedium,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  cursor: 'pointer',
  outline: 'none',
  border: 0,
  background: 'transparent',
  overflow: 'hidden',
  selectors: {
    ...stateLayerSelectors,
    '&[data-selected]': {
      background: `rgb(${vars.sys.color.secondaryContainer})`,
      color: `rgb(${vars.sys.color.onSecondaryContainer})`,
    },
    '& + &': { borderTop: `1px solid rgb(${vars.sys.color.outline})` },
  },
});

export const dial = style({
  position: 'relative',
  width: '256px',
  height: '256px',
  marginTop: '28px',
  padding: 0,
  minInlineSize: 0,
  border: 0,
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
});

export const dialNumber = style({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  display: 'inline-grid',
  placeItems: 'center',
  width: '48px',
  height: '48px',
  borderRadius: vars.sys.shape.full,
  ...bodyLarge,
  color: `rgb(${vars.sys.color.onSurface})`,
  cursor: 'pointer',
  outline: 'none',
  userSelect: 'none',
  border: 0,
  background: 'transparent',
  overflow: 'hidden',
  selectors: {
    ...stateLayerSelectors,
    '&[data-selected]': {
      background: `rgb(${vars.sys.color.primary})`,
      color: `rgb(${vars.sys.color.onPrimary})`,
    },
  },
});

export const dialHand = style({
  position: 'absolute',
  left: '50%',
  top: '12%',
  height: '38%',
  width: '2px',
  transformOrigin: 'bottom center',
  background: `rgb(${vars.sys.color.primary})`,
  marginLeft: '-1px',
  pointerEvents: 'none',
});

export const dialCenter = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '8px',
  height: '8px',
  transform: 'translate(-50%, -50%)',
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.primary})`,
  pointerEvents: 'none',
});

export const inputs = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
});

export const inputBox = style({
  width: '96px',
  height: '80px',
  borderRadius: vars.sys.shape.small,
  boxSizing: 'border-box',
  textAlign: 'center',
  background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  ...displayLarge,
  outline: 'none',
  border: `1px solid rgb(${vars.sys.color.outline})`,
  MozAppearance: 'textfield',
  selectors: {
    '&:focus': { border: `2px solid rgb(${vars.sys.color.primary})` },
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
});

export const inputCaption = style({
  display: 'block',
  marginTop: '4px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.bodySmall.fontFamily,
  fontWeight: vars.sys.typescale.bodySmall.fontWeight,
  fontSize: vars.sys.typescale.bodySmall.fontSize,
  lineHeight: vars.sys.typescale.bodySmall.lineHeight,
  letterSpacing: vars.sys.typescale.bodySmall.letterSpacing,
});
