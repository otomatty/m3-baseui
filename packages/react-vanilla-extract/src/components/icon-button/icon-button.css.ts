/**
 * icon-button.css.ts — vanilla-extract recipe for the M3 (Expressive) Icon Button.
 * Mirrors the Tailwind build: same DOM, same data-* state hooks.
 *
 * M3 Expressive: five sizes (XS 32 → XL 136 dp) drive height / icon size and
 * (with `width`) the container width; `shape` picks the resting corner
 * (round=full circle vs a size-specific square); the corner morphs smaller on
 * press; and toggle buttons (`toggle` on/off) swap to the opposite shape
 * (round↔square) plus the Selected/Unselected color set.
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

// Container height + icon size per M3 Expressive size. The pressed corner morph
// rides on `&[data-pressed]` / `&:active` here so its attribute-selector
// specificity wins over the resting `border-radius`. The icon (svg) sizing is a
// descendant rule, which VE forbids inside a recipe variant, so each size is a
// named style we target with globalStyle — same output as the Tailwind build.
function makeSize(size: keyof typeof PRESSED_CORNER, height: string, iconPx: string) {
  const s = style({
    height,
    selectors: {
      '&[data-pressed]': { borderRadius: PRESSED_CORNER[size] },
      '&:active': { borderRadius: PRESSED_CORNER[size] },
    },
  });
  globalStyle(`${s} > svg`, { width: iconPx, height: iconPx });
  return s;
}

const sizeXs = makeSize('xs', '32px', '20px');
const sizeS = makeSize('s', '40px', '24px');
const sizeM = makeSize('m', '56px', '24px');
const sizeL = makeSize('l', '96px', '32px');
const sizeXl = makeSize('xl', '136px', '40px');

// M3 Expressive container widths per size × width.
const WIDTHS = {
  xs: { narrow: '28px', default: '32px', wide: '40px' },
  s: { narrow: '32px', default: '40px', wide: '52px' },
  m: { narrow: '48px', default: '56px', wide: '72px' },
  l: { narrow: '64px', default: '96px', wide: '128px' },
  xl: { narrow: '104px', default: '136px', wide: '184px' },
} as const;

const widthCompounds = Object.entries(WIDTHS).flatMap(([size, w]) =>
  Object.entries(w).map(([width, value]) => ({
    variants: { size, width } as {
      size: keyof typeof WIDTHS;
      width: 'narrow' | 'default' | 'wide';
    },
    style: { width: value },
  })),
);

// Resting square corner per size (round is a size-independent variant below).
const squareCompounds = (Object.keys(SQUARE_CORNER) as (keyof typeof SQUARE_CORNER)[]).map(
  (size) => ({
    variants: { shape: 'square', size } as { shape: 'square'; size: typeof size },
    style: { borderRadius: SQUARE_CORNER[size] },
  }),
);

// Selected shape morph (Expressive's signature behavior). Listed after the
// resting square corner so these win at equal specificity: a selected `round`
// container swaps to the square corner; a selected `square` container swaps to `full`.
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

export const iconButton = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: 'none',
    background: 'transparent',
    borderRadius: vars.sys.shape.full,
    // No `overflow: hidden`: it would clip the 48dp touch target on small sizes.
    // The state layer is already rounded (border-radius: inherit); ripple self-clips.
    cursor: 'pointer',
    userSelect: 'none',
    color: `rgb(${vars.sys.color.onSurfaceVariant})`,
    // Motion: Compose uses DefaultEffects (critically-damped spring, no bounce)
    // for the shape/color transitions — spring-effects-default here.
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
      // Disabled: no interaction, no state layer. Per-variant disabled colors
      // (container on-surface/10, icon on-surface/38) live on each variant.
      '&[data-disabled]': { pointerEvents: 'none' },
      '&:disabled': { pointerEvents: 'none' },
      '&[data-disabled]::before': { opacity: 0 },
      '&:disabled::before': { opacity: 0 },
      '&:focus-visible': {
        outline: `3px solid rgb(${vars.sys.color.secondary})`,
        outlineOffset: '2px',
      },
    },
  },
  variants: {
    // Disabled icon is on-surface/38 for every variant; filled/tonal disabled
    // container is on-surface/10 (DisabledContainerOpacity); outlined disabled
    // outline stays outline-variant (Expressive DisabledOutlineColor).
    variant: {
      standard: {
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
        selectors: {
          '&:disabled': { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
          '&[data-disabled]': { color: `rgb(${vars.sys.color.onSurface} / 0.38)` },
        },
      },
      filled: {
        background: `rgb(${vars.sys.color.primary})`,
        color: `rgb(${vars.sys.color.onPrimary})`,
        selectors: {
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
        },
      },
      tonal: {
        background: `rgb(${vars.sys.color.secondaryContainer})`,
        color: `rgb(${vars.sys.color.onSecondaryContainer})`,
        selectors: {
          '&:disabled': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
          '&[data-disabled]': {
            background: `rgb(${vars.sys.color.onSurface} / 0.1)`,
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
          },
        },
      },
      outlined: {
        border: `1px solid rgb(${vars.sys.color.outlineVariant})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
        selectors: {
          // Expressive DisabledOutlineColor = OutlineVariant (unchanged from enabled).
          '&:disabled': {
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
            borderColor: `rgb(${vars.sys.color.outlineVariant})`,
          },
          '&[data-disabled]': {
            color: `rgb(${vars.sys.color.onSurface} / 0.38)`,
            borderColor: `rgb(${vars.sys.color.outlineVariant})`,
          },
        },
      },
    },
    // Toggle state; unset (plain button) matches no toggle compound.
    toggle: {
      on: {},
      off: {},
    },
    // Container height + icon size per M3 Expressive size; width comes from the
    // (size, width) compound variants below.
    size: {
      xs: sizeXs,
      s: sizeS,
      m: sizeM,
      l: sizeL,
      xl: sizeXl,
    },
    width: {
      narrow: {},
      default: {},
      wide: {},
    },
    // round = full circle; square corner is size-specific (compounds below).
    shape: {
      round: { borderRadius: vars.sys.shape.full },
      square: {},
    },
  },
  compoundVariants: [
    ...widthCompounds,
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
    // Toggle colors (Selected*/Unselected* tokens).
    // standard: unselected = on-surface-variant (base); selected = primary.
    {
      variants: { variant: 'standard', toggle: 'on' } as { variant: 'standard'; toggle: 'on' },
      style: { color: `rgb(${vars.sys.color.primary})` },
    },
    // filled: base = default & selected look (primary/on-primary); unselected =
    // surface-container + on-surface-variant.
    {
      variants: { variant: 'filled', toggle: 'off' } as { variant: 'filled'; toggle: 'off' },
      style: {
        background: `rgb(${vars.sys.color.surfaceContainer})`,
        color: `rgb(${vars.sys.color.onSurfaceVariant})`,
      },
    },
    // tonal: base = default & unselected look (secondary-container); selected =
    // secondary + on-secondary (fixes the "selection not visible" bug).
    {
      variants: { variant: 'tonal', toggle: 'on' } as { variant: 'tonal'; toggle: 'on' },
      style: {
        background: `rgb(${vars.sys.color.secondary})`,
        color: `rgb(${vars.sys.color.onSecondary})`,
      },
    },
    // outlined: selected fills with the inverse surface (base = unselected).
    {
      variants: { variant: 'outlined', toggle: 'on' } as { variant: 'outlined'; toggle: 'on' },
      style: {
        background: `rgb(${vars.sys.color.inverseSurface})`,
        color: `rgb(${vars.sys.color.inverseOnSurface})`,
        borderColor: 'transparent',
        selectors: {
          // M3 disabled + selected: faint on-surface/10 container, no outline
          // (icon falls back to on-surface/38 from the variant). NOT transparent.
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
  ],
  defaultVariants: {
    variant: 'standard',
    size: 's',
    width: 'default',
    shape: 'round',
  },
});
