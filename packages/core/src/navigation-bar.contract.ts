/**
 * navigation-bar.contract.ts — slot classes for the M3 NavigationBar.
 *
 * Selection is managed by Base UI `ToggleGroup` (single-select); each item is a
 * `Toggle` whose selected state surfaces as `data-pressed`. The active indicator
 * pill, icon and label colors all key off that attribute (read via the `group`
 * on each item). One string per slot keeps both engines drop-in compatible.
 */
export interface NavigationBarClasses {
  /** ToggleGroup — the bar container. */
  root: string;
  /** Toggle — one destination (also carries the `group` hook). */
  item: string;
  /** Relative wrapper holding the indicator pill + icon. */
  iconWrap: string;
  /** The active-indicator pill behind the icon. */
  indicator: string;
  /** Icon slot. */
  icon: string;
  /** Text label below the icon. */
  label: string;
}
