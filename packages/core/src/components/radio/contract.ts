/**
 * radio.contract.ts — slot set for the M3 Radio button.
 *
 * No M3 variant; checked / disabled styling is driven by Base UI's `data-*`
 * attributes. RadioGroup only needs a layout class.
 */
export interface RadioClasses {
  /** The circle (`Radio.Root`). */
  root: string;
  /** The inner dot (`Radio.Indicator`). */
  indicator: string;
}
