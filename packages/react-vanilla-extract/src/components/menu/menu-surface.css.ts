/**
 * menu-surface.css.ts — shared M3 menu popup surface (Menus specs).
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

const popupSurfaceBase = {
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
} as const;

/** Standalone Menu popup (112–280dp). */
export const menuPopup = style({
  ...popupSurfaceBase,
  minWidth: '112px',
});

/** Select / Exposed Dropdown popup (anchor width, scrollable). */
export const selectMenuPopup = style({
  ...popupSurfaceBase,
  minWidth: 'max(112px, var(--anchor-width))',
  maxHeight: 'var(--available-height)',
  overflow: 'auto',
});

export const menuGroupLabel = style({
  paddingInline: '12px',
  paddingBlock: '8px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelSmall.fontFamily,
  fontWeight: vars.sys.typescale.labelSmall.fontWeight,
  fontSize: vars.sys.typescale.labelSmall.fontSize,
  lineHeight: vars.sys.typescale.labelSmall.lineHeight,
  letterSpacing: vars.sys.typescale.labelSmall.letterSpacing,
});
