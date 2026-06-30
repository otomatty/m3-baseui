/**
 * progress.css.ts — vanilla-extract styles for the M3 Progress indicators.
 * Same DOM + `data-indeterminate` hooks as the Tailwind build, including the M3
 * gap (inactive track `::before` offset by the `--m3-progress` fraction + 4dp)
 * and the `primary` track-stop dot (`::after`).
 */
import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

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
  selectors: {
    // Track-stop dot (4dp, primary) pinned at the inline-end (mirrors under RTL).
    // It's a determinate-only M3 concept, so it's hidden while indeterminate.
    '&::after': {
      content: '""',
      position: 'absolute',
      insetInlineEnd: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '4px',
      borderRadius: vars.sys.shape.full,
      background: `rgb(${vars.sys.color.primary})`,
    },
    '&[data-indeterminate]::after': {
      display: 'none',
    },
  },
});

export const linearTrack = style({
  // Positioning container only; the inactive track is the `::before` pseudo so a
  // 4dp gap separates it from the active indicator (`--m3-progress` + 4px). The
  // gap uses logical inline insets so it tracks the indicator (anchored by Base
  // UI at inline-start) under `dir="rtl"`.
  position: 'absolute',
  inset: 0,
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      insetInlineEnd: 0,
      insetInlineStart: 'calc(var(--m3-progress, 0%) + 4px)',
      background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
      borderRadius: vars.sys.shape.full,
    },
    // Indeterminate has no fraction: the inactive track spans the full width.
    [`${linearRoot}[data-indeterminate] &::before`]: {
      insetInlineStart: 0,
    },
  },
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
    // 1s matches Tailwind's built-in `animate-spin` period (drop-in parity).
    '&[data-indeterminate]': { animation: `${circularSpin} 1s linear infinite` },
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
