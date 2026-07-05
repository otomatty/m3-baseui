/**
 * select.css.ts — vanilla-extract styles for the M3 Select.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

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
  minWidth: 'max(112px, var(--anchor-width))',
  maxWidth: '280px',
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

const labelLarge = {
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontWeight: vars.sys.typescale.labelLarge.fontWeight,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
} as const;

export const item = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '24px 1fr auto',
  alignItems: 'center',
  gap: '12px',
  height: '48px',
  paddingInline: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  color: `rgb(${vars.sys.color.onSurface})`,
  ...labelLarge,
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
    // M3 selectable menu item: secondary-container fill + on-secondary-container label.
    '&[data-selected]': {
      background: `rgb(${vars.sys.color.secondaryContainer})`,
      color: `rgb(${vars.sys.color.onSecondaryContainer})`,
      borderRadius: vars.sys.shape.extraSmall,
    },
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
globalStyle(`${item}[data-selected] [data-slot="select-trailing"]`, {
  color: `rgb(${vars.sys.color.onSecondaryContainer})`,
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
  color: `rgb(${vars.sys.color.onSurface})`,
  // keepMounted keeps the indicator in every item's grid; hide the glyph unless
  // the parent item is selected so the 24px column stays reserved (labels align).
  visibility: 'hidden',
  selectors: {
    [`${item}[data-selected] &`]: {
      visibility: 'visible',
      color: `rgb(${vars.sys.color.onSecondaryContainer})`,
    },
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

/* ------------------------------------------------------------------ *
 * Exposed Dropdown Menu anchor (issue #96) — the Select as a TextField.
 * The floating label, focus/filled border and trailing icon key off the
 * trigger's own field state (Base UI stamps data-focused / data-filled /
 * data-invalid / data-popup-open on the trigger once inside Field.Root).
 * Mirrors the standalone TextField; same DOM + data-* as the Tailwind build.
 * ------------------------------------------------------------------ */
const bodyLarge = {
  fontFamily: vars.sys.typescale.bodyLarge.fontFamily,
  fontWeight: vars.sys.typescale.bodyLarge.fontWeight,
  fontSize: vars.sys.typescale.bodyLarge.fontSize,
  lineHeight: vars.sys.typescale.bodyLarge.lineHeight,
  letterSpacing: vars.sys.typescale.bodyLarge.letterSpacing,
} as const;
const bodySmall = {
  fontFamily: vars.sys.typescale.bodySmall.fontFamily,
  fontWeight: vars.sys.typescale.bodySmall.fontWeight,
  fontSize: vars.sys.typescale.bodySmall.fontSize,
  lineHeight: vars.sys.typescale.bodySmall.lineHeight,
  letterSpacing: vars.sys.typescale.bodySmall.letterSpacing,
} as const;

export const fieldRoot = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: '210px',
});

export const field = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'stretch',
  gap: '12px',
  height: '56px',
  width: '100%',
  paddingInline: '16px',
  boxSizing: 'border-box',
  background: 'transparent',
  color: `rgb(${vars.sys.color.onSurface})`,
  textAlign: 'left',
  cursor: 'pointer',
  outline: 'none',
  ...bodyLarge,
  transition: `border-color 150ms ${vars.sys.motion.easing.standard}, padding 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-disabled]': { opacity: 0.38, pointerEvents: 'none' },
  },
});

export const fieldVariant = styleVariants({
  filled: {
    overflow: 'hidden',
    borderTopLeftRadius: vars.sys.shape.extraSmall,
    borderTopRightRadius: vars.sys.shape.extraSmall,
    background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
    // M3 filled resting active-indicator: 1dp on-surface-variant.
    borderBottom: `1px solid rgb(${vars.sys.color.onSurfaceVariant})`,
    selectors: {
      // M3 filled hover: state layer (on-surface × state-hover).
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
      '&[data-disabled]::before': { opacity: 0 },
      '&:hover': { borderBottomColor: `rgb(${vars.sys.color.onSurface})` },
      // M3 filled focus-active-indicator-height is 3dp.
      '&[data-focused], &[data-popup-open]': {
        borderBottomWidth: '3px',
        borderBottomColor: `rgb(${vars.sys.color.primary})`,
      },
      '&[data-invalid]': { borderBottomColor: `rgb(${vars.sys.color.error})` },
    },
  },
  outlined: {
    overflow: 'visible',
    borderRadius: vars.sys.shape.extraSmall,
    border: `1px solid rgb(${vars.sys.color.outline})`,
    selectors: {
      '&:hover': { borderColor: `rgb(${vars.sys.color.onSurface})` },
      // M3 outlined focus-outline-width is 3dp; padding drops 2px so content
      // stays steady as the 1dp border grows (matches the TextField anchor).
      '&[data-focused], &[data-popup-open]': {
        border: `3px solid rgb(${vars.sys.color.primary})`,
        paddingInline: '14px',
      },
      '&[data-invalid]': { borderColor: `rgb(${vars.sys.color.error})` },
    },
  },
});

export const fieldInputWrap = style({
  position: 'relative',
  zIndex: 0,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  overflow: 'visible',
});

export const fieldValue = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: `rgb(${vars.sys.color.onSurface})`,
  ...bodyLarge,
});

export const fieldValueVariant = styleVariants({
  filled: { paddingTop: '12px' },
  outlined: {},
});

export const fieldLabel = style({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  transformOrigin: 'left',
  pointerEvents: 'none',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  ...bodyLarge,
  transition: `all 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${field}[data-focused] &`]: { color: `rgb(${vars.sys.color.primary})` },
    [`${field}[data-invalid] &`]: { color: `rgb(${vars.sys.color.error})` },
  },
});

const floatFilled = { top: '6px', transform: 'translateY(0)', ...bodySmall };
const floatOutlined = {
  top: 0,
  zIndex: 1,
  transform: 'translateY(-50%)',
  background: `rgb(${vars.sys.color.surface})`,
  paddingInline: '4px',
  ...bodySmall,
};

export const fieldLabelVariant = styleVariants({
  filled: {
    selectors: {
      [`${field}[data-focused] &`]: floatFilled,
      [`${field}[data-filled] &`]: floatFilled,
      [`${field}[data-popup-open] &`]: floatFilled,
      // A placeholder floats the label at rest so the two texts don't overlap.
      [`${field}[data-has-placeholder] &`]: floatFilled,
    },
  },
  outlined: {
    selectors: {
      [`${field}[data-focused] &`]: floatOutlined,
      [`${field}[data-filled] &`]: floatOutlined,
      [`${field}[data-popup-open] &`]: floatOutlined,
      [`${field}[data-has-placeholder] &`]: floatOutlined,
    },
  },
});

export const fieldIcon = style({
  display: 'flex',
  alignItems: 'center',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  transition: `transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${field}[data-popup-open] &`]: { transform: 'rotate(180deg)' },
    // Disabled dimming comes from `field`'s own opacity (0.38); an extra alpha
    // here would compound it to ~0.14 (and diverge from fieldLeadingIcon).
  },
});
globalStyle(`${fieldIcon} > svg`, { width: '24px', height: '24px' });

export const fieldLeadingIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});
globalStyle(`${fieldLeadingIcon} > svg`, { width: '24px', height: '24px' });

export const fieldSupporting = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  paddingInline: '16px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  ...bodySmall,
  selectors: {
    [`${fieldRoot}[data-invalid] &`]: { color: `rgb(${vars.sys.color.error})` },
  },
});

export const fieldSupportingText = style({ minWidth: 0 });
