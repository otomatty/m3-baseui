/**
 * checkbox.css.ts — vanilla-extract styles for the M3 Checkbox.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxSizing: 'border-box',
  width: '18px',
  height: '18px',
  borderRadius: '2px',
  border: `2px solid rgb(${vars.sys.color.onSurfaceVariant})`,
  background: 'transparent',
  // Outline is on-surface-variant; the state layer (currentColor) is on-surface
  // unselected, primary when selected (material-web).
  color: `rgb(${vars.sys.color.onSurface})`,
  cursor: 'pointer',
  // Transition `color` too so the state-layer (currentColor) pressed inversion
  // animates — matching the Tailwind build's `transition-colors` (drop-in parity).
  transition: `background-color 150ms ${vars.sys.motion.easing.standard}, border-color 150ms ${vars.sys.motion.easing.standard}, color 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-checked], &[data-indeterminate]': {
      background: `rgb(${vars.sys.color.primary})`,
      borderColor: `rgb(${vars.sys.color.primary})`,
      color: `rgb(${vars.sys.color.primary})`,
    },
    '&[data-disabled]': { pointerEvents: 'none' },
    // M3 disabled: unselected outline on-surface/38; selected/indeterminate box
    // on-surface/38 with no outline (the check turns surface, below).
    '&[data-disabled]:not([data-checked]):not([data-indeterminate])': {
      borderColor: `rgb(${vars.sys.color.onSurface} / 0.38)`,
    },
    '&[data-disabled][data-checked], &[data-disabled][data-indeterminate]': {
      background: `rgb(${vars.sys.color.onSurface} / 0.38)`,
      borderColor: 'transparent',
    },
    '&[data-disabled]::before': { opacity: 0 },
    // M3 pressed state layer inverts: unselected→primary, selected→on-surface
    '&:active': { color: `rgb(${vars.sys.color.primary})` },
    '&[data-checked]:active, &[data-indeterminate]:active': {
      color: `rgb(${vars.sys.color.onSurface})`,
    },
    // M3 error: error outline + error-filled box; state layer stays error
    '&[data-error]': {
      borderColor: `rgb(${vars.sys.color.error})`,
      color: `rgb(${vars.sys.color.error})`,
    },
    '&[data-error][data-checked], &[data-error][data-indeterminate]': {
      background: `rgb(${vars.sys.color.error})`,
      borderColor: `rgb(${vars.sys.color.error})`,
      color: `rgb(${vars.sys.color.error})`,
    },
    '&[data-error]:active, &[data-error][data-checked]:active, &[data-error][data-indeterminate]:active':
      {
        color: `rgb(${vars.sys.color.error})`,
      },
    '&:focus-visible': {
      outline: `3px solid rgb(${vars.sys.color.secondary})`,
      outlineOffset: '2px',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'currentColor',
      opacity: 0,
      transform: 'translate(-50%, -50%)',
      transition: `opacity 100ms ${vars.sys.motion.easing.standard}`,
    },
    '&:hover::before': { opacity: vars.sys.state.hover },
    '&:focus-visible::before': { opacity: vars.sys.state.focus },
    '&:active::before': { opacity: vars.sys.state.pressed },
  },
});

export const indicator = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  color: `rgb(${vars.sys.color.onPrimary})`,
  opacity: 0,
  selectors: {
    '&[data-checked], &[data-indeterminate]': { opacity: 1 },
    // M3 error: the check / dash turn on-error on the error-filled box
    [`${root}[data-error] &`]: { color: `rgb(${vars.sys.color.onError})` },
    // M3 disabled: the check / dash turn the surface color on the faint box
    [`${root}[data-disabled] &`]: { color: `rgb(${vars.sys.color.surface})` },
    '&[data-indeterminate]::after': {
      content: '""',
      position: 'absolute',
      width: '10px',
      height: '2px',
      borderRadius: vars.sys.shape.full,
      background: 'currentColor',
    },
  },
});

export const icon = style({
  width: '18px',
  height: '18px',
  selectors: {
    [`${indicator}[data-indeterminate] &`]: { opacity: 0 },
  },
});
