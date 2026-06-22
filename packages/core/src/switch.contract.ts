/**
 * switch.contract.ts — slot set for the M3 Switch.
 *
 * The Switch has no M3 variant; its appearance is driven entirely by Base UI's
 * `data-checked` / `data-disabled` state attributes in CSS. Each engine supplies
 * the class strings for the two slots.
 */
export interface SwitchClasses {
  /** The track (`Switch.Root`). */
  root: string;
  /** The handle (`Switch.Thumb`). */
  thumb: string;
}
