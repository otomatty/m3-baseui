/**
 * side-sheet.css.ts — vanilla-extract styles for the M3 Side sheet.
 * Same DOM + `data-*` hooks as the Tailwind build: a full-height 320dp
 * surface-container-low surface anchored to a side edge (read from Base UI's
 * `data-swipe-direction`). `modal` floats at elevation 1 with the leading edge
 * rounded large; `standard` sits flush. The popup slides via the drawer's
 * `--drawer-swipe-movement-x` so the swipe gesture tracks the finger.
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 40,
  background: `rgb(${vars.sys.color.scrim} / 0.32)`,
  transition: `opacity 300ms ${vars.sys.motion.easing.emphasized}`,
  selectors: {
    '&[data-swiping]': { transition: 'none' },
    '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
  },
});

export const viewport = style({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  display: 'flex',
  alignItems: 'stretch',
});

export const popup = recipe({
  base: {
    boxSizing: 'border-box',
    height: '100%',
    width: '320px',
    maxWidth: 'calc(100vw - 56px)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    touchAction: 'auto',
    outline: 'none',
    background: `rgb(${vars.sys.color.surfaceContainerLow})`,
    color: `rgb(${vars.sys.color.onSurface})`,
    transform: 'translateX(var(--drawer-swipe-movement-x))',
    transition: `transform 300ms ${vars.sys.motion.easing.emphasized}`,
    selectors: {
      '&[data-swiping]': { userSelect: 'none' },
      '&[data-swipe-direction="right"]': { marginLeft: 'auto' },
      '&[data-swipe-direction="left"]': { marginRight: 'auto' },
      '&[data-swipe-direction="right"][data-starting-style], &[data-swipe-direction="right"][data-ending-style]':
        { transform: 'translateX(100%)' },
      '&[data-swipe-direction="left"][data-starting-style], &[data-swipe-direction="left"][data-ending-style]':
        { transform: 'translateX(-100%)' },
    },
  },
  variants: {
    variant: {
      modal: {
        boxShadow: vars.sys.elevation.level1,
        selectors: {
          '&[data-swipe-direction="right"]': {
            borderTopLeftRadius: vars.sys.shape.large,
            borderBottomLeftRadius: vars.sys.shape.large,
          },
          '&[data-swipe-direction="left"]': {
            borderTopRightRadius: vars.sys.shape.large,
            borderBottomRightRadius: vars.sys.shape.large,
          },
        },
      },
      standard: { boxShadow: 'none' },
    },
  },
  defaultVariants: {
    variant: 'modal',
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minHeight: '56px',
  paddingInline: '16px',
  paddingBlock: '8px',
});

export const title = style({
  flex: 1,
  margin: 0,
  color: `rgb(${vars.sys.color.onSurface})`,
  fontFamily: vars.sys.typescale.titleLarge.fontFamily,
  fontWeight: vars.sys.typescale.titleLarge.fontWeight,
  fontSize: vars.sys.typescale.titleLarge.fontSize,
  lineHeight: vars.sys.typescale.titleLarge.lineHeight,
  letterSpacing: vars.sys.typescale.titleLarge.letterSpacing,
});

export const description = style({
  margin: 0,
  paddingInline: '24px',
  paddingBottom: '16px',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  fontFamily: vars.sys.typescale.bodyMedium.fontFamily,
  fontWeight: vars.sys.typescale.bodyMedium.fontWeight,
  fontSize: vars.sys.typescale.bodyMedium.fontSize,
  lineHeight: vars.sys.typescale.bodyMedium.lineHeight,
  letterSpacing: vars.sys.typescale.bodyMedium.letterSpacing,
});

export const close = style({
  display: 'inline-flex',
  flexShrink: 0,
});
