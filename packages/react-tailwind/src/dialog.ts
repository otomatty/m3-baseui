/**
 * dialog.ts — Tailwind classes for the M3 Dialog (basic + fullscreen).
 *
 * Scrim backdrop + a surface popup with an emphasized fade/scale transition off
 * Base UI's data-[starting-style] / data-[ending-style] attributes. The basic
 * variant is a centered surface-container-high card (extra-large corners,
 * elevation 3, 280–560dp wide); the `fullscreen` variant is an edge-to-edge
 * `surface` with a header row + divider. An optional centered hero icon
 * (`data-slot="dialog-icon"`) center-aligns the headline/supporting text.
 */
import { createDialog } from '@m3-baseui/core';
import { tv } from './tv';

export const dialogTv = tv({
  slots: {
    backdrop: [
      'fixed inset-0 z-40 bg-scrim/32',
      'transition-opacity duration-200 ease-standard',
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
    ],
    popup: [
      'fixed z-50 box-border overflow-auto flex flex-col text-on-surface focus:outline-none',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-200 ease-emphasized',
      // Icon present → center the headline + supporting text (M3 hero icon).
      'has-[[data-slot=dialog-icon]]:text-center',
    ],
    // Fullscreen header row: leading close icon + title (grows, but shrinks +
    // ellipsizes instead of pushing the trailing action off-screen) + action.
    header: [
      'flex items-center gap-2 px-2 h-14 shrink-0',
      '[&>*:nth-child(2)]:grow [&>*:nth-child(2)]:min-w-0 [&>*:nth-child(2)]:overflow-hidden [&>*:nth-child(2)]:text-ellipsis [&>*:nth-child(2)]:whitespace-nowrap',
    ],
    // Centered 24dp hero icon in the secondary color.
    icon: ['inline-flex self-center text-secondary'],
    title: ['text-headline-small text-on-surface m-0'],
    description: ['text-body-medium text-on-surface-variant m-0'],
    // 1dp outline-variant rule under the fullscreen header.
    divider: ['h-px w-full bg-outline-variant shrink-0 m-0 border-0'],
    // End-aligned action row: 8dp between buttons; the popup gap (16dp) + mt-2
    // (8dp) totals the 24dp M3 spacing above the actions.
    actions: ['flex justify-end items-center gap-2 mt-2'],
    close: ['inline-flex'],
  },
  variants: {
    fullscreen: {
      false: {
        popup: [
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-[min(560px,calc(100vw-48px))] min-w-[280px] max-h-[calc(100vh-48px)]',
          'p-6 gap-4 rounded-extra-large bg-surface-container-high shadow-level3',
          'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
          'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
        ],
      },
      true: {
        popup: [
          'inset-0 w-screen h-screen max-w-none rounded-none bg-surface',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        ],
      },
    },
  },
  defaultVariants: {
    fullscreen: false,
  },
});

const d = dialogTv();
export const Dialog = createDialog({
  backdrop: d.backdrop(),
  popup: ({ fullscreen }) => dialogTv({ fullscreen }).popup(),
  header: d.header(),
  icon: d.icon(),
  title: d.title(),
  description: d.description(),
  divider: d.divider(),
  actions: d.actions(),
  close: d.close(),
});
