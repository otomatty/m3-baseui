/**
 * list.css.ts — vanilla-extract styles for the M3 List.
 * Same DOM + `data-disabled` hooks as the Tailwind build: rows are
 * 56/72/88dp for one/two/three-line; interactive rows carry a currentColor
 * state-layer `::before`; disabled rows dim per-token.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = style({
  listStyle: 'none',
  margin: 0,
  // Reset the native <ul> inline padding (~40px) while keeping the 8dp block padding.
  paddingInline: 0,
  paddingBlock: '8px',
  background: 'transparent',
});

/** Stable base on every row — also the parent selector for per-token dimming. */
export const itemBase = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '16px',
  boxSizing: 'border-box',
  paddingInline: '16px',
  textAlign: 'left',
  background: 'transparent',
  border: 'none',
  color: `rgb(${vars.sys.color.onSurface})`,
  textDecoration: 'none',
});

export const item = recipe({
  variants: {
    lines: {
      1: { minHeight: '56px', paddingBlock: '8px' },
      2: { minHeight: '72px', paddingBlock: '8px' },
      3: { minHeight: '88px', alignItems: 'flex-start', paddingBlock: '12px' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
        outline: 'none',
        selectors: {
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'currentColor',
            opacity: 0,
            pointerEvents: 'none',
            transition: `opacity 100ms ${vars.sys.motion.easing.standard}`,
          },
          '&:hover::before': { opacity: vars.sys.state.hover },
          '&:focus-visible::before': { opacity: vars.sys.state.focus },
          '&:active::before': { opacity: vars.sys.state.pressed },
          '&[data-disabled], &:disabled': { pointerEvents: 'none' },
          '&[data-disabled]::before, &:disabled::before': { opacity: 0 },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    lines: 1,
    interactive: false,
  },
});

export const leading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  overflow: 'hidden',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  selectors: {
    [`${itemBase}[data-disabled] &`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
    // M3 leading column widths, keyed on the factory's data-leading attribute.
    '&[data-leading="avatar"]': { width: '40px', height: '40px', borderRadius: '9999px' },
    '&[data-leading="image"]': { width: '56px', height: '56px' },
    '&[data-leading="video"]': { width: '100px', height: '56px' },
  },
});
globalStyle(`${leading} svg`, { width: '24px', height: '24px' });
globalStyle(`${leading} img`, { width: '100%', height: '100%', objectFit: 'cover' });

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  flex: 1,
});

export const headline = style({
  color: `rgb(${vars.sys.color.onSurface})`,
  fontFamily: vars.sys.typescale.bodyLarge.fontFamily,
  fontWeight: vars.sys.typescale.bodyLarge.fontWeight,
  fontSize: vars.sys.typescale.bodyLarge.fontSize,
  lineHeight: vars.sys.typescale.bodyLarge.lineHeight,
  letterSpacing: vars.sys.typescale.bodyLarge.letterSpacing,
  selectors: {
    [`${itemBase}[data-disabled] &`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

export const supporting = style({
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
  selectors: {
    [`${itemBase}[data-disabled] &`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});

export const trailing = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelSmall.fontFamily,
  fontWeight: vars.sys.typescale.labelSmall.fontWeight,
  fontSize: vars.sys.typescale.labelSmall.fontSize,
  lineHeight: vars.sys.typescale.labelSmall.lineHeight,
  letterSpacing: vars.sys.typescale.labelSmall.letterSpacing,
  selectors: {
    [`${itemBase}[data-disabled] &`]: { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
  },
});
globalStyle(`${trailing} svg`, { width: '24px', height: '24px' });
