/**
 * split-button.ts — tailwind-variants slots for the M3 SplitButton.
 *
 * Two 40dp surfaces joined by a 2dp seam: the leading primary-action button
 * keeps its outer (start) corner full and reduces the seam (end) corner; the
 * trailing menu trigger mirrors it. Both share the variant container color. The
 * trigger carries `group` so the default chevron can rotate via Base UI's
 * `data-[popup-open]`. The dropdown reuses the M3 menu surface. State layer is
 * the `::before` overlay; the pointer ripple is added by the factory. Same DOM
 * as the VE build.
 */
import { createSplitButton } from '@m3-baseui/core';
import { tv } from './tv';

// Shared surface base for both the leading + trailing buttons.
const surface = [
  'relative inline-flex items-center justify-center h-10 overflow-hidden cursor-pointer select-none border-0 outline-none',
  'text-label-large',
  'transition-[background-color,color,border-color] duration-200 ease-standard',
  'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
  'hover:before:opacity-[var(--md-sys-state-hover)]',
  'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
  'active:before:opacity-[var(--md-sys-state-pressed)]',
  'data-[pressed]:before:opacity-[var(--md-sys-state-pressed)]',
  'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary',
  'disabled:pointer-events-none disabled:before:opacity-0',
  'data-[disabled]:pointer-events-none data-[disabled]:before:opacity-0',
];

// Per-variant container colors (identical on both surfaces). M3 disabled is
// per-token (container on-surface/12, label on-surface/38), not a blanket fade.
const VARIANT_FILLED = [
  'bg-primary text-on-primary',
  'disabled:bg-on-surface/12 disabled:text-on-surface/38',
  'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
];
const VARIANT_TONAL = [
  'bg-secondary-container text-on-secondary-container',
  'disabled:bg-on-surface/12 disabled:text-on-surface/38',
  'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38',
];
const VARIANT_OUTLINED = [
  'bg-transparent text-primary border border-outline',
  'disabled:text-on-surface/38 disabled:border-on-surface/12',
  'data-[disabled]:text-on-surface/38 data-[disabled]:border-on-surface/12',
];
const VARIANT_ELEVATED = [
  'bg-surface-container-low text-primary shadow-level1',
  'disabled:bg-on-surface/12 disabled:text-on-surface/38 disabled:shadow-none',
  'data-[disabled]:bg-on-surface/12 data-[disabled]:text-on-surface/38 data-[disabled]:shadow-none',
];
const VARIANT_TEXT = [
  'bg-transparent text-primary',
  'disabled:text-on-surface/38',
  'data-[disabled]:text-on-surface/38',
];

export const splitButtonTv = tv({
  slots: {
    group: 'inline-flex items-center gap-0.5',
    // leading: outer (start) corner full, seam (end) corner reduced.
    leading: [...surface, 'gap-2 px-6 rounded-s-full rounded-e-small'],
    // trailing: seam (start) corner reduced, outer (end) corner full.
    trailing: [...surface, 'group gap-1 px-3 rounded-s-small rounded-e-full'],
    chevron: [
      'inline-flex items-center justify-center shrink-0 [&>svg]:size-[18px]',
      'transition-transform duration-200 ease-standard group-data-[popup-open]:rotate-180',
    ],
    popup: [
      'min-w-[112px] max-w-[280px] py-2',
      'bg-surface-container text-on-surface rounded-extra-small shadow-level2',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0',
      'focus:outline-none',
    ],
    item: [
      'relative flex items-center gap-3 h-12 px-3 overflow-hidden cursor-pointer select-none outline-none',
      'text-label-large text-on-surface',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'data-[disabled]:text-on-surface/[0.38] data-[disabled]:before:opacity-0 data-[disabled]:pointer-events-none',
    ],
  },
  variants: {
    variant: {
      filled: { leading: VARIANT_FILLED, trailing: VARIANT_FILLED },
      tonal: { leading: VARIANT_TONAL, trailing: VARIANT_TONAL },
      outlined: { leading: VARIANT_OUTLINED, trailing: VARIANT_OUTLINED },
      elevated: { leading: VARIANT_ELEVATED, trailing: VARIANT_ELEVATED },
      text: { leading: VARIANT_TEXT, trailing: VARIANT_TEXT },
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export const SplitButton = createSplitButton({
  group: splitButtonTv().group(),
  leading: (variant) => splitButtonTv({ variant }).leading(),
  trailing: (variant) => splitButtonTv({ variant }).trailing(),
  chevron: splitButtonTv().chevron(),
  popup: splitButtonTv().popup(),
  item: splitButtonTv().item(),
});
