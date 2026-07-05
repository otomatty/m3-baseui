/**
 * slider.css.ts — vanilla-extract styles for the M3 Expressive Slider.
 * Same DOM + data-* hooks as the Tailwind build (data-disabled / data-range /
 * data-dragging / data-tick / data-active / data-visible) and the same
 * `--m3-slider-start/end` gap vars the factory publishes.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

// 6dp gap each side of the handle + half the 4dp handle = 8px handle gap.
const HANDLE_GAP = '8px';
const INSIDE_CORNER = '2px';

export const root = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  width: '100%',
  touchAction: 'none',
});

export const control = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  // 44dp to hold the bar handle (HandleHeight) as the touch target.
  height: '44px',
});

// Transparent positioning container; the inactive rail is drawn on the pseudos so
// the handle gaps stay transparent. `::before` = rail after the active end
// (single + range). `::after` = rail before the active start (range only; it
// collapses to zero width when `--m3-slider-start` is 0).
export const track = style({
  position: 'relative',
  width: '100%',
  height: '16px',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      insetInlineEnd: 0,
      insetInlineStart: `calc(var(--m3-slider-end, 0%) + ${HANDLE_GAP})`,
      background: `rgb(${vars.sys.color.secondaryContainer})`,
      borderStartStartRadius: INSIDE_CORNER,
      borderEndStartRadius: INSIDE_CORNER,
      borderStartEndRadius: vars.sys.shape.full,
      borderEndEndRadius: vars.sys.shape.full,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      insetInlineStart: 0,
      insetInlineEnd: `calc(100% - var(--m3-slider-start, 0%) + ${HANDLE_GAP})`,
      background: `rgb(${vars.sys.color.secondaryContainer})`,
      borderStartStartRadius: vars.sys.shape.full,
      borderEndStartRadius: vars.sys.shape.full,
      borderStartEndRadius: INSIDE_CORNER,
      borderEndEndRadius: INSIDE_CORNER,
    },
    // M3 disabled: inactive rail on-surface @ 0.12 (per-token, not a blanket fade)
    [`${root}[data-disabled] &::before`]: {
      background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
    },
    [`${root}[data-disabled] &::after`]: {
      background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
    },
  },
});

// Active fill. Geometry (absolute insets built from the active fraction + gap) is
// set inline by the factory; here we own colour + corners. Outer edge full, inner
// (handle-facing) edge 2dp; a range slider's start edge is inner too.
export const indicator = style({
  background: `rgb(${vars.sys.color.primary})`,
  borderStartStartRadius: vars.sys.shape.full,
  borderEndStartRadius: vars.sys.shape.full,
  borderStartEndRadius: INSIDE_CORNER,
  borderEndEndRadius: INSIDE_CORNER,
  selectors: {
    [`${root}[data-range] &`]: {
      borderStartStartRadius: INSIDE_CORNER,
      borderEndStartRadius: INSIDE_CORNER,
    },
    // M3 disabled: active fill on-surface @ 0.38
    [`${root}[data-disabled] &`]: { background: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

// 4×44dp bar handle, CornerFull. No state layer: it shrinks to 2dp on pressed
// (data-dragging) / focus via the fast-spatial spring; hover stays 4dp. Disabled
// keeps the 4dp width (DisabledHandleWidth) and dims to 0.38.
export const thumb = style({
  position: 'relative',
  width: '4px',
  height: '44px',
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.primary})`,
  outline: 'none',
  transitionProperty: 'width',
  transitionTimingFunction: vars.sys.motion.easing.springSpatialFast,
  transitionDuration: vars.sys.motion.duration.springSpatialFast,
  selectors: {
    '&:focus-visible': { width: '2px' },
    '&[data-dragging]': { width: '2px' },
    // M3 disabled: handle on-surface @ 0.38
    [`${root}[data-disabled] &`]: { background: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

export const value = style({
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontWeight: vars.sys.typescale.labelLarge.fontWeight,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontVariantNumeric: 'tabular-nums',
});

export const tickList = style({
  pointerEvents: 'none',
  position: 'absolute',
  inset: 0,
});

// Stop dots reverse across the tracks: primary on the inactive rail,
// secondary-container on the active fill; disabled dots are on-surface.
export const tick = style({
  position: 'absolute',
  width: '4px',
  height: '4px',
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.primary})`,
  transform: 'translate(-50%, -50%)',
  selectors: {
    '&[data-active]': { background: `rgb(${vars.sys.color.secondaryContainer})` },
    [`${root}[data-disabled] &`]: { background: `rgb(${vars.sys.color.onSurface})` },
  },
});

// Floating value indicator: inverse-surface container / inverse-on-surface text,
// 12dp above the handle.
export const valueLabel = style({
  pointerEvents: 'none',
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  marginBottom: '12px',
  transform: 'translateX(-50%)',
  borderRadius: vars.sys.shape.extraSmall,
  padding: '2px 8px',
  background: `rgb(${vars.sys.color.inverseSurface})`,
  color: `rgb(${vars.sys.color.inverseOnSurface})`,
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontWeight: vars.sys.typescale.labelLarge.fontWeight,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  opacity: 0,
  selectors: {
    '&[data-visible]': { opacity: 1 },
  },
});
