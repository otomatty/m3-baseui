/**
 * menu.contract.ts — slot classes for the M3 Menu.
 */
export interface MenuClasses {
  popup: string;
  item: string;
  separator: string;
  groupLabel: string;
  /** Submenu trigger: an item that opens a nested menu (trailing chevron). */
  submenuTrigger: string;
  /** Checkbox menu item: item with a 24dp leading indicator column. */
  checkboxItem: string;
  /** Radio menu item: item with a 24dp leading indicator column. */
  radioItem: string;
  /** Leading check/dot indicator inside a checkbox/radio item. */
  itemIndicator: string;
}
