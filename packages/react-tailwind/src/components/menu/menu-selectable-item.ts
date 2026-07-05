/**
 * menu-selectable-item.ts — shared M3 selectable menu row tokens.
 *
 * Select.Item and Menu CheckboxItem / RadioItem share secondary-container fill,
 * position-based selected shapes (issue #98), and the 24dp leading indicator column.
 */
import { tv } from '../../tv';

/** State layer on selectable rows (hover / highlighted / pressed). */
export const menuSelectableItemStateLayer = [
  'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
  'hover:before:opacity-[var(--md-sys-state-hover)]',
  'data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]',
  'active:before:opacity-[var(--md-sys-state-pressed)]',
] as const;

/** M3 selectable row fill when selected or checked. */
export const menuSelectableItemSelectedFill = [
  'data-[selected]:bg-secondary-container data-[selected]:text-on-secondary-container',
  'data-[checked]:bg-secondary-container data-[checked]:text-on-secondary-container',
] as const;

/** M3 MenuDefaults.itemShape — corner radii on the selected/checked container. */
export const menuSelectableItemPositionShape = [
  'data-[selected]:data-[position=only]:rounded-extra-small',
  'data-[selected]:data-[position=first]:rounded-t-extra-small',
  'data-[selected]:data-[position=middle]:rounded-none',
  'data-[selected]:data-[position=last]:rounded-b-extra-small',
  'data-[checked]:data-[position=only]:rounded-extra-small',
  'data-[checked]:data-[position=first]:rounded-t-extra-small',
  'data-[checked]:data-[position=middle]:rounded-none',
  'data-[checked]:data-[position=last]:rounded-b-extra-small',
] as const;

export const menuSelectableItemDisabled = [
  'data-[disabled]:text-on-surface/[0.38] data-[disabled]:before:opacity-0 data-[disabled]:pointer-events-none',
] as const;

export const menuSelectableItemBase = [
  'group relative cursor-pointer select-none outline-none text-label-large text-on-surface',
  'h-12 px-3 overflow-hidden',
  ...menuSelectableItemStateLayer,
  ...menuSelectableItemSelectedFill,
  ...menuSelectableItemPositionShape,
  ...menuSelectableItemDisabled,
] as const;

export const menuSelectableItemTv = tv({
  slots: {
    /** Select row: check + label + optional trailing meta. */
    selectItem: ['grid grid-cols-[24px_1fr_auto] items-center gap-3', ...menuSelectableItemBase],
    /** Menu checkbox / radio row: check + label. */
    menuSelectableItem: ['grid grid-cols-[24px_1fr] items-center gap-3', ...menuSelectableItemBase],
    itemIndicator: [
      'inline-flex items-center justify-center text-on-surface',
      'invisible group-data-[selected]:visible group-data-[checked]:visible',
      'group-data-[selected]:text-on-secondary-container group-data-[checked]:text-on-secondary-container',
      'group-data-[disabled]:text-on-surface/[0.38]',
    ],
  },
});

export const menuSelectableItem = menuSelectableItemTv();
