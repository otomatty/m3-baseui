/**
 * tabs.css.ts — vanilla-extract styles for the M3 Tabs.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3/tokens/contract.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
});

export const list = style({
  position: 'relative',
  display: 'flex',
  borderBottom: `1px solid rgb(${vars.sys.color.surfaceVariant})`,
  selectors: {
    // M3 scrollable tabs: horizontal overflow, no wrap, hidden scrollbar.
    '&[data-scrollable]': {
      overflowX: 'auto',
      flexWrap: 'nowrap',
      scrollbarWidth: 'none',
    },
    '&[data-scrollable]::-webkit-scrollbar': { display: 'none' },
  },
});

export const tab = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '48px',
    paddingInline: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    color: `rgb(${vars.sys.color.onSurfaceVariant})`,
    fontFamily: vars.sys.typescale.titleSmall.fontFamily,
    fontWeight: vars.sys.typescale.titleSmall.fontWeight,
    fontSize: vars.sys.typescale.titleSmall.fontSize,
    lineHeight: vars.sys.typescale.titleSmall.lineHeight,
    letterSpacing: vars.sys.typescale.titleSmall.letterSpacing,
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
      '&[data-disabled]': { opacity: 0.38, pointerEvents: 'none' },
      // Icon slot (24dp), centered.
      '& [data-slot="tab-icon"]': { display: 'inline-flex' },
      '& [data-slot="tab-icon"] > svg': { width: '24px', height: '24px' },
    },
  },
  variants: {
    variant: {
      primary: {
        selectors: {
          '&[data-active]': { color: `rgb(${vars.sys.color.primary})` },
          // M3 icon-above layout: stack icon over label, 64dp tall.
          '&[data-with-icon]': { flexDirection: 'column', height: '64px', gap: '4px' },
        },
      },
      secondary: {
        selectors: { '&[data-active]': { color: `rgb(${vars.sys.color.onSurface})` } },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const indicator = recipe({
  base: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 'var(--active-tab-width)',
    transform: 'translateX(var(--active-tab-left))',
    background: `rgb(${vars.sys.color.primary})`,
    transition: `width 200ms ${vars.sys.motion.easing.standard}, transform 200ms ${vars.sys.motion.easing.standard}`,
  },
  variants: {
    variant: {
      // primary: 3dp active indicator with rounded top corners
      primary: { height: '3px', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' },
      // secondary: 2dp square active indicator
      secondary: { height: '2px' },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const panel = style({
  padding: '16px',
  outline: 'none',
});
