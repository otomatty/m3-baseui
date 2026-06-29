/**
 * side-sheet.ts — tailwind-variants slots for the M3 Side sheet.
 *
 * A full-height 320dp `surface-container-low` surface anchored to a side edge.
 * `modal` floats at elevation 1 with the leading edge rounded large (16dp);
 * `standard` sits flush (no elevation). The anchored side is read from Base UI's
 * `data-swipe-direction` on the popup, so one resolver covers both left + right.
 * The popup slides via `--drawer-swipe-movement-x` so the swipe gesture tracks
 * the finger. Same DOM + `data-*` as the VE build.
 */
import { createSideSheet } from '@m3-baseui/core';
import { tv } from './tv';

export const sideSheetTv = tv({
  slots: {
    backdrop: [
      'fixed inset-0 z-40 bg-scrim/32',
      'transition-opacity duration-300 ease-emphasized',
      'data-[swiping]:transition-none',
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
    ],
    viewport: 'fixed inset-0 z-50 flex items-stretch',
    popup: [
      'box-border h-full w-[320px] max-w-[calc(100vw-56px)]',
      'flex flex-col overflow-y-auto overscroll-contain touch-auto outline-none',
      'bg-surface-container-low text-on-surface',
      'data-[swipe-direction=right]:ml-auto data-[swipe-direction=left]:mr-auto',
      '[transform:translateX(var(--drawer-swipe-movement-x))]',
      'transition-transform duration-300 ease-emphasized',
      'data-[swiping]:select-none',
      'data-[swipe-direction=right]:data-[starting-style]:[transform:translateX(100%)]',
      'data-[swipe-direction=right]:data-[ending-style]:[transform:translateX(100%)]',
      'data-[swipe-direction=left]:data-[starting-style]:[transform:translateX(-100%)]',
      'data-[swipe-direction=left]:data-[ending-style]:[transform:translateX(-100%)]',
    ],
    header: 'flex items-center gap-2 min-h-14 px-4 py-2',
    title: ['flex-1 m-0 text-title-large text-on-surface'],
    description: ['m-0 px-6 pb-4 text-body-medium text-on-surface-variant'],
    close: 'inline-flex shrink-0',
  },
  variants: {
    variant: {
      modal: {
        popup: [
          'shadow-level1',
          'data-[swipe-direction=right]:rounded-s-large data-[swipe-direction=left]:rounded-e-large',
        ],
      },
      standard: { popup: 'shadow-none' },
    },
  },
  defaultVariants: {
    variant: 'modal',
  },
});

const s = sideSheetTv();
export const SideSheet = createSideSheet({
  backdrop: s.backdrop(),
  viewport: s.viewport(),
  popup: ({ variant }) => sideSheetTv({ variant }).popup(),
  header: s.header(),
  title: s.title(),
  description: s.description(),
  close: s.close(),
});
export type { SideSheetVariant, SideSheetSide } from '@m3-baseui/core';
