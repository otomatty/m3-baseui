/**
 * menu.css.ts — vanilla-extract styles for the M3 Menu.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

import { menuGroupLabel, menuPopup } from './menu-surface.css';
import { menuSelectableItem, menuSelectableItemIndicator } from './menu-selectable-item.css';

export { menuPopup as popup, menuGroupLabel as groupLabel };
export { menuSelectableItem as checkboxItem, menuSelectableItem as radioItem };
export { menuSelectableItemIndicator as itemIndicator };

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

/**
 * Leading icon (24dp) + trailing supporting text (shortcut/meta) slots.
 */
function menuSlots(parent: string, { trailing = false }: { trailing?: boolean } = {}) {
  globalStyle(`${parent} [data-slot="menu-leading"]`, {
    display: 'inline-flex',
    color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  });
  globalStyle(`${parent} [data-slot="menu-leading"] > svg`, { width: '24px', height: '24px' });
  globalStyle(`${parent}[data-disabled] [data-slot="menu-leading"]`, {
    color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
  });
  if (trailing) {
    globalStyle(`${parent} [data-slot="menu-trailing"]`, {
      marginLeft: 'auto',
      paddingLeft: '16px',
      color: `rgb(${vars.sys.color.onSurfaceVariant})`,
    });
    globalStyle(`${parent}[data-disabled] [data-slot="menu-trailing"]`, {
      color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
    });
  }
}

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
  selectors: { ...stateLayerSelectors },
});
menuSlots(item, { trailing: true });

export const separator = style({
  marginBlock: '8px',
  height: '1px',
  border: 0,
  background: `rgb(${vars.sys.color.outlineVariant})`,
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
  },
});
menuSlots(submenuTrigger);
