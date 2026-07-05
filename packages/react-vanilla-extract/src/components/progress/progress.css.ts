/**
 * progress.css.ts — vanilla-extract styles for the M3 Progress indicators.
 * Same DOM + `data-indeterminate` hooks as the Tailwind build, including the M3
 * gap (inactive track `::before` offset by the `--m3-progress` fraction + 4dp)
 * and the `primary` track-stop dot (`::after`).
 */
import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

// Disjoint linear indeterminate: two primary bars scale + slide across the track
// out of phase (origin at the start edge). Matches the Tailwind preset keyframes.
const linearPrimary = keyframes({
  '0%': { transform: 'translateX(0) scaleX(0.08)' },
  '36%': { transform: 'translateX(0) scaleX(0.08)' },
  '55%': { transform: 'translateX(50%) scaleX(0.5)' },
  '69%': { transform: 'translateX(84%) scaleX(0.66)' },
  '100%': { transform: 'translateX(201%) scaleX(0.08)' },
});

const linearSecondary = keyframes({
  '0%': { transform: 'translateX(0) scaleX(0.08)' },
  '19%': { transform: 'translateX(0) scaleX(0.08)' },
  '25%': { transform: 'translateX(38%) scaleX(0.4)' },
  '44%': { transform: 'translateX(84%) scaleX(0.46)' },
  '100%': { transform: 'translateX(160%) scaleX(0.08)' },
});

// Circular indeterminate: continuous ring rotation paired with the arc grow/
// shrink below (M3 "advance"). Periods match the Tailwind preset for parity.
const circularRotate = keyframes({
  to: { transform: 'rotate(360deg)' },
});

// The active arc length (dasharray) grows then shrinks while the offset sweeps
// it around, normalized against `pathLength="100"` (radius-independent).
const circularDash = keyframes({
  '0%': { strokeDasharray: '1 100', strokeDashoffset: '0' },
  '50%': { strokeDasharray: '60 100', strokeDashoffset: '-8' },
  '100%': { strokeDasharray: '60 100', strokeDashoffset: '-58' },
});

// Wavy linear: scroll the sine mask tile by one wavelength (40px) for a seamless
// flowing wave. Matches the Tailwind preset keyframe.
const waveFlow = keyframes({
  '0%': { WebkitMaskPosition: '0 center', maskPosition: '0 center' },
  '100%': { WebkitMaskPosition: '40px center', maskPosition: '40px center' },
});

export const linearRoot = style({
  position: 'relative',
  display: 'block',
  width: '100%',
  // Height (thickness) comes from the factory inline so `thickness` is honored.
  overflow: 'hidden',
  borderRadius: vars.sys.shape.full,
  selectors: {
    // Track-stop dot (primary, `--m3-thickness` tall) pinned at the inline-end
    // (mirrors under RTL). Determinate-only, so it's hidden while indeterminate.
    // The stroke-height var keeps it correct when the wavy root is taller.
    '&::after': {
      content: '""',
      position: 'absolute',
      insetInlineEnd: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      height: 'var(--m3-thickness, 100%)',
      aspectRatio: '1',
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
    // `--m3-thickness` tall and centered so the flat track keeps its stroke
    // height when the wavy root is taller.
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      height: 'var(--m3-thickness, 100%)',
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

// Primary bar. Determinate: width from Base UI. Indeterminate: full width,
// scaled + slid by the disjoint `primary` keyframe (origin at the start edge).
// Wavy determinate: a scrolling sine tile (`--m3-wave`) masks the solid bar.
export const linearIndicator = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  transformOrigin: 'left center',
  background: `rgb(${vars.sys.color.primary})`,
  borderRadius: vars.sys.shape.full,
  transition: `width 200ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${linearRoot}[data-indeterminate] &`]: {
      width: '100%',
      transition: 'none',
      animation: `${linearPrimary} 2s linear infinite`,
    },
    [`${linearRoot}[data-wavy] &`]: {
      borderRadius: 0,
      WebkitMaskImage: 'var(--m3-wave)',
      maskImage: 'var(--m3-wave)',
      WebkitMaskRepeat: 'repeat-x',
      maskRepeat: 'repeat-x',
      WebkitMaskSize: '40px 100%',
      maskSize: '40px 100%',
      animation: `${waveFlow} 1s linear infinite`,
    },
  },
  '@media': {
    // Reduced motion: freeze the loops — a static ~40% bar / static wave.
    '(prefers-reduced-motion: reduce)': {
      selectors: {
        [`${linearRoot}[data-indeterminate] &`]: { width: '40%', animation: 'none' },
        [`${linearRoot}[data-wavy] &`]: { animation: 'none' },
      },
    },
  },
});

// Second disjoint bar: only shown/animated while indeterminate.
export const linearIndicatorSecondary = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  display: 'none',
  transformOrigin: 'left center',
  background: `rgb(${vars.sys.color.primary})`,
  borderRadius: vars.sys.shape.full,
  selectors: {
    [`${linearRoot}[data-indeterminate] &`]: {
      display: 'block',
      animation: `${linearSecondary} 2s linear infinite`,
    },
  },
  '@media': {
    // Reduced motion: a single static bar reads better than two frozen ones.
    '(prefers-reduced-motion: reduce)': {
      selectors: {
        [`${linearRoot}[data-indeterminate] &`]: { display: 'none' },
      },
    },
  },
});

export const circularRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  // Size (width/height) comes from the factory inline so `size` is honored.
  selectors: {
    '&[data-indeterminate]': { animation: `${circularRotate} 1.4s linear infinite` },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      selectors: {
        '&[data-indeterminate]': { animation: 'none' },
      },
    },
  },
});
globalStyle(`${circularRoot} svg`, { display: 'block', width: '100%', height: '100%' });

// Both ends rounded (M3); the inactive track sits behind with a 4dp gap.
export const circularTrack = style({
  stroke: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  strokeLinecap: 'round',
  transition: `stroke-dasharray 300ms ${vars.sys.motion.easing.standard}, stroke-dashoffset 300ms ${vars.sys.motion.easing.standard}`,
});

export const circularIndicator = style({
  stroke: `rgb(${vars.sys.color.primary})`,
  strokeLinecap: 'round',
  transition: `stroke-dasharray 300ms ${vars.sys.motion.easing.standard}, stroke-dashoffset 300ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    // Indeterminate: the arc grows/shrinks (advance) instead of transitioning.
    [`${circularRoot}[data-indeterminate] &`]: {
      transition: 'none',
      animation: `${circularDash} 1.4s ease-in-out infinite`,
    },
  },
  '@media': {
    // Reduced motion: freeze the arc at its static 25% length (no rotation).
    '(prefers-reduced-motion: reduce)': {
      selectors: {
        [`${circularRoot}[data-indeterminate] &`]: { animation: 'none' },
      },
    },
  },
});
