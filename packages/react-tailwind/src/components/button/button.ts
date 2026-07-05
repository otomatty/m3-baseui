/**
 * button.ts — tailwind-variants resolver wired into the shared factory.
 *
 * Emits the same DOM and `data-*` state as the vanilla-extract build; only the
 * class strings differ. Utilities such as `bg-primary`, `text-on-primary`,
 * `rounded-full`, `shadow-level1`, and `text-label-large` are produced by the
 * Tailwind v4 `@theme` preset shipped in `@m3-baseui/tokens/theme.css`.
 *
 * M3 Expressive: five sizes (XS 32 → XL 136 dp) drive height / horizontal
 * padding / gap / typescale / icon size; `shape` picks the resting corner
 * (round=full pill vs a size-specific square), the corner morphs smaller on
 * press, and toggle buttons (`selected`) swap to the opposite shape plus the
 * Selected/Unselected color set. Opacity modifiers
 * (`before:opacity-[var(--md-sys-state-hover)]`) drive the state layer off the
 * channel-triple colors.
 */
import { createButton, toToggle } from '@m3-baseui/core';
import { tv } from '../../tv';

export const button = tv({
  base: [
    'relative inline-flex items-center justify-center',
    'overflow-hidden cursor-pointer select-none border-0',
    // Icon slot: centered; the svg size comes from the `size` variant.
    '[&_[data-slot=button-icon]]:inline-flex [&_[data-slot=button-icon]]:items-center [&_[data-slot=button-icon]]:justify-center',
    // Motion: Compose uses DefaultEffects (critically-damped spring, no bounce)
    // for the shape/color/elevation transitions — spring-effects-default here.
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
    // Disabled: no interaction, no state layer, no elevation. Per-variant
    // colors (container on-surface/10, label on-surface-variant/38) live on
    // each variant.
    'disabled:pointer-events-none disabled:shadow-none disabled:before:opacity-0',
    'data-[disabled]:pointer-events-none data-[disabled]:shadow-none data-[disabled]:before:opacity-0',
  ],
  variants: {
    // M3 elevation per variant: filled/tonal rest level0→hover level1→pressed level0;
    // elevated rest level1→hover level2→pressed level1. Expressive disabled:
    // container on-surface/10, label on-surface-variant/38 — except tonal, which
    // is unchanged upstream (FilledTonalButtonTokens v0_103) and keeps 0.12 /
    // on-surface. Expressive also moves outlined/text labels to on-surface-variant.
    variant: {
      filled: [
        'bg-primary text-on-primary',
        'hover:shadow-level1 focus-visible:shadow-none active:shadow-none data-[pressed]:shadow-none',
        'disabled:bg-on-surface/10 disabled:text-on-surface-variant/38',
        'data-[disabled]:bg-on-surface/10 data-[disabled]:text-on-surface-variant/38',
      ],
      tonal: [
        'bg-secondary-container text-on-secondary-container',
        'hover:shadow-level1 focus-visible:shadow-none active:shadow-none data-[pressed]:shadow-none',
        'disabled:bg-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
      outlined: [
        'bg-transparent text-on-surface-variant border border-outline-variant',
        // Compose outlinedButtonBorder(enabled=false) tints the outline with
        // DisabledContainerOpacity (0.1), so the disabled border is faint.
        'disabled:text-on-surface-variant/38 disabled:border-outline-variant/10',
        'data-[disabled]:text-on-surface-variant/38 data-[disabled]:border-outline-variant/10',
      ],
      elevated: [
        'bg-surface-container-low text-primary shadow-level1',
        'hover:shadow-level2 focus-visible:shadow-level1 active:shadow-level1 data-[pressed]:shadow-level1',
        'disabled:bg-on-surface/10 disabled:text-on-surface-variant/38',
        'data-[disabled]:bg-on-surface/10 data-[disabled]:text-on-surface-variant/38',
      ],
      text: [
        'bg-transparent text-on-surface-variant',
        'disabled:text-on-surface-variant/38',
        'data-[disabled]:text-on-surface-variant/38',
      ],
    },
    // Height / horizontal padding / gap / typescale / icon size per Expressive
    // size. The pressed corner morph (PressedContainerShape: XS·S small 8 /
    // M medium 12 / L·XL large 16) rides on data-[pressed]/active here so its
    // attribute-selector specificity wins over the resting `rounded-*`.
    size: {
      xs: [
        // XS is special-cased in Compose Button.kt: contentPaddingFor returns
        // ExtraSmallContentPadding (12dp) and iconSpacingFor returns
        // ExtraSmallIconSpacing (4dp) — tighter than the ButtonXSmallTokens
        // Leading/TrailingSpace (16) and IconLabelSpace (8). S–XL use their tokens.
        'h-8 px-3 gap-1 text-label-large [&_[data-slot=button-icon]>svg]:size-5',
        'data-[pressed]:rounded-small active:rounded-small',
      ],
      s: [
        'h-10 px-4 gap-2 text-label-large [&_[data-slot=button-icon]>svg]:size-5',
        'data-[pressed]:rounded-small active:rounded-small',
      ],
      m: [
        'h-14 px-6 gap-2 text-title-medium [&_[data-slot=button-icon]>svg]:size-6',
        'data-[pressed]:rounded-medium active:rounded-medium',
      ],
      l: [
        'h-24 px-12 gap-3 text-headline-small [&_[data-slot=button-icon]>svg]:size-8',
        'data-[pressed]:rounded-large active:rounded-large',
      ],
      xl: [
        'h-[136px] px-16 gap-4 text-headline-large [&_[data-slot=button-icon]>svg]:size-10',
        'data-[pressed]:rounded-large active:rounded-large',
      ],
    },
    // round = full pill; the square corner is size-specific (compounds below).
    shape: {
      round: 'rounded-full',
      square: '',
    },
    // Toggle state, string-keyed so a plain (non-toggle) button — `toggle`
    // unset — fires neither compound below (a boolean variant would default to
    // `off` in tailwind-variants and wrongly apply the unselected look).
    toggle: {
      on: '',
      off: '',
    },
  },
  compoundVariants: [
    // ---- Resting square corner (ContainerShapeSquare) ---------------------
    { shape: 'square', size: 'xs', class: 'rounded-medium' }, // 12dp
    { shape: 'square', size: 's', class: 'rounded-medium' }, // 12dp
    { shape: 'square', size: 'm', class: 'rounded-large' }, // 16dp
    { shape: 'square', size: 'l', class: 'rounded-extra-large' }, // 28dp
    { shape: 'square', size: 'xl', class: 'rounded-extra-large' }, // 28dp
    // ---- Selected shape morph: swap to the opposite shape -----------------
    // (listed after the resting corner so tailwind-merge keeps these).
    { shape: 'round', toggle: 'on', size: 'xs', class: 'rounded-medium' },
    { shape: 'round', toggle: 'on', size: 's', class: 'rounded-medium' },
    { shape: 'round', toggle: 'on', size: 'm', class: 'rounded-large' },
    { shape: 'round', toggle: 'on', size: 'l', class: 'rounded-extra-large' },
    { shape: 'round', toggle: 'on', size: 'xl', class: 'rounded-extra-large' },
    { shape: 'square', toggle: 'on', size: 'xs', class: 'rounded-full' },
    { shape: 'square', toggle: 'on', size: 's', class: 'rounded-full' },
    { shape: 'square', toggle: 'on', size: 'm', class: 'rounded-full' },
    { shape: 'square', toggle: 'on', size: 'l', class: 'rounded-full' },
    { shape: 'square', toggle: 'on', size: 'xl', class: 'rounded-full' },
    // ---- Outlined border width (OutlinedOutlineWidth: L 2 / XL 3 dp) ------
    { variant: 'outlined', size: 'l', class: 'border-2' },
    { variant: 'outlined', size: 'xl', class: 'border-[3px]' },
    // ---- Toggle colors (Selected*/Unselected* tokens) ---------------------
    // filled/tonal: base = default & selected look; `toggle:off` = unselected.
    { variant: 'filled', toggle: 'off', class: 'bg-surface-container text-on-surface-variant' },
    { variant: 'tonal', toggle: 'off', class: 'bg-surface-container text-on-surface-variant' },
    // elevated: distinct selected (primary) & unselected looks.
    { variant: 'elevated', toggle: 'on', class: 'bg-primary text-on-primary' },
    {
      variant: 'elevated',
      toggle: 'off',
      class: 'bg-surface-container-low text-on-surface-variant',
    },
    // outlined: selected fills with the inverse surface (base = unselected).
    {
      variant: 'outlined',
      toggle: 'on',
      class: [
        'bg-inverse-surface text-inverse-on-surface border-transparent',
        'disabled:bg-on-surface/10 disabled:border-transparent',
        'data-[disabled]:bg-on-surface/10 data-[disabled]:border-transparent',
      ],
    },
    // text: no Selected/Unselected tokens exist upstream (TextButtonTokens),
    // so selection raises the label emphasis to primary (base = unselected
    // on-surface-variant) to communicate the toggle state.
    { variant: 'text', toggle: 'on', class: 'text-primary' },
  ],
  defaultVariants: {
    variant: 'filled',
    size: 's',
    shape: 'round',
  },
});

export const Button = createButton(({ variant, size, shape, selected }) =>
  button({ variant, size, shape, toggle: toToggle(selected) }),
);
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonShape } from '@m3-baseui/core';
