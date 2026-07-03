/**
 * switch.css.ts — vanilla-extract styles for the M3 Switch.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.sys.shape.full,
  transform: 'translateY(-50%)',
  background: `rgb(${vars.sys.color.outline})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  pointerEvents: 'none',
  // M3 spatial motion: the handle slides/grows with emphasized easing over 300ms
  // (token-backed). emphasized is overshoot-free, so it stays safe for the
  // handle's color transitions too (no spring flicker on background-color).
  transition: `all ${vars.sys.motion.duration.medium2} ${vars.sys.motion.easing.emphasized}`,
  selectors: {
    // M3 with-icon: the unchecked handle grows to 24dp to fit its icon
    '&[data-with-icon][data-unchecked]': { left: '4px', width: '24px', height: '24px' },
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
    // M3 handle interaction colors: unselected outline→on-surface-variant,
    // selected on-primary→primary-container on hover/focus/press
    [`${root}:hover &`]: { background: `rgb(${vars.sys.color.onSurfaceVariant})` },
    [`${root}:focus-visible &`]: { background: `rgb(${vars.sys.color.onSurfaceVariant})` },
    [`${root}[data-checked]:hover &`]: { background: `rgb(${vars.sys.color.primaryContainer})` },
    [`${root}[data-checked]:focus-visible &`]: {
      background: `rgb(${vars.sys.color.primaryContainer})`,
    },
    [`${root}[data-checked]:active &`]: { background: `rgb(${vars.sys.color.primaryContainer})` },
    // M3 squish: handle grows to 28px while pressed, staying on its side
    [`${root}:active &`]: {
      left: '0px',
      width: '28px',
      height: '28px',
      background: `rgb(${vars.sys.color.onSurfaceVariant})`,
    },
    [`${root}[data-checked]:active &`]: { left: '20px', width: '28px', height: '28px' },
    // M3 disabled handle: on-surface/38 (unselected), surface (selected)
    [`${root}[data-disabled] &`]: { background: `rgb(${vars.sys.color.onSurface} / 0.38)` },
    [`${root}[data-disabled][data-checked] &`]: { background: `rgb(${vars.sys.color.surface})` },
    [`${root}:hover &::before`]: { opacity: vars.sys.state.hover },
    [`${root}:focus-visible &::before`]: { opacity: vars.sys.state.focus },
    [`${root}:active &::before`]: { opacity: vars.sys.state.pressed },
  },
});

// Handle icons (16dp). Both stay mounted; the root's data-checked reveals one.
const iconBase = {
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

export const iconChecked = style({
  ...iconBase,
  color: `rgb(${vars.sys.color.onPrimaryContainer})`,
  selectors: {
    [`${root}[data-checked] &`]: { display: 'inline-flex' },
  },
});
globalStyle(`${iconChecked} > svg`, { width: '16px', height: '16px' });

export const iconUnchecked = style({
  ...iconBase,
  display: 'inline-flex',
  color: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  selectors: {
    [`${root}[data-checked] &`]: { display: 'none' },
  },
});
globalStyle(`${iconUnchecked} > svg`, { width: '16px', height: '16px' });
