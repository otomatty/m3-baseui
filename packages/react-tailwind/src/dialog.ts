/**
 * dialog.ts — Tailwind classes for the M3 basic Dialog.
 *
 * Scrim backdrop + centered surface-container-high popup (extra-large corners,
 * elevation 3) with an emphasized fade/scale transition off Base UI's
 * data-[starting-style] / data-[ending-style] attributes.
 */
import { createDialog } from '@m3/core';
import { tv } from './tv';

export const dialogTv = tv({
  slots: {
    backdrop: [
      'fixed inset-0 z-40 bg-scrim/32',
      'transition-opacity duration-200 ease-standard',
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
    ],
    popup: [
      'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
      'w-[min(560px,calc(100vw-48px))] max-h-[calc(100vh-48px)] overflow-auto',
      'bg-surface-container-high text-on-surface rounded-extra-large shadow-level3',
      'p-6 flex flex-col gap-4',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-200 ease-emphasized',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
      'focus:outline-none',
    ],
    title: ['text-headline-small text-on-surface m-0'],
    description: ['text-body-medium text-on-surface-variant m-0'],
    close: ['inline-flex'],
  },
});

const d = dialogTv();
export const Dialog = createDialog({
  backdrop: d.backdrop(),
  popup: d.popup(),
  title: d.title(),
  description: d.description(),
  close: d.close(),
});
