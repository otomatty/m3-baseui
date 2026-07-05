/**
 * button.css.ts — vanilla-extract recipe for the M3 (Expressive) Button.
 *
 * Mirrors the Tailwind build: same DOM, same `data-*` state hooks. Colors are
 * channel triples, so every color value is wrapped in rgb(). The state layer is
 * a `::before` overlay tinted with currentColor whose opacity is switched by
 * Base UI's `data-*` state attributes.
 *
 * M3 Expressive: five sizes (XS 32 → XL 136 dp) drive height / horizontal
 * padding / gap / typescale / icon size; `shape` picks the resting corner
 * (round=full vs a size-specific square); the corner morphs smaller on press;
 * and toggle buttons (`toggle` on/off) swap to the opposite shape plus the
 * Selected/Unselected color set.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@m3-baseui/tokens/contract.css';

// Corner morph steps (PressedContainerShape) per size bucket.
const PRESSED_CORNER = {
  xs: vars.sys.shape.small, // 8dp
  s: vars.sys.shape.small,
  m: vars.sys.shape.medium, // 12dp
  l: vars.sys.shape.large, // 16dp
  xl: vars.sys.shape.large,
} as const;

// Resting square corner (ContainerShapeSquare) per size bucket.
const SQUARE_CORNER = {
  xs: vars.sys.shape.medium, // 12dp
  s: vars.sys.shape.medium,
  m: vars.sys.shape.large, // 16dp
  l: vars.sys.shape.extraLarge, // 28dp
  xl: vars.sys.shape.extraLarge,
} as const;

// Height / horizontal padding / gap / typescale per size. The pressed corner
// morph rides on `&[data-pressed]` / `&:active` here so its attribute-selector
// specificity wins over the resting `border-radius`. The icon (svg) sizing is a
// descendant rule, which VE forbids inside a recipe variant, so each size is a
// named style we target with globalStyle — same output as the Tailwind build.
function makeSize(
  size: keyof typeof PRESSED_CORNER,
  height: string,
  paddingInline: string,
  gap: string,
  type: (typeof vars.sys.typescale)['labelLarge'],
  iconPx: string,
) {
  const s = style({
    height,
    paddingInline,
    gap,
    fontFamily: type.fontFamily,
    fontWeight: type.fontWeight,
    fontSize: type.fontSize,
    lineHeight: type.lineHeight,
    letterSpacing: type.letterSpacing,
    selectors: {
      '&[data-pressed]': { borderRadius: PRESSED_CORNER[size] },
      '&:active': { borderRadius: PRESSED_CORNER[size] },
    },
  });
  globalStyle(`${s} [data-slot="button-icon"] > svg`, { width: iconPx, height: iconPx });
  return s;
}

const sizeXs = makeSize('xs', '32px', '16px', '8px', vars.sys.typescale.labelLarge, '20px');
const sizeS = makeSize('s', '40px', '16px', '8px', vars.sys.typescale.labelLarge, '20px');
const sizeM = makeSize('m', '56px', '24px', '8px', vars.sys.typescale.titleMedium, '24px');
const sizeL = makeSize('l', '96px', '48px', '12px', vars.sys.typescale.headlineSmall, '32px');
const sizeXl = makeSize('xl', '136px', '64px', '16px', vars.sys.typescale.headlineLarge, '40px');

// Resting square corner per size (round is a size-independent variant below).
const squareCompounds = (Object.keys(SQUARE_CORNER) as (keyof typeof SQUARE_CORNER)[]).map(
  (size) => ({
    variants: { shape: 'square', size } as { shape: 'square'; size: typeof size },
    style: { borderRadius: SQUARE_CORNER[size] },
  }),
);

// Selected shape morph: a selected toggle swaps to the opposite shape. Listed
// after the resting square corner so these win at equal specificity.
const selectedShapeCompounds = [
  ...(Object.keys(SQUARE_CORNER) as (keyof typeof SQUARE_CORNER)[]).map((size) => ({
    variants: { shape: 'round', toggle: 'on', size } as {
      shape: 'round';
      toggle: 'on';
      size: typeof size;
    },
    style: { borderRadius: SQUARE_CORNER[size] },
  })),
  ...(Object.keys(SQUARE_CORNER) as (keyof typeof SQUARE_CORNER)[]).map((size) => ({
    variants: { shape: 'square', toggle: 'on', size } as {
      shape: 'square';
      toggle: 'on';
      size: typeof size;
    },
    style: { borderRadius: vars.sys.shape.full },
  })),
];

export const button = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none',
    // Motion: Compose uses DefaultEffects (critically-damped spring, no bounce)
    // for shape/color/elevation — spring-effects-default here.
    transitionProperty: 'box-shadow, background-color, color, border-color, border-radius',
    transitionDuration: vars.sys.motion.duration.short4,
    transitionTimingFunction: vars.sys.motion.easing.springEffectsDefault,
    selectors: {
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        background: 'currentColor',
        opacity: 0,
        pointerEvents: 'none',
        transition: `opacity ${vars.sys.motion.duration.short2} ${vars.sys.motion.easing.standard}`,
      },
      '&:hover::before': { opacity: vars.sys.state.hover },
      '&:focus-visible::before': { opacity: vars.sys.state.focus },
      '&[data-pressed]::before': { opacity: vars.sys.state.pressed },
      '&:active::before': { opacity: vars.sys.state.pressed },
      // Disabled: no interaction, no state layer, no elevation. Per-variant
      // disabled colors (container on-surface/10, label on-surface-variant/38) below.
      '&[data-disabled]': { pointerEvents: 'none', boxShadow: 'none' },
      '&:disabled': { pointerEvents: 'none', boxShadow: 'none' },
      '&[data-disabled]::before': { opacity: 0 },
      '&:disabled::before': { opacity: 0 },
      '&:focus-visible': {
        outline: `3px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
    },
  },
  variants: {
    // M3 elevation per variant: filled/tonal rest level0→hover level1→pressed
    // level0; elevated rest level1→hover level2→pressed level1. Expressive
    // disabled: container on-surface/10, label on-surface-variant/38 — except
    // tonal, unchanged upstream (0.12 / on-surface). Expressive also moves
    // outlined/text labels to on-surface-variant and the outline to outline-variant.
    variant: {
      filled: {
        background: `rgb(${vars.sys.color.primary})`,
        color: `rgb(${vars.sys.color.onPrimary})`,
        selectors: {
          '&:hover': { boxShadow: vars.sys.elevation.level1 },
          '&:active': { boxShadow: vars.sys.elevation.level0 },
          '&[data-pressed]': { boxShadow: vars.sys.elevation.level0 },
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            color: `rgb(${vars.sys.color.onSurfaceVariant} / 0.38)`,
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            color: `rgb(${vars.sys.color.onSurfaceVariant} / 0.38)`,
          },
        },
      },
      tonal: {
        background: `rgb(${vars.sys.color.secondaryContainer})`,
        color: `rgb(${vars.sys.color.onSecondaryContainer})`,
        selectors: {
          '&:hover': { boxShadow: vars.sys.elevation.level1 },
          '&:active': { boxShadow: vars.sys.elevation.level0 },
          '&[data-pressed]': { boxShadow: vars.sys.elevation.level0 },
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.12)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
        },
      },
      outlined: {
        background: 'transparent',
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
        border: `1px solid rgb(${vars.sys.color.outlineVariant})`,
        selectors: {
          '&:disabled': {
            color: `rgb(${vars.sys.color.onSurfaceVariant} / 0.38)`,
            borderColor: `rgb(${vars.sys.color.outlineVariant})`,
          },
          '&[data-disabled]': {
            color: `rgb(${vars.sys.color.onSurfaceVariant} / 0.38)`,
            borderColor: `rgb(${vars.sys.color.outlineVariant})`,
          },
        },
      },
      elevated: {
        background: `rgb(${vars.sys.color.surfaceContainerLow})`,
        color: `rgb(${vars.sys.color.primary})`,
        boxShadow: vars.sys.elevation.level1,
        selectors: {
          '&:hover': { boxShadow: vars.sys.elevation.level2 },
          '&:active': { boxShadow: vars.sys.elevation.level1 },
          '&[data-pressed]': { boxShadow: vars.sys.elevation.level1 },
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            color: `rgb(${vars.sys.color.onSurfaceVariant} / 0.38)`,
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            color: `rgb(${vars.sys.color.onSurfaceVariant} / 0.38)`,
          },
        },
      },
      text: {
        background: 'transparent',
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
        selectors: {
          '&:disabled': { color: `rgb(${vars.sys.color.onSurfaceVariant} / 0.38)` },
          '&[data-disabled]': { color: `rgb(${vars.sys.color.onSurfaceVariant} / 0.38)` },
        },
      },
    },
    size: {
      xs: sizeXs,
      s: sizeS,
      m: sizeM,
      l: sizeL,
      xl: sizeXl,
    },
    // round = full pill; square corner is size-specific (compounds below).
    shape: {
      round: { borderRadius: vars.sys.shape.full },
      square: {},
    },
    // Toggle state; unset (plain button) matches no toggle compound.
    toggle: {
      on: {},
      off: {},
    },
  },
  compoundVariants: [
    ...squareCompounds,
    ...selectedShapeCompounds,
    // Outlined border width (OutlinedOutlineWidth: L 2 / XL 3 dp).
    {
      variants: { variant: 'outlined', size: 'l' } as { variant: 'outlined'; size: 'l' },
      style: { borderWidth: '2px' },
    },
    {
      variants: { variant: 'outlined', size: 'xl' } as { variant: 'outlined'; size: 'xl' },
      style: { borderWidth: '3px' },
    },
    // Toggle colors (Selected*/Unselected* tokens). filled/tonal: base = default
    // & selected look; `toggle:off` = unselected.
    {
      variants: { variant: 'filled', toggle: 'off' } as { variant: 'filled'; toggle: 'off' },
      style: {
        background: `rgb(${vars.sys.color.surfaceContainer})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
      },
    },
    {
      variants: { variant: 'tonal', toggle: 'off' } as { variant: 'tonal'; toggle: 'off' },
      style: {
        background: `rgb(${vars.sys.color.surfaceContainer})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
      },
    },
    {
      variants: { variant: 'elevated', toggle: 'on' } as { variant: 'elevated'; toggle: 'on' },
      style: {
        background: `rgb(${vars.sys.color.primary})`,
        color: `rgb(${vars.sys.color.onPrimary})`,
      },
    },
    {
      variants: { variant: 'elevated', toggle: 'off' } as { variant: 'elevated'; toggle: 'off' },
      style: {
        background: `rgb(${vars.sys.color.surfaceContainerLow})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
      },
    },
    {
      variants: { variant: 'outlined', toggle: 'on' } as { variant: 'outlined'; toggle: 'on' },
      style: {
        background: `rgb(${vars.sys.color.inverseSurface})`,
        color: `rgb(${vars.sys.color.inverseOnSurface})`,
        borderColor: 'transparent',
        selectors: {
          // Disabled + selected: faint on-surface/10 container, no outline.
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            borderColor: 'transparent',
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            borderColor: 'transparent',
          },
        },
      },
    },
    // text: no Selected/Unselected tokens exist upstream (TextButtonTokens), so
    // selection raises the label emphasis to primary (base = unselected
    // on-surface-variant) to communicate the toggle state.
    {
      variants: { variant: 'text', toggle: 'on' } as { variant: 'text'; toggle: 'on' },
      style: { color: `rgb(${vars.sys.color.primary})` },
    },
  ],
  defaultVariants: {
    variant: 'filled',
    size: 's',
    shape: 'round',
  },
});

// Icon slot: centered. The slot lives inside the button; VE forbids descendant
// selectors in a recipe, so target the (button-unique) data-slot globally —
// matching the Tailwind build's `[&_[data-slot=button-icon]]` rules. The icon
// *size* is set per-size via the makeSize globalStyle rules above.
globalStyle('[data-slot="button-icon"]', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});
