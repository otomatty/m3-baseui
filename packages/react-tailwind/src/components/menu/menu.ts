/**
 * menu.ts — Tailwind classes for the M3 Menu.
 *
 * surface-container popup (elevation 2, extra-small corners); 48dp items with a
 * `before:` state layer keyed to hover + Base UI's data-[highlighted]. Selectable
 * checkbox/radio rows share menu-selectable-item tokens with Select. Same DOM
 * + ripple as the VE build.
 */
import { createMenu } from '@m3-baseui/core';
import { tv } from '../../tv';
import { menuSelectableItem } from './menu-selectable-item';
import { menuSurfaceTv } from './menu-surface';

const surface = menuSurfaceTv({ width: 'standard', scroll: 'none' });
const selectable = menuSelectableItem;

export const menuTv = tv({
  slots: {
    popup: surface.popup(),
    item: [
      'relative flex items-center gap-3 h-12 px-3 overflow-hidden cursor-pointer select-none outline-none',
      'text-label-large text-on-surface',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      // M3 disabled (per-token, not a blanket fade): label + leading/trailing
      // icon on-surface/0.38, no state layer.
      'data-[disabled]:text-on-surface/[0.38] data-[disabled]:before:opacity-0 data-[disabled]:pointer-events-none',
      'data-[disabled]:[&_[data-slot=menu-leading]]:text-on-surface/[0.38] data-[disabled]:[&_[data-slot=menu-trailing]]:text-on-surface/[0.38]',
      // M3 leading icon (24dp) + trailing supporting text (shortcut/meta).
      '[&_[data-slot=menu-leading]]:inline-flex [&_[data-slot=menu-leading]]:text-on-surface-variant [&_[data-slot=menu-leading]>svg]:size-6',
      '[&_[data-slot=menu-trailing]]:ml-auto [&_[data-slot=menu-trailing]]:pl-4 [&_[data-slot=menu-trailing]]:text-label-large [&_[data-slot=menu-trailing]]:text-on-surface-variant',
    ],
    separator: ['my-2 h-px border-0 bg-outline-variant'],
    groupLabel: surface.groupLabel(),
    // Submenu trigger: item look + trailing chevron, highlighted while open.
    submenuTrigger: [
      'relative flex items-center justify-between gap-3 h-12 px-3 overflow-hidden cursor-pointer select-none outline-none',
      'text-label-large text-on-surface',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
      'data-[popup-open]:before:opacity-[var(--md-sys-state-hover)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      // M3 disabled (per-token): label + leading icon on-surface/0.38, no state layer.
      'data-[disabled]:text-on-surface/[0.38] data-[disabled]:before:opacity-0 data-[disabled]:pointer-events-none',
      'data-[disabled]:[&_[data-slot=menu-leading]]:text-on-surface/[0.38]',
      '[&_[data-slot=menu-leading]]:inline-flex [&_[data-slot=menu-leading]]:text-on-surface-variant [&_[data-slot=menu-leading]>svg]:size-6',
    ],
    checkboxItem: selectable.menuSelectableItem(),
    radioItem: selectable.menuSelectableItem(),
    itemIndicator: selectable.itemIndicator(),
  },
});

const m = menuTv();
export const Menu = createMenu({
  popup: m.popup(),
  item: m.item(),
  separator: m.separator(),
  groupLabel: m.groupLabel(),
  submenuTrigger: m.submenuTrigger(),
  checkboxItem: m.checkboxItem(),
  radioItem: m.radioItem(),
  itemIndicator: m.itemIndicator(),
});
