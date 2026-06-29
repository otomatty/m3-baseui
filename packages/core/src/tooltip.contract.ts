/**
 * tooltip.contract.ts — slot classes for the M3 Tooltip (plain + rich).
 *
 * Plain tooltip: only the popup and arrow carry M3 styling. Rich tooltip adds a
 * surface-container popup with optional subhead, supporting text and an action
 * row — all plain elements inside the same Base UI Tooltip positioner.
 */
export interface TooltipClasses {
  popup: string;
  arrow: string;
  /** Rich-tooltip surface container (surface-container, level2, 12dp corner). */
  richPopup: string;
  /** Optional rich-tooltip title (title-small / on-surface). */
  subhead: string;
  /** Rich-tooltip body (body-medium / on-surface-variant). */
  supportingText: string;
  /** Trailing row of text-button actions. */
  actions: string;
}
