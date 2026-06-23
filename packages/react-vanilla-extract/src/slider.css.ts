/**
 * slider.css.ts — vanilla-extract styles for the M3 Slider.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@otomatty/tokens/contract.css';

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
  height: '40px',
});

export const track = style({
  position: 'relative',
  width: '100%',
  height: '4px',
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
  // M3 disabled: inactive track on-surface @ 0.12 (per-token, not a blanket fade)
  selectors: {
    [`${root}[data-disabled] &`]: { background: `rgb(${vars.sys.color.onSurface} / 0.12)` },
  },
});

export const indicator = style({
  position: 'absolute',
  height: '4px',
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.primary})`,
  // M3 disabled: active track on-surface @ 0.38
  selectors: {
    [`${root}[data-disabled] &`]: { background: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

export const thumb = style({
  position: 'relative',
  width: '20px',
  height: '20px',
  borderRadius: vars.sys.shape.full,
  background: `rgb(${vars.sys.color.primary})`,
  outline: 'none',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: `rgb(${vars.sys.color.primary})`,
      opacity: 0,
      transform: 'translate(-50%, -50%)',
      transition: `opacity 100ms ${vars.sys.motion.easing.standard}`,
    },
    '&:hover::before': { opacity: vars.sys.state.hover },
    '&:focus-visible::before': { opacity: vars.sys.state.focus },
    '&[data-dragging]::before': { opacity: vars.sys.state.pressed },
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
