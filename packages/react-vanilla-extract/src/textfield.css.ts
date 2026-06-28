/**
 * textfield.css.ts — vanilla-extract styles for the M3 TextField.
 *
 * Same DOM + data-* hooks as the Tailwind build: the floating label and the
 * focus/filled border key off Field's `data-focused` / `data-filled` /
 * `data-invalid` / `data-disabled`, read off the Root (the `root` class here).
 */
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@m3-baseui/tokens/contract.css';

type Typescale = {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};
const type = (t: Typescale) => ({
  fontFamily: t.fontFamily,
  fontWeight: t.fontWeight,
  fontSize: t.fontSize,
  lineHeight: t.lineHeight,
  letterSpacing: t.letterSpacing,
});

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: '210px',
  selectors: {
    '&[data-disabled]': { opacity: 0.38, pointerEvents: 'none' },
  },
});

export const field = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'stretch',
  gap: '12px',
  height: '56px',
  paddingInline: '16px',
  boxSizing: 'border-box',
  transition: `border-color 150ms ${vars.sys.motion.easing.standard}, padding 150ms ${vars.sys.motion.easing.standard}`,
});

export const fieldVariant = styleVariants({
  filled: {
    borderTopLeftRadius: vars.sys.shape.extraSmall,
    borderTopRightRadius: vars.sys.shape.extraSmall,
    background: `rgb(${vars.sys.color.surfaceContainerHighest})`,
    borderBottom: `2px solid rgb(${vars.sys.color.outline})`,
    selectors: {
      // M3 filled focus-active-indicator-height is 3dp (resting/error stay 2dp).
      [`${root}[data-focused] &`]: {
        borderBottomWidth: '3px',
        borderBottomColor: `rgb(${vars.sys.color.primary})`,
      },
      [`${root}[data-invalid] &`]: { borderBottomColor: `rgb(${vars.sys.color.error})` },
    },
  },
  outlined: {
    borderRadius: vars.sys.shape.extraSmall,
    border: `1px solid rgb(${vars.sys.color.outline})`,
    selectors: {
      // M3 outlined focus-outline-width is 3dp (matches Select's trigger);
      // padding drops 2px so content stays steady as the 1dp border grows.
      [`${root}[data-focused] &`]: {
        border: `3px solid rgb(${vars.sys.color.primary})`,
        paddingInline: '14px',
      },
      [`${root}[data-invalid] &`]: { borderColor: `rgb(${vars.sys.color.error})` },
    },
  },
});

export const inputWrap = style({
  position: 'relative',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
});

export const input = style({
  width: '100%',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  padding: 0,
  color: `rgb(${vars.sys.color.onSurface})`,
  ...type(vars.sys.typescale.bodyLarge),
  '::placeholder': { color: `rgb(${vars.sys.color.onSurfaceVariant})` },
});

export const inputVariant = styleVariants({
  filled: { paddingTop: '12px' },
  outlined: {},
});

export const label = style({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  transformOrigin: 'left',
  pointerEvents: 'none',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  ...type(vars.sys.typescale.bodyLarge),
  transition: `all 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    [`${root}[data-focused] &`]: { color: `rgb(${vars.sys.color.primary})` },
    [`${root}[data-invalid] &`]: { color: `rgb(${vars.sys.color.error})` },
  },
});

const floatFilled = {
  top: '6px',
  transform: 'translateY(0)',
  ...type(vars.sys.typescale.bodySmall),
};
const floatOutlined = {
  top: 0,
  transform: 'translateY(-50%)',
  background: `rgb(${vars.sys.color.surface})`,
  paddingInline: '4px',
  ...type(vars.sys.typescale.bodySmall),
};

export const labelVariant = styleVariants({
  filled: {
    selectors: {
      [`${root}[data-focused] &`]: floatFilled,
      [`${root}[data-filled] &`]: floatFilled,
    },
  },
  outlined: {
    selectors: {
      [`${root}[data-focused] &`]: floatOutlined,
      [`${root}[data-filled] &`]: floatOutlined,
    },
  },
});

export const icon = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
});

export const supporting = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  paddingInline: '16px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  ...type(vars.sys.typescale.bodySmall),
  selectors: {
    [`${root}[data-invalid] &`]: { color: `rgb(${vars.sys.color.error})` },
  },
});

export const supportingText = style({ minWidth: 0 });
export const counter = style({ flexShrink: 0, fontVariantNumeric: 'tabular-nums' });
