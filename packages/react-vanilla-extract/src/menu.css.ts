/**
 * menu.css.ts — vanilla-extract styles for the M3 Menu.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3/tokens/contract.css';

export const popup = style({
  minWidth: '112px',
  maxWidth: '280px',
  paddingBlock: '8px',
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

// Shared item state layer + disabled selectors (the `::before` overlay).
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
  '&[data-highlighted]::before': { opacity: vars.sys.state.hover },
  '&:active::before': { opacity: vars.sys.state.pressed },
  // M3 disabled (per-token, not a blanket fade): label on-surface/0.38, no state layer.
  '&[data-disabled]': { color: `rgb(${vars.sys.color.onSurface} / 0.38)`, pointerEvents: 'none' },
  '&[data-disabled]::before': { opacity: 0 },
} as const;

// Leading icon (24dp) + trailing supporting text (shortcut/meta) slots.
const slotSelectors = {
  '& [data-slot="menu-leading"]': {
    display: 'inline-flex',
    color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  },
  '& [data-slot="menu-leading"] > svg': { width: '24px', height: '24px' },
  '& [data-slot="menu-trailing"]': {
    marginLeft: 'auto',
    paddingLeft: '16px',
    color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  },
  // M3 disabled: leading/trailing icon on-surface/0.38
  '&[data-disabled] [data-slot="menu-leading"]': {
    color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
  },
  '&[data-disabled] [data-slot="menu-trailing"]': {
    color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
  },
} as const;

export const item = style({
  position: 'relative',
  display: 'flex',
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
  selectors: { ...stateLayerSelectors, ...slotSelectors },
});

export const separator = style({
  marginBlock: '8px',
  height: '1px',
  border: 0,
  background: `rgb(${vars.sys.color.outlineVariant})`,
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

// Submenu trigger: item look + trailing chevron, highlighted while open.
export const submenuTrigger = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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
    ...stateLayerSelectors,
    '&[data-popup-open]::before': { opacity: vars.sys.state.hover },
    '& [data-slot="menu-leading"]': {
      display: 'inline-flex',
      color: `rgb(${vars.sys.color.onSurfaceVariant})`,
    },
    '& [data-slot="menu-leading"] > svg': { width: '24px', height: '24px' },
    // M3 disabled: leading icon on-surface/0.38
    '&[data-disabled] [data-slot="menu-leading"]': {
      color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
    },
  },
});

// Leading check/dot indicator inside a checkbox/radio item.
export const itemIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `rgb(${vars.sys.color.onSurface})`,
  visibility: 'hidden',
});

// Selectable items: 24dp leading indicator column + label.
const selectableBase = {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '24px 1fr',
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
} as const;

export const checkboxItem = style({
  ...selectableBase,
  selectors: {
    ...stateLayerSelectors,
    [`&[data-checked] ${itemIndicator}`]: { visibility: 'visible' },
    // M3 disabled: the check/dot indicator dims with its row (own text color).
    [`&[data-disabled] ${itemIndicator}`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

export const radioItem = style({
  ...selectableBase,
  selectors: {
    ...stateLayerSelectors,
    [`&[data-checked] ${itemIndicator}`]: { visibility: 'visible' },
    // M3 disabled: the check/dot indicator dims with its row (own text color).
    [`&[data-disabled] ${itemIndicator}`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});
