/**
 * fab.css.ts — vanilla-extract recipe for the M3 (Expressive) FAB.
 * Same DOM + data-* hooks as the Tailwind build.
 *
 * Three sizes (small 56 / medium 80 / large 96 dp) × two variants (standard
 * square, extended pill). The size×variant geometry is composed with
 * compoundVariants so each M3 combination maps to exact dp values. The icon
 * (svg) sizing is a descendant rule, which VE forbids inside a recipe variant,
 * so each combination is a named style targeted with globalStyle — same output
 * as the Tailwind build's `[&_svg]:size-*`.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

// ---- Standard (icon-only square): container / corner / icon ----
const stdSmall = style({ width: '56px', height: '56px', borderRadius: vars.sys.shape.large });
globalStyle(`${stdSmall} svg`, { width: '24px', height: '24px' });

const stdMedium = style({
  width: '80px',
  height: '80px',
  borderRadius: vars.sys.shape.largeIncreased,
});
globalStyle(`${stdMedium} svg`, { width: '28px', height: '28px' });

const stdLarge = style({ width: '96px', height: '96px', borderRadius: vars.sys.shape.extraLarge });
globalStyle(`${stdLarge} svg`, { width: '32px', height: '32px' });

// ---- Extended (icon + label pill): height / corner / icon / padding / gap / label ----
const extSmall = style({
  height: '56px',
  paddingInline: '16px',
  gap: '8px',
  borderRadius: vars.sys.shape.large,
  fontFamily: vars.sys.typescale.titleMedium.fontFamily,
  fontWeight: vars.sys.typescale.titleMedium.fontWeight,
  fontSize: vars.sys.typescale.titleMedium.fontSize,
  lineHeight: vars.sys.typescale.titleMedium.lineHeight,
  letterSpacing: vars.sys.typescale.titleMedium.letterSpacing,
});
globalStyle(`${extSmall} svg`, { width: '24px', height: '24px' });

const extMedium = style({
  height: '80px',
  paddingInline: '26px',
  gap: '16px',
  borderRadius: vars.sys.shape.largeIncreased,
  fontFamily: vars.sys.typescale.titleLarge.fontFamily,
  fontWeight: vars.sys.typescale.titleLarge.fontWeight,
  fontSize: vars.sys.typescale.titleLarge.fontSize,
  lineHeight: vars.sys.typescale.titleLarge.lineHeight,
  letterSpacing: vars.sys.typescale.titleLarge.letterSpacing,
});
globalStyle(`${extMedium} svg`, { width: '28px', height: '28px' });

const extLarge = style({
  height: '96px',
  paddingInline: '28px',
  gap: '20px',
  borderRadius: vars.sys.shape.extraLarge,
  fontFamily: vars.sys.typescale.headlineSmall.fontFamily,
  fontWeight: vars.sys.typescale.headlineSmall.fontWeight,
  fontSize: vars.sys.typescale.headlineSmall.fontSize,
  lineHeight: vars.sys.typescale.headlineSmall.lineHeight,
  letterSpacing: vars.sys.typescale.headlineSmall.letterSpacing,
});
globalStyle(`${extLarge} svg`, { width: '32px', height: '32px' });

export const fab = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    overflow: 'hidden',
    border: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    boxShadow: vars.sys.elevation.level3,
    transition: `box-shadow 150ms ${vars.sys.motion.easing.standard}`,
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
      '&:hover': { boxShadow: vars.sys.elevation.level4 },
      '&:hover::before': { opacity: vars.sys.state.hover },
      '&:focus-visible::before': { opacity: vars.sys.state.focus },
      '&:active::before': { opacity: vars.sys.state.pressed },
      '&[data-pressed]::before': { opacity: vars.sys.state.pressed },
      // M3 discourages disabled FABs (material-web removed the state). When native
      // disabled is used, apply the same container/label tokens as filled buttons.
      '&:disabled, &[data-disabled]': {
        pointerEvents: 'none',
        boxShadow: 'none',
        background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
        color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
      },
      '&:disabled::before, &[data-disabled]::before': { opacity: 0 },
    },
  },
  variants: {
    // Geometry is applied via compoundVariants (size × variant); these keys
    // exist so the recipe accepts the resolver args.
    size: { small: {}, medium: {}, large: {} },
    variant: { standard: {}, extended: {} },
    color: {
      primary: {
        background: `rgb(${vars.sys.color.primaryContainer})`,
        color: `rgb(${vars.sys.color.onPrimaryContainer})`,
      },
      secondary: {
        background: `rgb(${vars.sys.color.secondaryContainer})`,
        color: `rgb(${vars.sys.color.onSecondaryContainer})`,
      },
      tertiary: {
        background: `rgb(${vars.sys.color.tertiaryContainer})`,
        color: `rgb(${vars.sys.color.onTertiaryContainer})`,
      },
    },
  },
  compoundVariants: [
    { variants: { size: 'small', variant: 'standard' }, style: stdSmall },
    { variants: { size: 'medium', variant: 'standard' }, style: stdMedium },
    { variants: { size: 'large', variant: 'standard' }, style: stdLarge },
    { variants: { size: 'small', variant: 'extended' }, style: extSmall },
    { variants: { size: 'medium', variant: 'extended' }, style: extMedium },
    { variants: { size: 'large', variant: 'extended' }, style: extLarge },
  ],
  defaultVariants: {
    size: 'small',
    variant: 'standard',
    color: 'primary',
  },
});
