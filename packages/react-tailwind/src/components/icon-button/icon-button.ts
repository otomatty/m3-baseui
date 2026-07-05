/**
 * icon-button.ts — tailwind-variants resolver for the M3 (Expressive) Icon Button.
 *
 * Emits the same DOM + `data-*` state as the vanilla-extract build (drop-in
 * compatible); only the class strings differ. The `rounded-<role>` corner
 * utilities come from the Tailwind v4 `@theme` preset in
 * `@m3-baseui/tokens/theme.css`; the configured `tv` helper teaches
 * tailwind-merge to dedupe them so a morph override drops the resting corner.
 *
 * M3 Expressive: five sizes (XS 32 → XL 136 dp) drive height / icon size and
 * (with `width`) the container width; `shape` picks the resting corner
 * (round=full circle vs a size-specific square), the corner morphs smaller on
 * press, and toggle buttons (`selected`) swap to the opposite shape
 * (round↔square) plus the Selected/Unselected color set.
 */
import { createIconButton, toToggle } from '@m3-baseui/core';
import { tv } from '../../tv';

// M3 Expressive container widths (px) per size × width. Tailwind v4's dynamic
// spacing scale resolves any integer (e.g. w-13 = 52px, w-46 = 184px).
const WIDTHS = {
  xs: { narrow: 'w-7', default: 'w-8', wide: 'w-10' }, // 28 / 32 / 40
  s: { narrow: 'w-8', default: 'w-10', wide: 'w-13' }, // 32 / 40 / 52
  m: { narrow: 'w-12', default: 'w-14', wide: 'w-18' }, // 48 / 56 / 72
  l: { narrow: 'w-16', default: 'w-24', wide: 'w-32' }, // 64 / 96 / 128
  xl: { narrow: 'w-26', default: 'w-34', wide: 'w-46' }, // 104 / 136 / 184
} as const;

const widthCompounds = Object.entries(WIDTHS).flatMap(([size, w]) =>
  Object.entries(w).map(([width, klass]) => ({
    size: size as keyof typeof WIDTHS,
    width: width as 'narrow' | 'default' | 'wide',
    class: klass,
  })),
);

// Resting square corner (ContainerShapeSquare) per size bucket.
const SQUARE_CORNER = {
  xs: 'rounded-medium', // 12dp
  s: 'rounded-medium', // 12dp
  m: 'rounded-large', // 16dp
  l: 'rounded-extra-large', // 28dp
  xl: 'rounded-extra-large', // 28dp
} as const;

// Resting square corner: `shape: square` maps to the size-specific corner.
const squareShapeCompounds = (Object.keys(SQUARE_CORNER) as (keyof typeof SQUARE_CORNER)[]).map(
  (size) => ({ shape: 'square' as const, size, class: SQUARE_CORNER[size] }),
);

// Selected shape morph (Expressive's signature behavior). Listed after the
// resting corner so tailwind-merge keeps these: a selected `round` container
// morphs to the square corner; a selected `square` container morphs to `full`.
const selectedShapeCompounds = [
  ...(Object.keys(SQUARE_CORNER) as (keyof typeof SQUARE_CORNER)[]).map((size) => ({
    shape: 'round' as const,
    toggle: 'on' as const,
    size,
    class: SQUARE_CORNER[size],
  })),
  ...(Object.keys(SQUARE_CORNER) as (keyof typeof SQUARE_CORNER)[]).map((size) => ({
    shape: 'square' as const,
    toggle: 'on' as const,
    size,
    class: 'rounded-full',
  })),
];

