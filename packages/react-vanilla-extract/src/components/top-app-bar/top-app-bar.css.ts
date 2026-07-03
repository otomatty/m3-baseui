/**
 * top-app-bar.css.ts — vanilla-extract styles for the M3 TopAppBar.
 * Same DOM + `data-variant` hook as the Tailwind build: a `surface` bar whose
 * `small`/`center` variants are a single 64dp row (title-large) and whose
 * `medium`/`large` variants add a second headline line (headline-small /
 * headline-medium) for 112dp / 152dp totals.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

export const root = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    height: '64px',
    background: `rgb(${vars.sys.color.surface})`,
    color: `rgb(${vars.sys.color.onSurface})`,
  },
  variants: {
    variant: {
      small: {},
      center: {},
      medium: { height: '112px' },
      large: { height: '152px' },
    },
  },
  defaultVariants: {
    variant: 'small',
  },
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '64px',
  paddingInline: '4px',
});

export const leading = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  color: `rgb(${vars.sys.color.onSurface})`,
});
globalStyle(`${leading} svg`, { width: '24px', height: '24px' });

const headlineType = (scale: typeof vars.sys.typescale.titleLarge) => ({
  fontFamily: scale.fontFamily,
  fontWeight: scale.fontWeight,
  fontSize: scale.fontSize,
  lineHeight: scale.lineHeight,
  letterSpacing: scale.letterSpacing,
});

export const headline = recipe({
  base: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: `rgb(${vars.sys.color.onSurface})`,
  },
  variants: {
    variant: {
      small: { flex: 1, paddingInline: '12px', ...headlineType(vars.sys.typescale.titleLarge) },
      center: {
        flex: 1,
        paddingInline: '12px',
        textAlign: 'center',
        ...headlineType(vars.sys.typescale.titleLarge),
      },
      medium: {
        paddingInline: '16px',
        paddingBottom: '24px',
        ...headlineType(vars.sys.typescale.headlineSmall),
      },
      large: {
        paddingInline: '16px',
        paddingBottom: '28px',
        ...headlineType(vars.sys.typescale.headlineMedium),
      },
    },
  },
  defaultVariants: {
    variant: 'small',
  },
});

export const trailing = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});
globalStyle(`${trailing} svg`, { width: '24px', height: '24px' });
