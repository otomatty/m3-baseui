/**
 * select.css.ts — vanilla-extract styles for the M3 Select.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@otomatty/tokens/contract.css';

export const trigger = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  boxSizing: 'border-box',
  height: '56px',
  minWidth: '200px',
  paddingInline: '16px',
  borderRadius: vars.sys.shape.extraSmall,
  border: `1px solid rgb(${vars.sys.color.outline})`,
  background: 'transparent',
  color: `rgb(${vars.sys.color.onSurface})`,
  textAlign: 'left',
  cursor: 'pointer',
  outline: 'none',
  fontFamily: vars.sys.typescale.bodyLarge.fontFamily,
  fontWeight: vars.sys.typescale.bodyLarge.fontWeight,
  fontSize: vars.sys.typescale.bodyLarge.fontSize,
  lineHeight: vars.sys.typescale.bodyLarge.lineHeight,
  letterSpacing: vars.sys.typescale.bodyLarge.letterSpacing,
  transition: `border-color 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    // M3 outlined-field focus-outline-width = 3px; padding drops 2px to keep
    // the content position steady as the 1px border grows to 3px.
    '&[data-popup-open], &:focus-visible': {
      border: `3px solid rgb(${vars.sys.color.primary})`,
      paddingInline: '14px',
    },
    // M3 disabled (per-token, not a blanket fade): outline on-surface/0.12,
    // label/value on-surface/0.38.
    '&[data-disabled]': {
      borderColor: `rgb(${vars.sys.color.onSurface} / 0.12)`,
      color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
      pointerEvents: 'none',
    },
  },
});

export const value = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const icon = style({
  display: 'flex',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  transition: `transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${trigger}[data-popup-open] &`]: { transform: 'rotate(180deg)' },
    // M3 disabled: leading/trailing icon on-surface/0.38
    [`${trigger}[data-disabled] &`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

export const popup = style({
  minWidth: 'var(--anchor-width)',
  maxHeight: 'var(--available-height)',
  paddingBlock: '8px',
  overflow: 'auto',
  background: `rgb(${vars.sys.color.surfaceContainer})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderRadius: vars.sys.shape.extraSmall,
  boxShadow: vars.sys.elevation.level2,
  transformOrigin: 'var(--transform-origin)',
  outline: 'none',
  transition: `opacity 150ms ${vars.sys.motion.easing.standard}, transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': { opacity: 0, transform: 'scale(0.95)' },
  },
});

export const item = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '24px 1fr auto',
  alignItems: 'center',
  gap: '8px',
  height: '48px',
  paddingInline: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  color: `rgb(${vars.sys.color.onSurface})`,
  fontFamily: vars.sys.typescale.bodyLarge.fontFamily,
  fontWeight: vars.sys.typescale.bodyLarge.fontWeight,
  fontSize: vars.sys.typescale.bodyLarge.fontSize,
  lineHeight: vars.sys.typescale.bodyLarge.lineHeight,
  letterSpacing: vars.sys.typescale.bodyLarge.letterSpacing,
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
    '&:active::before': { opacity: vars.sys.state.pressed },
    // M3 disabled (per-token, not a blanket fade): label + trailing supporting
    // text on-surface/0.38, no state layer.
    '&[data-disabled]': {
      color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
      pointerEvents: 'none',
    },
    '&[data-disabled]::before': { opacity: 0 },
  },
});

// M3 trailing supporting text sits in the last column. Descendant rules can't
// live in a VE `style`, so scope them to the item class with globalStyle.
globalStyle(`${item} [data-slot="select-trailing"]`, {
  paddingLeft: '16px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
});
globalStyle(`${item}[data-disabled] [data-slot="select-trailing"]`, {
  color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
});

// Sticky scroll affordances at the popup edges; surface-tinted with a chevron.
const scrollArrowBase = {
  position: 'sticky',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '24px',
  cursor: 'default',
  background: `rgb(${vars.sys.color.surfaceContainer})`,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
} as const;

export const scrollUpArrow = style({ ...scrollArrowBase, top: 0 });
export const scrollDownArrow = style({ ...scrollArrowBase, bottom: 0 });
globalStyle(`${scrollUpArrow} > svg`, { width: '20px', height: '20px' });
globalStyle(`${scrollDownArrow} > svg`, { width: '20px', height: '20px' });

export const itemIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `rgb(${vars.sys.color.primary})`,
  // keepMounted keeps the indicator in every item's grid; hide the glyph unless
  // the parent item is selected so the 24px column stays reserved (labels align).
  visibility: 'hidden',
  selectors: {
    [`${item}[data-selected] &`]: { visibility: 'visible' },
    // M3 disabled: the selected-check indicator dims with its row (own text color).
    [`${item}[data-disabled] &`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

export const groupLabel = style({
  paddingInline: '12px',
  paddingBlock: '8px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelSmall.fontFamily,
  fontWeight: vars.sys.typescale.labelSmall.fontWeight,
  fontSize: vars.sys.typescale.labelSmall.fontSize,
  lineHeight: vars.sys.typescale.labelSmall.lineHeight,
  letterSpacing: vars.sys.typescale.labelSmall.letterSpacing,
});
