/**
 * switch.css.ts — vanilla-extract styles for the M3 Switch.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3/tokens/contract.css';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,
  width: '52px',
  height: '32px',
  boxSizing: 'border-box',
  borderRadius: vars.sys.shape.full,
  border: `2px solid rgb(${vars.sys.color.outline})`,
  background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  cursor: 'pointer',
  transition: `background-color 200ms ${vars.sys.motion.easing.standard}, border-color 200ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-checked]': {
      background: `rgb(${vars.sys.color.primary})`,
      borderColor: `rgb(${vars.sys.color.primary})`,
    },
    '&[data-disabled]': { pointerEvents: 'none' },
    // M3 disabled: faint track + outline (unselected); on-surface/12 track,
    // no outline (selected). Not a blanket element opacity.
    '&[data-disabled]:not([data-checked])': {
      background: `rgb(${vars.sys.color.surfaceContainerHighest} / 0.12)`,
      borderColor: `rgb(${vars.sys.color.onSurface} / 0.12)`,
    },
    '&[data-disabled][data-checked]': {
      background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
      borderColor: 'transparent',
    },
    '&:focus-visible': {
      outline: `3px solid rgb(${vars.sys.color.secondary})`,
      outlineOffset: '2px',
    },
  },
});

export const thumb = style({
  position: 'absolute',
  top: '50%',
  left: '6px',
  width: '16px',
  height: '16px',
  borderRadius: vars.sys.shape.full,
  transform: 'translateY(-50%)',
  background: `rgb(${vars.sys.color.outline})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  pointerEvents: 'none',
  transition: `all 200ms ${vars.sys.motion.easing.standard}`,
  selectors: {
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
    [`${root}[data-checked] &`]: {
      left: '22px',
      width: '24px',
      height: '24px',
      background: `rgb(${vars.sys.color.onPrimary})`,
      color: `rgb(${vars.sys.color.primary})`,
    },
    // M3 squish: handle grows to 28px while pressed, staying on its side
    [`${root}:active &`]: { left: '0px', width: '28px', height: '28px' },
    [`${root}[data-checked]:active &`]: { left: '20px', width: '28px', height: '28px' },
    // M3 disabled handle: on-surface/38 (unselected), surface (selected)
    [`${root}[data-disabled] &`]: { background: `rgb(${vars.sys.color.onSurface} / 0.38)` },
    [`${root}[data-disabled][data-checked] &`]: { background: `rgb(${vars.sys.color.surface})` },
    [`${root}:hover &::before`]: { opacity: vars.sys.state.hover },
    [`${root}:focus-visible &::before`]: { opacity: vars.sys.state.focus },
    [`${root}:active &::before`]: { opacity: vars.sys.state.pressed },
  },
});
