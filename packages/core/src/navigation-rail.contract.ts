/**
 * navigation-rail.contract.ts — slot classes for the M3 NavigationRail.
 *
 * The vertical counterpart of the NavigationBar (medium-window navigation).
 * Selection is managed by Base UI `ToggleGroup` (single-select); each item is a
 * `Toggle` whose selected state surfaces as `data-pressed`, driving the active
 * indicator pill + the icon/label colors (read via the `group` on each item).
 * `Root` also renders an optional leading `header` region (menu button / FAB).
 * One class string per slot keeps both engines drop-in compatible.
 */
export interface NavigationRailClasses {
  /** ToggleGroup — the rail container. */
  root: string;
  /** Leading header region (menu icon + FAB), above the destinations. */
  header: string;
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
