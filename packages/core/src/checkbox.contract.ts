/**
 * checkbox.contract.ts — slot set for the M3 Checkbox.
 *
 * No M3 variant; checked / indeterminate / disabled styling is driven by Base
 * UI's `data-*` attributes. The indeterminate dash is drawn by each engine in
 * CSS (an `::after` on the indicator) so `core` stays engine-neutral.
 */
export interface CheckboxClasses {
  /** The box (`Checkbox.Root`). */
  root: string;
  /** The indicator wrapper (`Checkbox.Indicator`). */
  indicator: string;
  /** The check-mark SVG. */
  icon: string;
}
