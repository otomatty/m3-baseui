/**
 * item.css.ts — vanilla-extract styles for the M3 Item row primitive.
 * Same DOM as the Tailwind build: leading slot, overline/headline/supporting
 * column and trailing slot. Inert by design — interactive surfaces wrap it.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@m3/tokens/contract.css';

export const root = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '16px',
  boxSizing: 'border-box',
  paddingInline: '16px',
  paddingBlock: '12px',
  minHeight: '56px',
  textAlign: 'left',
  background: 'transparent',
  color: `rgb(${vars.sys.color.onSurface})`,
});

export const leading = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});
globalStyle(`${leading} svg`, { width: '24px', height: '24px' });

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  flex: 1,
});

export const overline = style({
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.labelSmall.fontFamily,
  fontWeight: vars.sys.typescale.labelSmall.fontWeight,
  fontSize: vars.sys.typescale.labelSmall.fontSize,
  lineHeight: vars.sys.typescale.labelSmall.lineHeight,
  letterSpacing: vars.sys.typescale.labelSmall.letterSpacing,
});

export const headline = style({
  color: `rgb(${vars.sys.color.onSurface})`,
  fontFamily: vars.sys.typescale.bodyLarge.fontFamily,
  fontWeight: vars.sys.typescale.bodyLarge.fontWeight,
  fontSize: vars.sys.typescale.bodyLarge.fontSize,
  lineHeight: vars.sys.typescale.bodyLarge.lineHeight,
  letterSpacing: vars.sys.typescale.bodyLarge.letterSpacing,
});

export const supporting = style({
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
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
});
globalStyle(`${trailing} svg`, { width: '24px', height: '24px' });
