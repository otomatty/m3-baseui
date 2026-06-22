/**
 * fab.css.ts — vanilla-extract recipe for the M3 FAB.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3/tokens/contract.css';

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
      '&:disabled': { opacity: 0.38, pointerEvents: 'none', boxShadow: 'none' },
    },
  },
  variants: {
    size: {
      small: {
        width: '40px',
        height: '40px',
        borderRadius: vars.sys.shape.medium,
        selectors: { '& svg': { width: '24px', height: '24px' } },
      },
      regular: {
        width: '56px',
        height: '56px',
        borderRadius: vars.sys.shape.large,
        selectors: { '& svg': { width: '24px', height: '24px' } },
      },
      large: {
        width: '96px',
        height: '96px',
        borderRadius: vars.sys.shape.extraLarge,
        selectors: { '& svg': { width: '36px', height: '36px' } },
      },
      extended: {
        height: '56px',
        minWidth: '80px',
        paddingInline: '16px',
        gap: '12px',
        borderRadius: vars.sys.shape.large,
        fontFamily: vars.sys.typescale.labelLarge.fontFamily,
        fontWeight: vars.sys.typescale.labelLarge.fontWeight,
        fontSize: vars.sys.typescale.labelLarge.fontSize,
        lineHeight: vars.sys.typescale.labelLarge.lineHeight,
        letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
        selectors: { '& svg': { width: '24px', height: '24px' } },
      },
    },
    color: {
      surface: {
        background: `rgb(${vars.sys.color.surfaceContainerHigh})`,
        color: `rgb(${vars.sys.color.primary})`,
      },
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
  defaultVariants: {
    size: 'regular',
    color: 'surface',
  },
});
