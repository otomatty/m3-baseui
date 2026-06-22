/**
 * radio.css.ts — vanilla-extract styles for the M3 Radio + RadioGroup.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3/tokens/contract.css';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxSizing: 'border-box',
  width: '20px',
  height: '20px',
  borderRadius: vars.sys.shape.full,
  border: `2px solid rgb(${vars.sys.color.onSurfaceVariant})`,
  background: 'transparent',
  // Ring is on-surface-variant; the state layer (currentColor) is on-surface
  // unselected, primary when selected (material-web).
  color: `rgb(${vars.sys.color.onSurface})`,
  cursor: 'pointer',
  transition: `border-color 150ms ${vars.sys.motion.easing.standard}, color 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-checked]': {
      borderColor: `rgb(${vars.sys.color.primary})`,
      color: `rgb(${vars.sys.color.primary})`,
    },
    // M3 disabled: ring (and dot) turn on-surface/38; no state layer.
    '&[data-disabled]': {
      pointerEvents: 'none',
      borderColor: `rgb(${vars.sys.color.onSurface} / 0.38)`,
    },
    '&[data-disabled]::before': { opacity: 0 },
    // M3 pressed state layer inverts: unselected→primary, selected→on-surface
    '&:active': { color: `rgb(${vars.sys.color.primary})` },
    '&[data-checked]:active': { color: `rgb(${vars.sys.color.onSurface})` },
    // M3 error: error ring + error state layer in every interaction state
    '&[data-error]': {
      borderColor: `rgb(${vars.sys.color.error})`,
      color: `rgb(${vars.sys.color.error})`,
    },
    '&[data-error]:active, &[data-error][data-checked]:active': {
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
  display: 'block',
  width: 0,
  height: 0,
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.primary})`,
  pointerEvents: 'none',
  opacity: 0,
  transition: `width 150ms ${vars.sys.motion.easing.standard}, height 150ms ${vars.sys.motion.easing.standard}, opacity 150ms`,
  selectors: {
    '&[data-checked]': { width: '10px', height: '10px', opacity: 1 },
    [`${root}[data-error] &`]: { background: `rgb(${vars.sys.color.error})` },
    [`${root}[data-disabled] &`]: { background: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

export const group = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '4px',
});
