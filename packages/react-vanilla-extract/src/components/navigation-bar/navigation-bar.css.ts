/**
 * navigation-bar.css.ts — vanilla-extract styles for the M3 NavigationBar.
 * Same DOM + data-* hooks as the Tailwind build: the selected item's
 * `data-pressed` drives the pill, icon and label colors.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = style({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-around',
  width: '100%',
  height: '80px',
  background: `rgb(${vars.sys.color.surfaceContainer})`,
});

export const item = style({
  position: 'relative',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  paddingInline: '4px',
  paddingTop: '12px',
  paddingBottom: '16px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  selectors: {
    // M3 disabled is per-token (icon + label dimmed below), not a blanket fade.
    '&[data-disabled]': { pointerEvents: 'none' },
  },
});

export const iconWrap = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '64px',
  height: '32px',
});

export const indicator = style({
  position: 'absolute',
  inset: 0,
  borderRadius: vars.sys.shape.full,
  background: 'transparent',
  overflow: 'hidden',
  transition: `background-color 150ms ${vars.sys.motion.easing.standard}`,
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
    [`${item}[data-pressed] &`]: { background: `rgb(${vars.sys.color.secondaryContainer})` },
    [`${item}:hover &::before`]: { opacity: vars.sys.state.hover },
    [`${item}:focus-visible &::before`]: { opacity: vars.sys.state.focus },
    [`${item}:active &::before`]: { opacity: vars.sys.state.pressed },
    // No state layer on a disabled destination.
    [`${item}[data-disabled] &::before`]: { opacity: 0 },
  },
});

export const icon = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  transition: `color 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${item}[data-pressed] &`]: { color: `rgb(${vars.sys.color.onSecondaryContainer})` },
    // M3 disabled: icon dims to on-surface/0.38. The combined selector keeps a
    // disabled+active destination dimmed (outranks the [data-pressed] color).
    [`${item}[data-disabled] &`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
    [`${item}[data-disabled][data-pressed] &`]: {
      color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
    },
  },
});
// Raw <svg> icons render at 24dp (Material Symbols set their own size).
globalStyle(`${icon} svg`, { width: '24px', height: '24px' });

export const label = style({
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelMedium.fontFamily,
  fontWeight: vars.sys.typescale.labelMedium.fontWeight,
  fontSize: vars.sys.typescale.labelMedium.fontSize,
  lineHeight: vars.sys.typescale.labelMedium.lineHeight,
  letterSpacing: vars.sys.typescale.labelMedium.letterSpacing,
  transition: `color 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${item}[data-pressed] &`]: {
      color: `rgb(${vars.sys.color.onSurface})`,
      fontWeight: '700',
    },
    // M3 disabled: label dims to on-surface/0.38 (combined selector keeps a
    // disabled+active label dimmed too).
    [`${item}[data-disabled] &`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
    [`${item}[data-disabled][data-pressed] &`]: {
      color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
    },
  },
});
