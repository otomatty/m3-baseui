/**
 * icon-button.ts — tailwind-variants resolver for the M3 Icon Button.
 *
 * 40×40 circular target with a centered icon. The `selected` variant supports
 * toggle icon buttons; when `selected` is undefined the variant's default
 * (filled/active) look is used. Emits the same DOM + ripple as the VE build.
 */
import { createIconButton } from '@m3/core';
import { tv } from 'tailwind-variants';

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

export const iconButton = tv({
  base: [
    'relative inline-flex items-center justify-center shrink-0',
    'rounded-full overflow-hidden cursor-pointer select-none border-0 bg-transparent',
    'transition-[box-shadow,background-color,color] duration-200 ease-standard',
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
    // (container on-surface/12, icon on-surface/38) live on each variant.
    'disabled:pointer-events-none disabled:before:opacity-0',
    'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0',
  ],
  variants: {
    // Disabled icon is on-surface/38 for every variant; filled/tonal disabled
    // container is on-surface/12; outlined disabled outline is on-surface/12
    // (material-web parity).
    variant: {
      standard: [
        'text-on-surface-variant',
        'disabled:text-on-surface/38 data-[disabled]:text-on-surface/38',
      ],
      filled: [
        'bg-primary text-on-primary',
        'disabled:bg-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
      tonal: [
        'bg-secondary-container text-on-secondary-container',
        'disabled:bg-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
      outlined: [
        'border border-outline text-on-surface-variant',
        'disabled:border-on-surface/12 disabled:text-on-surface/38',
        'data-[disabled]:border-on-surface/12 data-[disabled]:text-on-surface/38',
      ],
    },
    selected: {
      true: '',
      false: '',
    },
    // Container height + icon size per M3 Expressive size. Width comes from the
    // (size, width) compound variants below.
    size: {
      xs: 'h-8 [&>svg]:size-5',
      s: 'h-10 [&>svg]:size-6',
      m: 'h-14 [&>svg]:size-6',
      l: 'h-24 [&>svg]:size-8',
      xl: 'h-[136px] [&>svg]:size-10',
    },
    width: {
      narrow: '',
      default: '',
      wide: '',
    },
  },
  compoundVariants: [
    ...widthCompounds,
    { variant: 'standard', selected: true, class: 'text-primary' },
    { variant: 'filled', selected: false, class: 'bg-surface-container-highest text-primary' },
    {
      variant: 'tonal',
      selected: false,
      class: 'bg-surface-container-highest text-on-surface-variant',
    },
    {
      variant: 'outlined',
      selected: true,
      class: [
        'bg-inverse-surface text-inverse-on-surface border-transparent',
        // M3 disabled + selected: faint on-surface/12 container, no outline
        // (icon falls back to on-surface/38 from the variant). NOT transparent.
        'disabled:bg-on-surface/12 disabled:border-transparent',
        'data-[disabled]:bg-on-surface/12 data-[disabled]:border-transparent',
      ],
    },
  ],
  defaultVariants: {
    variant: 'standard',
    size: 's',
    width: 'default',
  },
});

export const IconButton = createIconButton(({ variant, selected, size, width }) =>
  iconButton({ variant, selected, size, width }),
);
export type { IconButtonProps, IconButtonVariant } from '@m3/core';
