/**
 * chip.ts — tailwind-variants slots for the M3 Chip.
 *
 * 32dp tall, 8dp corners, label-large. The state layer reacts to hover/focus/
 * press (not the persistent toggle `data-pressed`, which a filter chip uses for
 * its selected fill). Emits the same DOM + ripple as the VE build.
 */
import { createChip } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

export const chipTv = tv({
  slots: {
    root: [
      'group relative inline-flex items-center justify-center gap-2 box-border',
      // No `overflow-hidden`: it would clip the 48dp touch target. The state
      // layer is rounded to match instead (before:rounded-[inherit]); the ripple
      // self-clips.
      'h-8 px-4 rounded-[8px] select-none border bg-transparent text-label-large',
      // M3 with-icon padding: the icon side trims to 8dp (label side stays 16dp).
      'data-[with-leading-icon]:pl-2',
      'transition-colors duration-150 ease-standard',
      'before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
      // M3 disabled: label on-surface/38, outline on-surface/12; no state layer.
      'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0',
      'disabled:pointer-events-none disabled:before:opacity-0',
      'data-[disabled]:text-on-surface/38 data-[disabled]:border-on-surface/12',
      'disabled:text-on-surface/38 disabled:border-on-surface/12',
    ],
    remove: [
      'inline-flex items-center justify-center shrink-0 size-[18px] -mr-1 ml-1 rounded-full border-0 bg-transparent',
      'text-on-surface-variant cursor-pointer hover:opacity-80',
    ],
    check: [
      'inline-flex items-center justify-center shrink-0 h-[18px] w-0 -ml-2 opacity-0 overflow-hidden pointer-events-none',
      'transition-all duration-150 ease-standard',
      'group-data-[pressed]:w-[18px] group-data-[pressed]:ml-0 group-data-[pressed]:opacity-100',
    ],
    // M3 leading avatar: 24dp circle; negative margin trims the leading padding to 4dp.
    avatar: [
      'inline-flex items-center justify-center shrink-0 size-6 -ml-3 rounded-full overflow-hidden',
      'bg-primary-container text-on-primary-container',
      '[&>img]:size-full [&>img]:object-cover',
    ],
    // M3 leading icon: 18dp; negative margin trims the leading padding to 8dp.
    icon: [
      'inline-flex items-center justify-center shrink-0 size-[18px] -ml-2',
      '[&>svg]:size-full',
      'group-disabled:text-on-surface/38 group-data-[disabled]:text-on-surface/38',
    ],
  },
  variants: {
    variant: {
      assist: {
        root: 'border-outline text-on-surface cursor-pointer',
        icon: 'text-primary',
      },
      suggestion: {
        root: 'border-outline text-on-surface-variant cursor-pointer',
        icon: 'text-on-surface-variant',
      },
      input: {
        root: 'border-outline text-on-surface-variant cursor-default pr-2',
        icon: 'text-on-surface-variant',
      },
      filter: {
        root: [
          'border-outline text-on-surface-variant cursor-pointer',
          'data-[pressed]:bg-secondary-container data-[pressed]:text-on-secondary-container data-[pressed]:border-transparent',
          // M3 disabled + selected: faint on-surface/12 container
          'data-[pressed]:data-[disabled]:bg-on-surface/12 data-[pressed]:disabled:bg-on-surface/12',
        ],
        icon: 'text-on-surface-variant group-data-[pressed]:hidden',
      },
    },
    // M3 elevated: filled surface-container-low + elevation level1→level2 on hover,
    // no outline. Disabled drops the shadow.
    elevated: {
      true: {
        root: [
          'bg-surface-container-low border-transparent shadow-level1',
          'hover:shadow-level2 active:shadow-level1',
          'disabled:shadow-none data-[disabled]:shadow-none',
        ],
      },
    },
  },
  defaultVariants: {
    variant: 'assist',
  },
});

export const Chip = createChip(({ variant, elevated }) => {
  const c = chipTv({ variant, elevated });
  return {
    root: c.root(),
    remove: c.remove(),
    check: c.check(),
    avatar: c.avatar(),
    icon: c.icon(),
  };
});
export type { ChipProps, ChipVariant } from '@m3-baseui/core';