export const iconButton = tv({
  base: [
    'relative inline-flex items-center justify-center shrink-0',
    // No `overflow-hidden`: it would clip the 48dp touch target on small sizes.
    // The state layer is already rounded (before:rounded-[inherit]); the ripple
    // self-clips.
    'rounded-full cursor-pointer select-none border-0 bg-transparent',
    // Motion: Compose uses DefaultEffects (critically-damped spring, no bounce)
    // for the shape/color transitions — spring-effects-default here.
    'transition-[box-shadow,background-color,color,border-color,border-radius] duration-200 ease-spring-effects-default',
    // State layer overlay
    'before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:pointer-events-none',
    'before:transition-opacity before:duration-100',
    'hover:before:opacity-[var(--md-sys-state-hover)]',
    'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
    'active:before:opacity-[var(--md-sys-state-pressed)]',
    'data-[pressed]:before:opacity-[var(--md-sys-state-pressed)]',
    // Focus ring (M3: 3px secondary, 2px offset)
    'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
    // Disabled: no interaction, no state layer. Per-variant disabled colors
    // (container on-surface/10, icon on-surface/38) live on each variant.
    'disabled:pointer-events-none disabled:before:opacity-0',
    'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0',
  ],
  variants: {
    // Disabled icon is on-surface/38 for every variant; filled/tonal disabled
    // container is on-surface/10 (DisabledContainerOpacity); outlined disabled
    // outline stays outline-variant (Expressive DisabledOutlineColor).
    variant: {
      standard: [
        'text-on-surface-variant',
        'disabled:text-on-surface/38 data-[disabled]:text-on-surface/38',
      ],
      filled: [
        'bg-primary text-on-primary',
        'disabled:bg-on-surface/10 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/10 data-[disabled]:text-on-surface/38',
      ],
      tonal: [
        'bg-secondary-container text-on-secondary-container',
        'disabled:bg-on-surface/10 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/10 data-[disabled]:text-on-surface/38',
      ],
      outlined: [
        'border border-outline-variant text-on-surface-variant',
        'disabled:border-outline-variant disabled:text-on-surface/38',
        'data-[disabled]:border-outline-variant data-[disabled]:text-on-surface/38',
      ],
    },
    // Toggle state, string-keyed so a plain (non-toggle) button — `toggle`
    // unset — fires neither compound below (a boolean variant would default to
    // `off` in tailwind-variants and wrongly apply the unselected look).
    toggle: {
      on: '',
      off: '',
    },
    // Container height + icon size per M3 Expressive size. Width comes from the
    // (size, width) compound variants below. The pressed corner morph
    // (PressedContainerShape: XS·S small 8 / M medium 12 / L·XL large 16) rides
    // on data-[pressed]/active so its attribute-selector specificity wins over
    // the resting `rounded-*`.
    size: {
      xs: 'h-8 [&>svg]:size-5 data-[pressed]:rounded-small active:rounded-small',
      s: 'h-10 [&>svg]:size-6 data-[pressed]:rounded-small active:rounded-small',
      m: 'h-14 [&>svg]:size-6 data-[pressed]:rounded-medium active:rounded-medium',
      l: 'h-24 [&>svg]:size-8 data-[pressed]:rounded-large active:rounded-large',
      xl: 'h-[136px] [&>svg]:size-10 data-[pressed]:rounded-large active:rounded-large',
    },
    width: {
      narrow: '',
      default: '',
      wide: '',
    },
    // round = full circle; the square corner is size-specific (compounds below).
    shape: {
      round: 'rounded-full',
      square: '',
    },
  },
  compoundVariants: [
    ...widthCompounds,
    ...squareShapeCompounds,
    ...selectedShapeCompounds,
    // ---- Outlined border width (OutlinedOutlineWidth: L 2 / XL 3 dp) ------
    { variant: 'outlined', size: 'l', class: 'border-2' },
    { variant: 'outlined', size: 'xl', class: 'border-[3px]' },
    // ---- Toggle colors (Selected*/Unselected* tokens) ---------------------
    // standard: unselected = on-surface-variant (base); selected = primary.
    { variant: 'standard', toggle: 'on', class: 'text-primary' },
    // filled: base = default & selected look (primary/on-primary); unselected =
    // surface-container + on-surface-variant (was surface-container-highest+primary).
    {
      variant: 'filled',
      toggle: 'off',
      class: 'bg-surface-container text-on-surface-variant',
    },
    // tonal: base = default & unselected look (secondary-container); selected =
    // secondary + on-secondary (was left at the variant default — the "selection
    // not visible" bug this issue fixes).
    { variant: 'tonal', toggle: 'on', class: 'bg-secondary text-on-secondary' },
    // outlined: selected fills with the inverse surface (base = unselected).
    {
      variant: 'outlined',
      toggle: 'on',
      class: [
        'bg-inverse-surface text-inverse-on-surface border-transparent',
        // M3 disabled + selected: faint on-surface/10 container, no outline
        // (icon falls back to on-surface/38 from the variant). NOT transparent.
        'disabled:bg-on-surface/10 disabled:border-transparent',
        'data-[disabled]:bg-on-surface/10 data-[disabled]:border-transparent',
      ],
    },
  ],
  defaultVariants: {
    variant: 'standard',
    size: 's',
    width: 'default',
    shape: 'round',
  },
});

export const IconButton = createIconButton(({ variant, selected, size, width, shape }) =>
  iconButton({ variant, size, width, shape, toggle: toToggle(selected) }),
);
export type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
  IconButtonWidth,
  IconButtonShape,
} from '@m3-baseui/core';
