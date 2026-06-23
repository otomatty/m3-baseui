/**
 * progress.css.ts — vanilla-extract styles for the M3 Progress indicators.
 * Same DOM + `data-indeterminate` hooks as the Tailwind build.
 */
import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '@m3/tokens/contract.css';

const linearIndeterminate = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(400%)' },
});

const circularSpin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const linearRoot = style({
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '4px',
  overflow: 'hidden',
  borderRadius: vars.sys.shape.full,
});

export const linearTrack = style({
  position: 'absolute',
  inset: 0,
  background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  borderRadius: vars.sys.shape.full,
});

export const linearIndicator = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  background: `rgb(${vars.sys.color.primary})`,
  borderRadius: vars.sys.shape.full,
  transition: `width 200ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${linearRoot}[data-indeterminate] &`]: {
      width: '40%',
      transition: 'none',
      animation: `${linearIndeterminate} 2s ease-in-out infinite`,
    },
  },
});

export const circularRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  selectors: {
    '&[data-indeterminate]': { animation: `${circularSpin} 1.4s linear infinite` },
  },
});
globalStyle(`${circularRoot} svg`, { display: 'block', width: '100%', height: '100%' });

export const circularTrack = style({
  stroke: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  strokeWidth: '4px',
});

export const circularIndicator = style({
  stroke: `rgb(${vars.sys.color.primary})`,
  strokeWidth: '4px',
  strokeLinecap: 'round',
  transition: `stroke-dashoffset 300ms ${vars.sys.motion.easing.standard}`,
});
