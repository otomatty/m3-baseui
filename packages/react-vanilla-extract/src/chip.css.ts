/**
 * chip.css.ts — vanilla-extract recipe for the M3 Chip.
 * Same DOM + data-* hooks as the Tailwind build.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3/tokens/contract.css';

/**
 * Leading checkmark for filter chips. Kept mounted but collapsed (width 0,
 * -8px margin cancels the flex gap); the filter variant reveals it when the
 * root is pressed/selected, matching material-web.
 */
export const check = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  height: '18px',
  width: 0,
  marginLeft: '-8px',
  opacity: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  transition: `width 150ms ${vars.sys.motion.easing.standard}, margin 150ms ${vars.sys.motion.easing.standard}, opacity 150ms ${vars.sys.motion.easing.standard}`,
});

export const chip = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxSizing: 'border-box',
    height: '32px',
    paddingInline: '16px',
    borderRadius: '8px',
    overflow: 'hidden',
    userSelect: 'none',
    border: `1px solid rgb(${vars.sys.color.outline})`,
    background: 'transparent',
    fontFamily: vars.sys.typescale.labelLarge.fontFamily,
    fontWeight: vars.sys.typescale.labelLarge.fontWeight,
    fontSize: vars.sys.typescale.labelLarge.fontSize,
    lineHeight: vars.sys.typescale.labelLarge.lineHeight,
    letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
    transition: `background-color 150ms ${vars.sys.motion.easing.standard}, border-color 150ms ${vars.sys.motion.easing.standard}`,
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
      '&:focus-visible': {
        outline: `3px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
      // M3 disabled: label on-surface/38, outline on-surface/12; no state layer.
      '&[data-disabled], &:disabled': {
        pointerEvents: 'none',
        color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
        borderColor: `rgb(${vars.sys.color.onSurface} / 0.12)`,
      },
      '&[data-disabled]::before, &:disabled::before': { opacity: 0 },
    },
  },
  variants: {
    variant: {
      assist: { color: `rgb(${vars.sys.color.onSurface})`, cursor: 'pointer' },
      suggestion: { color: `rgb(${vars.sys.color.onSurfaceVariant})`, cursor: 'pointer' },
      input: {
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
        cursor: 'default',
        paddingRight: '8px',
      },
      filter: {
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
        cursor: 'pointer',
        selectors: {
          '&[data-pressed]': {
            background: `rgb(${vars.sys.color.secondaryContainer})`,
            color: `rgb(${vars.sys.color.onSecondaryContainer})`,
            borderColor: 'transparent',
          },
          // M3 disabled + selected: faint on-surface/12 container
          '&[data-pressed][data-disabled], &[data-pressed]:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
          },
        },
      },
    },
    // M3 elevated: filled surface-container-low + elevation level1→level2 on hover,
    // no outline. Disabled drops the shadow.
    elevated: {
      true: {
        background: `rgb(${vars.sys.color.surfaceContainerLow})`,
        borderColor: 'transparent',
        boxShadow: vars.sys.elevation.level1,
        selectors: {
          '&:hover': { boxShadow: vars.sys.elevation.level2 },
          '&:active': { boxShadow: vars.sys.elevation.level1 },
          '&[data-disabled], &:disabled': { boxShadow: 'none' },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'assist',
  },
});

// Reveal the leading checkmark when a filter chip is selected. The check slot is
// only rendered for filter chips, so scoping to a pressed ancestor is safe — and
// VE can't reference the recipe class, so this is a globalStyle on the check.
globalStyle(`[data-pressed] ${check}`, { width: '18px', marginLeft: 0, opacity: 1 });

// M3 leading avatar: 24dp circle; negative margin trims the leading padding to 4dp.
export const avatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '24px',
  height: '24px',
  marginLeft: '-12px',
  borderRadius: vars.sys.shape.full,
  overflow: 'hidden',
  background: `rgb(${vars.sys.color.primaryContainer})`,
  color: `rgb(${vars.sys.color.onPrimaryContainer})`,
});

globalStyle(`${avatar} > img`, { width: '100%', height: '100%', objectFit: 'cover' });

export const remove = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '18px',
  height: '18px',
  marginLeft: '4px',
  marginRight: '-4px',
  border: 'none',
  borderRadius: vars.sys.shape.full,
  background: 'transparent',
  color: `rgb(${vars.sys.color.onSurfaceVariant})`,
  cursor: 'pointer',
  selectors: {
    '&:hover': { opacity: 0.8 },
  },
});
