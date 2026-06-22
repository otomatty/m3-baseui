/**
 * menu.ts — Tailwind classes for the M3 Menu.
 *
 * surface-container popup (elevation 2, extra-small corners); 48dp items with a
 * `before:` state layer keyed to hover + Base UI's data-[highlighted]. Same DOM
 * + ripple as the VE build.
 */
import { createMenu } from '@m3/core';
import { tv } from 'tailwind-variants';

export const menuTv = tv({
  slots: {
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
      'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
    ],
    separator: ['my-2 h-px border-0 bg-outline-variant'],
    groupLabel: ['px-3 py-2 text-label-small text-on-surface-variant'],
  },
});

const m = menuTv();
export const Menu = createMenu({
  popup: m.popup(),
  item: m.item(),
  separator: m.separator(),
  groupLabel: m.groupLabel(),
});
