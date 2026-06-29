/**
 * search.contract.ts — slot classes for the M3 Search (search bar + view).
 *
 * Built on Base UI Combobox: the InputGroup is the resting search bar (pill),
 * the Popup is the docked search view holding the suggestion list. Both engines
 * resolve the same slots so the DOM + `data-*` stay drop-in compatible.
 */
export interface SearchClasses {
  /** The resting search bar: pill container holding leading icon + input. */
  bar: string;
  /** Leading search icon column (24dp). */
  icon: string;
  /** The text input inside the bar. */
  input: string;
  /** Trailing clear ("×") button. */
  clear: string;
  /** Docked search view surface (suggestion list container). */
  popup: string;
  /** Scrollable suggestion list. */
  list: string;
  /** A suggestion row (state layer on hover / highlighted / selected). */
  item: string;
  /** Leading icon / trailing check column inside a suggestion row. */
  itemIndicator: string;
  /** Empty state ("no results") row. */
  empty: string;
  /** Group separator. */
  separator: string;
  /** Group label. */
  groupLabel: string;
}
