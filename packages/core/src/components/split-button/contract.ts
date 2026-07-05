/**
 * split-button.contract.ts — slot classes + props for the M3 SplitButton.
 *
 * `labs/splitbutton`: a primary-action button joined to a smaller trailing
 * button that opens a menu. The trailing part is a Base UI `Menu.Trigger`; its
 * `data-popup-open` rotates the chevron and morphs the trailing button to a full
 * circle, and the dropdown reuses the Base UI Menu surface. Both parts share the
 * variant container color and morph their facing (seam) corners so the pair reads
 * as one unit. One class string per slot keeps both engines drop-in compatible.
 *
 * Per the M3 spec (Compose `SplitButton*Tokens`) the variants are
 * `filled | tonal | outlined | elevated` — there is no `text` split button.
 */
export const SPLIT_BUTTON_VARIANTS = ['filled', 'tonal', 'outlined', 'elevated'] as const;
export type SplitButtonVariant = (typeof SPLIT_BUTTON_VARIANTS)[number];

export interface SplitButtonClasses {
  /** `role="group"` container holding the leading + trailing buttons. */
  group: string;
  /** Leading primary-action button, resolved per variant. */
  leading: (variant: SplitButtonVariant) => string;
  /** Trailing menu-trigger button, resolved per variant. */
  trailing: (variant: SplitButtonVariant) => string;
  /** Trailing chevron wrapper (rotates 180° while the menu is open). */
  chevron: string;
  /** Dropdown surface (the M3 menu popup). */
  popup: string;
  /** A dropdown menu item. */
  item: string;
}

export interface SplitButtonGroupOwnProps {
  /**
   * Container color, shared by both halves (handed to the leading + trailing
   * parts via context so they can never render mismatched). @default 'filled'
   */
  variant?: SplitButtonVariant;
}

export interface SplitButtonLeadingOwnProps {
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}

export interface SplitButtonTrailingOwnProps {
  /** Show the pointer-origin ripple on press. @default true */
  ripple?: boolean;
}
