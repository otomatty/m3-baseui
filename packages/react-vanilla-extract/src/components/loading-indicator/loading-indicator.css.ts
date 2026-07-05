/**
 * loading-indicator.css.ts — vanilla-extract styles for the M3 Expressive
 * Loading indicator. Same DOM + `data-contained` hook as the Tailwind build.
 */
import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

// Steady global rotation (the shape morph is driven by the core factory via
// WAAPI). Period matches the Tailwind `m3-loading` keyframe (≈4666ms).
const loadingSpin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});
// The SVG is a fixed 38dp active indicator (uncontained: the box shrinks to it).
globalStyle(`${root} svg`, { display: 'block', width: '38px', height: '38px' });

// M3 Expressive "contained" config: a 48dp PrimaryContainer pill with the 38dp
// OnPrimaryContainer shape inset 5dp.
export const contained = style({
  width: '48px',
  height: '48px',
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.primaryContainer})`,
});

export const indicator = style({
  fill: `rgb(${vars.sys.color.primary})`,
  transformBox: 'fill-box',
  transformOrigin: 'center',
  animation: `${loadingSpin} 4666ms linear infinite`,
  '@media': {
    // Reduced motion: hold a static shape (the morph also self-disables).
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
});

// Contained overrides the shape fill to OnPrimaryContainer.
export const containedIndicator = style({
  fill: `rgb(${vars.sys.color.onPrimaryContainer})`,
});
