/**
 * split-button.contract.ts — slot classes + props for the M3 SplitButton.
 *
 * `labs/splitbutton`: a primary-action button joined to a smaller trailing
 * button that opens a menu. The trailing part is a Base UI `Menu.Trigger`; its
 * `data-popup-open` rotates the chevron and the dropdown reuses the Base UI Menu
 * surface. Both parts share the variant container color (reusing `ButtonVariant`)
 * and morph their facing (seam) corners so the pair reads as one unit. One class
 * string per slot keeps both engines drop-in compatible.
 */
import type { ButtonVariant } from './button.contract';

export interface SplitButtonClasses {
  /** `role="group"` container holding the leading + trailing buttons. */
  group: string;
  /** Leading primary-action button, resolved per variant. */
  leading: (variant: ButtonVariant) => string;
  /** Trailing menu-trigger button, resolved per variant. */
  trailing: (variant: ButtonVariant) => string;
  /** Trailing chevron wrapper (rotates 180° while the menu is open). */
  chevron: string;
  /** Dropdown surface (the M3 menu popup). */
  popup: string;
  /** A dropdown menu item. */
  item: string;
}

export interface SplitButtonLeadingOwnProps {
  /** Container color, shared with the trailing part. @default 'filled' */
  variant?: ButtonVariant;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export interface SplitButtonTrailingOwnProps {
  /** Container color, shared with the leading part. @default 'filled' */
  variant?: ButtonVariant;
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}
