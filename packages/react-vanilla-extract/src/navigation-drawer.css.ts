/**
 * navigation-drawer.css.ts — vanilla-extract styles for the M3 NavigationDrawer.
 * Same DOM + `data-*` hooks as the Tailwind build: a 360dp surface-container-low
 * panel; full-corner destination pills whose `data-selected` drives the
 * secondary-container fill; disabled rows dim per-token.
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3/tokens/contract.css';

export const root = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    boxSizing: 'border-box',
    width: '360px',
    padding: '12px',
    background: `rgb(${vars.sys.color.surfaceContainerLow})`,
    color: `rgb(${vars.sys.color.onSurface})`,
  },
  variants: {
    variant: {
      standard: {},
      modal: {
        boxShadow: vars.sys.elevation.level1,
        borderTopRightRadius: vars.sys.shape.large,
        borderBottomRightRadius: vars.sys.shape.large,
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});

export const headline = style({
  paddingInline: '16px',
  paddingTop: '16px',
  paddingBottom: '4px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.titleSmall.fontFamily,
  fontWeight: vars.sys.typescale.titleSmall.fontWeight,
  fontSize: vars.sys.typescale.titleSmall.fontSize,
  lineHeight: vars.sys.typescale.titleSmall.lineHeight,
  letterSpacing: vars.sys.typescale.titleSmall.letterSpacing,
});

export const item = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '12px',
  boxSizing: 'border-box',
  height: '56px',
  paddingInline: '16px',
  borderRadius: vars.sys.shape.full,
  textAlign: 'left',
  background: 'transparent',
  border: 'none',
  textDecoration: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  overflow: 'hidden',
  outline: 'none',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontWeight: vars.sys.typescale.labelLarge.fontWeight,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
  transition: `background-color 150ms ${vars.sys.motion.easing.standard}, color 150ms ${vars.sys.motion.easing.standard}`,
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
    '&[data-selected]': {
      background: `rgb(${vars.sys.color.secondaryContainer})`,
      color: `rgb(${vars.sys.color.onSecondaryContainer})`,
    },
    '&:disabled, &[data-disabled]': {
      pointerEvents: 'none',
      color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
    },
    '&:disabled::before, &[data-disabled]::before': { opacity: 0 },
  },
});

export const leading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  selectors: {
    '& svg': { width: '24px', height: '24px' },
  },
});

export const label = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const trailing = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  fontFamily: vars.sys.typescale.labelSmall.fontFamily,
  fontWeight: vars.sys.typescale.labelSmall.fontWeight,
  fontSize: vars.sys.typescale.labelSmall.fontSize,
  lineHeight: vars.sys.typescale.labelSmall.lineHeight,
  letterSpacing: vars.sys.typescale.labelSmall.letterSpacing,
});
