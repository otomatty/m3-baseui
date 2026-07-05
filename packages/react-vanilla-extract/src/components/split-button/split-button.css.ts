/**
 * split-button.css.ts — vanilla-extract styles for the M3 SplitButton.
 * Same DOM + `data-*` hooks as the Tailwind build: two 40dp surfaces joined by
 * a 2dp seam (facing corners reduced to the `small` token), sharing the variant
 * container color; the default chevron rotates while the menu is open
 * (`data-popup-open`); the dropdown reuses the M3 menu surface.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

export const group = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
});

const labelLarge = {
  fontFamily: vars.sys.typescale.labelLarge.fontFamily,
  fontWeight: vars.sys.typescale.labelLarge.fontWeight,
  fontSize: vars.sys.typescale.labelLarge.fontSize,
  lineHeight: vars.sys.typescale.labelLarge.lineHeight,
  letterSpacing: vars.sys.typescale.labelLarge.letterSpacing,
} as const;

// Shared surface (state layer + focus ring + disabled) for both buttons.
const surfaceSelectors = {
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
  '&[data-pressed]::before': { opacity: vars.sys.state.pressed },
  '&:focus-visible': {
    outline: `3px solid rgb(${vars.sys.color.secondary})`,
    outlineOffset: '2px',
  },
  '&:disabled, &[data-disabled]': { pointerEvents: 'none' },
  '&:disabled::before, &[data-disabled]::before': { opacity: 0 },
} as const;

const surfaceBase = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  overflow: 'hidden',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  ...labelLarge,
  // Seam corners morph on hover/press, so `border-radius` joins the transition,
  // driven by the M3 Expressive effects (shape) spring.
  transitionProperty: 'background-color, color, border-color, border-radius',
  transitionDuration: vars.sys.motion.duration.springEffectsDefault,
  transitionTimingFunction: vars.sys.motion.easing.springEffectsDefault,
} as const;

// leading: outer (start) corner full, seam (end) corner extra-small (4dp) which
// morphs to medium (12dp) on hover/press. Padding 16dp outer / 12dp seam.
export const leadingBase = style({
  ...surfaceBase,
  gap: '8px',
  paddingInlineStart: '16px',
  paddingInlineEnd: '12px',
  borderStartStartRadius: vars.sys.shape.full,
  borderEndStartRadius: vars.sys.shape.full,
  borderStartEndRadius: vars.sys.shape.extraSmall,
  borderEndEndRadius: vars.sys.shape.extraSmall,
  selectors: {
    ...surfaceSelectors,
    '&:hover, &[data-pressed]': {
      borderStartEndRadius: vars.sys.shape.medium,
      borderEndEndRadius: vars.sys.shape.medium,
    },
  },
});

// trailing: seam (start) corner extra-small (morphs to medium on hover/press),
// outer (end) corner full; the whole button becomes a full circle while the menu
// is open (data-popup-open). Padding 13dp each side.
export const trailingBase = style({
  ...surfaceBase,
  gap: '4px',
  paddingInline: '13px',
  borderStartStartRadius: vars.sys.shape.extraSmall,
  borderEndStartRadius: vars.sys.shape.extraSmall,
  borderStartEndRadius: vars.sys.shape.full,
  borderEndEndRadius: vars.sys.shape.full,
  selectors: {
    ...surfaceSelectors,
    // The seam morphs to medium on hover/press — but NOT while the menu is open,
    // where the whole button is a full circle. The explicit `:not([data-popup-open])`
    // guard (rather than relying on declaration order) makes open win over hover and
    // matches the Tailwind build for drop-in parity.
    '&:hover:not([data-popup-open]), &[data-pressed]:not([data-popup-open])': {
      borderStartStartRadius: vars.sys.shape.medium,
      borderEndStartRadius: vars.sys.shape.medium,
    },
    '&[data-popup-open]': { borderRadius: vars.sys.shape.full },
  },
});

// Per-variant container color (identical on both surfaces). M3 disabled is
// per-token (container on-surface/0.12, label on-surface/0.38), not a fade.
const onSurface12 = `rgb(${vars.sys.color.onSurface} / 0.12)`;
const onSurface38 = `rgb(${vars.sys.color.onSurface} / 0.38)`;
const disabledFill = {
  '&:disabled': { background: onSurface12, color: onSurface38 },
  '&[data-disabled]': { background: onSurface12, color: onSurface38 },
} as const;

const variants = {
  filled: {
    background: `rgb(${vars.sys.color.primary})`,
    color: `rgb(${vars.sys.color.onPrimary})`,
    selectors: { ...disabledFill },
  },
  tonal: {
    background: `rgb(${vars.sys.color.secondaryContainer})`,
    color: `rgb(${vars.sys.color.onSecondaryContainer})`,
    selectors: { ...disabledFill },
  },
  outlined: {
    background: 'transparent',
    color: `rgb(${vars.sys.color.primary})`,
    border: `1px solid rgb(${vars.sys.color.outline})`,
    selectors: {
      '&:disabled': { color: onSurface38, borderColor: onSurface12 },
      '&[data-disabled]': { color: onSurface38, borderColor: onSurface12 },
    },
  },
  elevated: {
    background: `rgb(${vars.sys.color.surfaceContainerLow})`,
    color: `rgb(${vars.sys.color.primary})`,
    boxShadow: vars.sys.elevation.level1,
    selectors: {
      '&:disabled': { background: onSurface12, color: onSurface38, boxShadow: 'none' },
      '&[data-disabled]': { background: onSurface12, color: onSurface38, boxShadow: 'none' },
    },
  },
} as const;

export const leading = recipe({ base: leadingBase, variants: { variant: variants } });
export const trailing = recipe({ base: trailingBase, variants: { variant: variants } });

// Default chevron: rotates 180° while the trigger's menu is open.
export const chevron = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: `transform ${vars.sys.motion.duration.springSpatialDefault} ${vars.sys.motion.easing.springSpatialDefault}`,
  selectors: {
    [`${trailingBase}[data-popup-open] &`]: { transform: 'rotate(180deg)' },
  },
});
// M3 Small TrailingIconSize = 22dp.
globalStyle(`${chevron} > svg`, { width: '22px', height: '22px' });

// Dropdown surface (same as the M3 Menu surface).
export const popup = style({
  minWidth: '112px',
  maxWidth: '280px',
  paddingBlock: '8px',
  background: `rgb(${vars.sys.color.surfaceContainer})`,
  color: `rgb(${vars.sys.color.onSurface})`,
  borderRadius: vars.sys.shape.extraSmall,
  boxShadow: vars.sys.elevation.level2,
  transformOrigin: 'var(--transform-origin)',
  outline: 'none',
  transition: `opacity 150ms ${vars.sys.motion.easing.standard}, transform 150ms ${vars.sys.motion.easing.standard}`,
  selectors: {
    '&[data-starting-style], &[data-ending-style]': { opacity: 0, transform: 'scale(0.95)' },
  },
});

export const item = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  height: '48px',
  paddingInline: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  color: `rgb(${vars.sys.color.onSurface})`,
  ...labelLarge,
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
    '&[data-highlighted]::before': { opacity: vars.sys.state.hover },
    '&:active::before': { opacity: vars.sys.state.pressed },
    '&[data-disabled]': { color: onSurface38, pointerEvents: 'none' },
    '&[data-disabled]::before': { opacity: 0 },
  },
});
