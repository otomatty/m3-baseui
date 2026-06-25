/**
 * segmented-button.css.ts — vanilla-extract styles for the M3 SegmentedButton.
 * Same DOM + `data-*` hooks as the Tailwind build: a connected outlined row;
 * the selected segment's `data-pressed` drives the secondary-container fill and
 * reveals the leading checkmark (hiding any provided icon).
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = style({
  display: 'inline-flex',
  alignItems: 'stretch',
  height: '40px',
  borderRadius: vars.sys.shape.full,
  border: `1px solid rgb(${vars.sys.color.outline})`,
  overflow: 'hidden',
});

export const item = style({
  position: 'relative',
  display: 'inline-flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  paddingInline: '12px',
  minWidth: '48px',
  background: 'transparent',
  border: 'none',
  borderLeft: `1px solid rgb(${vars.sys.color.outline})`,
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  color: `rgb(${vars.sys.color.onSurface})`,
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontWeight: vars.sys.typescale.labelLarge.fontWeight,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
  transition: `background-color 150ms ${vars.sys.motion.easing.standard}, color 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&:first-child': { borderLeft: 'none' },
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
    '&[data-pressed]': {
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

export const check = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  height: '18px',
  width: 0,
  opacity: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  transition: `width 150ms ${vars.sys.motion.easing.standard}, opacity 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${item}[data-pressed] &`]: { width: '18px', opacity: 1 },
  },
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  selectors: {
    [`${item}[data-pressed] &`]: { display: 'none' },
  },
});
globalStyle(`${icon} svg`, { width: '18px', height: '18px' });

export const label = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
