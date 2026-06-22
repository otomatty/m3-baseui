/**
 * switch.contract.ts — slot set for the M3 Switch.
 *
 * The Switch has no M3 variant; its appearance is driven entirely by Base UI's
 * `data-checked` / `data-disabled` state attributes in CSS. Each engine supplies
 * the class strings for the two slots.
 */
import type * as React from 'react';

export interface SwitchClasses {
  /** The track (`Switch.Root`). */
  root: string;
  /** The handle (`Switch.Thumb`). */
  thumb: string;
  /** Icon shown on the handle while checked (revealed via the root's state). */
  iconChecked: string;
  /** Icon shown on the handle while unchecked. */
  iconUnchecked: string;
}

/** Optional handle icons. Each is revealed in the matching state via CSS. */
export interface SwitchIcons {
  checked?: React.ReactNode;
  unchecked?: React.ReactNode;
}
