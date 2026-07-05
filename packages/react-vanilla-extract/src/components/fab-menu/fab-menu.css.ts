/**
 * fab-menu.css.ts — vanilla-extract styles for the M3 FAB menu.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

// The popup stacks the actions in a right-aligned column with the M3 menu
// enter/exit motion.
export const popup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '4px',
  background: 'transparent',
  outline: 'none',
  transformOrigin: 'var(--transform-origin)',
  transition: `opacity 150ms ${vars.sys.motion.easing.standard}, transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': { opacity: 0, transform: 'scale(0.95)' },
  },
});

// A single FAB menu item: a 56dp full-corner pill (elevation level3, level4 on
// hover) with a currentColor `::before` state layer. The icon (svg) sizing is a
// descendant rule (VE forbids it inside a recipe variant), so it lives on the
// shared base via globalStyle — same output as the Tailwind `[&_svg]` rule.
const itemBase = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  height: '56px',
  paddingInline: '24px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  borderRadius: vars.sys.shape.full,
  boxShadow: vars.sys.elevation.level3,
  transition: `box-shadow 150ms ${vars.sys.motion.easing.standard}`,
  fontFamily: vars.sys.typescale.titleMedium.fontFamily,
  fontWeight: vars.sys.typescale.titleMedium.fontWeight,
  fontSize: vars.sys.typescale.titleMedium.fontSize,
  lineHeight: vars.sys.typescale.titleMedium.lineHeight,
  letterSpacing: vars.sys.typescale.titleMedium.letterSpacing,
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
    '&:hover': { boxShadow: vars.sys.elevation.level4 },
    '&:hover::before': { opacity: vars.sys.state.hover },
    '&[data-highlighted]::before': { opacity: vars.sys.state.hover },
    '&:active::before': { opacity: vars.sys.state.pressed },
    // M3 discourages disabled FABs; when used, match the filled-button tokens
    // (per-token, not a blanket opacity) and suppress the state layer.
    '&[data-disabled]': {
      pointerEvents: 'none',
      boxShadow: 'none',
      background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
      color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
    },
    '&[data-disabled]::before': { opacity: 0 },
  },
});
globalStyle(`${itemBase} [data-slot="fab-menu-leading"]`, { display: 'inline-flex' });
globalStyle(`${itemBase} [data-slot="fab-menu-leading"] > svg`, { width: '24px', height: '24px' });

// Container color → container/on-container tokens. A recipe (not a plain helper)
// so the VE plugin can serialize the export.
export const item = recipe({
  base: itemBase,
  variants: {
    color: {
      primary: {
        background: `rgb(${vars.sys.color.primaryContainer})`,
        color: `rgb(${vars.sys.color.onPrimaryContainer})`,
      },
      secondary: {
        background: `rgb(${vars.sys.color.secondaryContainer})`,
        color: `rgb(${vars.sys.color.onSecondaryContainer})`,
      },
      tertiary: {
        background: `rgb(${vars.sys.color.tertiaryContainer})`,
        color: `rgb(${vars.sys.color.onTertiaryContainer})`,
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});
