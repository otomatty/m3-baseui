/**
 * bottom-sheet.ts — tailwind-variants slots for the M3 Bottom sheet.
 *
 * A `surface-container-low` surface docked to the bottom edge with extra-large
 * (28dp) top corners, elevation 1, and a 32×4dp drag handle. The scrim fades on
 * Base UI's data-[starting-style] / data-[ending-style]; the popup slides via the
 * drawer's `--drawer-swipe-movement-y` so the swipe gesture tracks the finger.
 * Same DOM + `data-*` as the VE build.
 */
import { createBottomSheet } from '@m3-baseui/core';
import { tv } from './tv';

export const bottomSheetTv = tv({
  slots: {
    backdrop: [
      'fixed inset-0 z-40 bg-scrim/32',
      'transition-opacity duration-300 ease-emphasized',
      'data-[swiping]:transition-none',
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
    ],
    viewport: 'fixed inset-0 z-50 flex items-end justify-center',
    popup: [
      'box-border w-full max-w-[640px] max-h-[calc(100dvh-56px)]',
      'overflow-y-auto overscroll-contain touch-auto outline-none',
      'pb-6 bg-surface-container-low text-on-surface rounded-t-extra-large shadow-level1',
      '[transform:translateY(var(--drawer-swipe-movement-y))]',
      'transition-transform duration-300 ease-emphasized',
      'data-[swiping]:select-none',
      'data-[starting-style]:[transform:translateY(100%)] data-[ending-style]:[transform:translateY(100%)]',
    ],
    handle: 'mx-auto mt-4 mb-2 h-1 w-8 shrink-0 rounded-full bg-on-surface-variant/40',
    title: ['m-0 px-6 pt-2 text-title-large text-on-surface'],
    description: ['m-0 px-6 pt-1 text-body-medium text-on-surface-variant'],
  },
});

const s = bottomSheetTv();
export const BottomSheet = createBottomSheet({
  backdrop: s.backdrop(),
  viewport: s.viewport(),
  popup: s.popup(),
  handle: s.handle(),
  title: s.title(),
  description: s.description(),
});
export type { BottomSheetVariant } from '@m3-baseui/core';
