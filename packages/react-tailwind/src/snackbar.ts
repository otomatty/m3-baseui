/**
 * snackbar.ts — tailwind-variants slots for the M3 Snackbar.
 *
 * Inverse-surface container, extra-small corners, elevation level3. The Action
 * is an inverse-primary text button with a state layer + ripple. Enter/exit key
 * off Toast's `data-starting-style` / `data-ending-style`. Same DOM as VE.
 */
import { createSnackbar } from '@m3-baseui/core';
import { tv } from 'tailwind-variants';

export { useSnackbar } from '@m3-baseui/core';

export const snackbarTv = tv({
  slots: {
    viewport: [
      'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
      // M3 container width: cap at 672dp, clamp to the viewport on small screens.
      'flex flex-col gap-2 w-[calc(100vw-32px)] max-w-[672px]',
    ],
    root: [
      'relative flex items-center gap-2 min-h-12 box-border pl-4 pr-2 py-2',
      // M3 container width follows content within min 344dp / max 672dp. The
      // min is clamped by 100% so it never overflows a narrower viewport.
      'w-fit min-w-[min(344px,100%)] max-w-[672px]',
      'rounded-extra-small bg-inverse-surface text-inverse-on-surface shadow-level3',
      'text-body-medium',
      'transition-[opacity,transform] duration-200 ease-emphasized',
      'data-[starting-style]:opacity-0 data-[starting-style]:translate-y-2',
      'data-[ending-style]:opacity-0',
    ],
    content: 'flex flex-col flex-1 min-w-0 gap-0.5',
    title: 'text-body-medium',
    description: 'text-body-medium',
    action: [
      'relative inline-flex items-center justify-center shrink-0 h-9 px-3 overflow-hidden',
      'rounded-extra-small bg-transparent border-0 cursor-pointer outline-none',
      'text-inverse-primary text-label-large',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
    ],
    close: [
      'relative inline-flex items-center justify-center shrink-0 size-8 rounded-full overflow-hidden',
      'bg-transparent border-0 cursor-pointer text-inverse-on-surface outline-none',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'data-[pressed]:before:opacity-[var(--md-sys-state-pressed)]',
    ],
  },
});

const s = snackbarTv();
export const Snackbar = createSnackbar({
  viewport: s.viewport(),
  root: s.root(),
  content: s.content(),
  title: s.title(),
  description: s.description(),
  action: s.action(),
  close: s.close(),
});
