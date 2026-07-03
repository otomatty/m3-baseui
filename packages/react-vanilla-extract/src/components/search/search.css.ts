/**
 * search.css.ts — vanilla-extract styles for the M3 Search (bar + docked view).
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const bar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '56px',
  minWidth: '360px',
  maxWidth: '100%',
  paddingLeft: '16px',
  paddingRight: '8px',
  background: `rgb(${vars.sys.color.surfaceContainerHigh})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderRadius: vars.sys.shape.full,
  transition: `box-shadow 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&:focus-within': { boxShadow: vars.sys.elevation.level1 },
  },
});

export const icon = style({
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});
globalStyle(`${icon} > svg`, { width: '24px', height: '24px' });

const bodyLarge = {
  fontFamily: vars.sys.typescale.bodyLarge.fontFamily,
  fontWeight: vars.sys.typescale.bodyLarge.fontWeight,
  fontSize: vars.sys.typescale.bodyLarge.fontSize,
  lineHeight: vars.sys.typescale.bodyLarge.lineHeight,
  letterSpacing: vars.sys.typescale.bodyLarge.letterSpacing,
} as const;

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

export const clear = style({
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: vars.sys.shape.full,
  overflow: 'hidden',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  cursor: 'pointer',
  outline: 'none',
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
globalStyle(`${clear} > svg`, { width: '24px', height: '24px' });

export const popup = style({
  width: 'var(--anchor-width)',
  minWidth: '360px',
  maxHeight: 'min(72vh, 480px)',
  overflowY: 'auto',
  paddingBlock: '8px',
  background: `rgb(${vars.sys.color.surfaceContainerHigh})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderRadius: vars.sys.shape.large,
  boxShadow: vars.sys.elevation.level3,
  transformOrigin: 'var(--transform-origin)',
  outline: 'none',
  transition: `opacity 150ms ${vars.sys.motion.easing.standard}, transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style]': { opacity: 0, transform: 'scale(0.95)' },
    '&[data-ending-style]': { opacity: 0 },
  },
});

export const list = style({ outline: 'none' });

export const item = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '24px 1fr 24px',
  alignItems: 'center',
  gap: '16px',
  height: '56px',
  paddingInline: '16px',
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  color: `rgb(${vars.sys.color.onSurface})`,
  ...bodyLarge,
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
    '&[data-highlighted]::before': { opacity: vars.sys.state.hover },
    '&[data-selected]::before': { opacity: vars.sys.state.pressed },
    '&:active::before': { opacity: vars.sys.state.pressed },
    '&[data-disabled]': { color: `rgb(${vars.sys.color.onSurface} / 0.38)`, pointerEvents: 'none' },
    '&[data-disabled]::before': { opacity: 0 },
  },
});
globalStyle(`${item} [data-slot="search-leading"]`, {
  display: 'inline-flex',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});
globalStyle(`${item} [data-slot="search-leading"] > svg`, { width: '24px', height: '24px' });

export const itemIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `rgb(${vars.sys.color.onSurface})`,
  visibility: 'hidden',
});
globalStyle(`${item}[data-selected] ${itemIndicator}`, { visibility: 'visible' });

export const empty = style({
  paddingInline: '16px',
  paddingBlock: '12px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
});

export const separator = style({
  marginBlock: '8px',
  height: '1px',
  border: 0,
  background: `rgb(${vars.sys.color.outlineVariant})`,
});

export const groupLabel = style({
  paddingInline: '16px',
  paddingBlock: '8px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelSmall.fontFamily,
  fontWeight: vars.sys.typescale.labelSmall.fontWeight,
  fontSize: vars.sys.typescale.labelSmall.fontSize,
  lineHeight: vars.sys.typescale.labelSmall.lineHeight,
  letterSpacing: vars.sys.typescale.labelSmall.letterSpacing,
});
