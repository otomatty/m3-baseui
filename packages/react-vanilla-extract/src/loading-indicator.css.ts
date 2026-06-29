/**
 * loading-indicator.css.ts — vanilla-extract styles for the M3 Expressive
 * Loading indicator. Same DOM + `data-contained` hook as the Tailwind build.
 */
import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

// Rotate + scale "morph"; matches the Tailwind `m3-loading` keyframe period.
const loadingMorph = keyframes({
  '0%': { transform: 'rotate(0deg) scale(1)' },
  '50%': { transform: 'rotate(180deg) scale(0.85)' },
  '100%': { transform: 'rotate(360deg) scale(1)' },
});

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});
// The SVG is a fixed 38dp active indicator (uncontained: the box shrinks to it).
globalStyle(`${root} svg`, { display: 'block', width: '38px', height: '38px' });

// M3 "contained" config: a 48dp pill container with the 38dp shape inset 5dp.
export const contained = style({
  width: '48px',
  height: '48px',
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.secondaryContainer})`,
});

export const indicator = style({
  fill: `rgb(${vars.sys.color.primary})`,
  transformBox: 'fill-box',
  transformOrigin: 'center',
  animation: `${loadingMorph} 1.2s ease-in-out infinite`,
});
