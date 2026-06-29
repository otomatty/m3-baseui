/**
 * tooltip.css.ts — vanilla-extract styles for the M3 plain Tooltip.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

export const popup = style({
  background: `rgb(${vars.sys.color.inverseSurface})`,
  color: `rgb(${vars.sys.color.inverseOnSurface})`,
  fontFamily: vars.sys.typescale.bodySmall.fontFamily,
  fontWeight: vars.sys.typescale.bodySmall.fontWeight,
  fontSize: vars.sys.typescale.bodySmall.fontSize,
  lineHeight: vars.sys.typescale.bodySmall.lineHeight,
  letterSpacing: vars.sys.typescale.bodySmall.letterSpacing,
  borderRadius: vars.sys.shape.extraSmall,
  paddingInline: '8px',
  paddingBlock: '4px',
  maxWidth: '224px',
  userSelect: 'none',
  transformOrigin: 'var(--transform-origin)',
  transition: `opacity 150ms ${vars.sys.motion.easing.standard}, transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': {
      opacity: 0,
      transform: 'scale(0.95)',
    },
  },
});

export const arrow = style({
  color: `rgb(${vars.sys.color.inverseSurface})`,
});

export const richPopup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  background: `rgb(${vars.sys.color.surfaceContainer})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  boxShadow: vars.sys.elevation.level2,
  borderRadius: vars.sys.shape.medium,
  paddingInline: '16px',
  paddingBlock: '12px',
  maxWidth: '320px',
  transformOrigin: 'var(--transform-origin)',
  transition: `opacity 150ms ${vars.sys.motion.easing.standard}, transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': {
      opacity: 0,
      transform: 'scale(0.95)',
    },
  },
});

export const subhead = style({
  fontFamily: vars.sys.typescale.titleSmall.fontFamily,
  fontWeight: vars.sys.typescale.titleSmall.fontWeight,
  fontSize: vars.sys.typescale.titleSmall.fontSize,
  lineHeight: vars.sys.typescale.titleSmall.lineHeight,
  letterSpacing: vars.sys.typescale.titleSmall.letterSpacing,
  color: `rgb(${vars.sys.color.onSurface})`,
});

export const supportingText = style({
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '8px',
  marginTop: '4px',
  marginLeft: '-8px',
});
