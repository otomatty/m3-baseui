/**
 * menu-selectable-item.css.ts — shared M3 selectable menu row styles.
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

const selectableStateLayer = {
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
  '&[data-disabled]': { color: `rgb(${vars.sys.color.onSurface} / 0.38)`, pointerEvents: 'none' },
  '&[data-disabled]::before': { opacity: 0 },
} as const;

/** M3 selected/checked fill + issue #98 position-based corner radii. */
const selectableSelectedShape = {
  '&[data-selected], &[data-checked]': {
    background: `rgb(${vars.sys.color.secondaryContainer})`,
    color: `rgb(${vars.sys.color.onSecondaryContainer})`,
  },
  '&[data-selected][data-position="only"], &[data-checked][data-position="only"]': {
    borderRadius: vars.sys.shape.extraSmall,
  },
  '&[data-selected][data-position="first"], &[data-checked][data-position="first"]': {
    borderTopLeftRadius: vars.sys.shape.extraSmall,
    borderTopRightRadius: vars.sys.shape.extraSmall,
  },
  '&[data-selected][data-position="middle"], &[data-checked][data-position="middle"]': {
    borderRadius: 0,
  },
  '&[data-selected][data-position="last"], &[data-checked][data-position="last"]': {
    borderBottomLeftRadius: vars.sys.shape.extraSmall,
    borderBottomRightRadius: vars.sys.shape.extraSmall,
  },
} as const;

const selectableRowBase = {
  position: 'relative',
  height: '48px',
  paddingInline: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  color: `rgb(${vars.sys.color.onSurface})`,
  ...labelLarge,
  selectors: {
    ...selectableStateLayer,
    ...selectableSelectedShape,
  },
} as const;

/** Select.Item row. */
export const selectMenuItem = style({
  ...selectableRowBase,
  display: 'grid',
  gridTemplateColumns: '24px 1fr auto',
  alignItems: 'center',
  gap: '12px',
});

/** Menu CheckboxItem / RadioItem row. */
export const menuSelectableItem = style({
  ...selectableRowBase,
  display: 'grid',
  gridTemplateColumns: '24px 1fr',
  alignItems: 'center',
  gap: '12px',
});

export const menuSelectableItemIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `rgb(${vars.sys.color.onSurface})`,
  visibility: 'hidden',
});

for (const parent of [selectMenuItem, menuSelectableItem]) {
  globalStyle(`${parent}[data-selected] ${menuSelectableItemIndicator}`, {
    visibility: 'visible',
    color: `rgb(${vars.sys.color.onSecondaryContainer})`,
  });
  globalStyle(`${parent}[data-checked] ${menuSelectableItemIndicator}`, {
    visibility: 'visible',
    color: `rgb(${vars.sys.color.onSecondaryContainer})`,
  });
  globalStyle(`${parent}[data-disabled] ${menuSelectableItemIndicator}`, {
    color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
  });
}

globalStyle(`${selectMenuItem} [data-slot="select-trailing"]`, {
  paddingLeft: '16px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
});
globalStyle(`${selectMenuItem}[data-selected] [data-slot="select-trailing"]`, {
  color: `rgb(${vars.sys.color.onSecondaryContainer})`,
});
globalStyle(`${selectMenuItem}[data-disabled] [data-slot="select-trailing"]`, {
  color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
});
