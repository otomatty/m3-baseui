/**
 * tooltip.contract.ts — slot classes for the M3 Tooltip (plain + rich).
 *
 * Plain tooltip is visual-only (Base UI Tooltip): only the popup and arrow carry
 * M3 styling. The rich tooltip holds interactive controls, so it is built on the
 * accessible Base UI Popover (click/keyboard trigger, focus management) instead —
 * see {@link RichTooltipClasses}.
 */
export interface TooltipClasses {
  popup: string;
  arrow: string;
}

/**
 * Slot classes for the M3 rich tooltip (Popover-based). The container is a
 * surface-container surface with an optional title-small subhead, body-medium
 * supporting text, and a trailing row of text-button actions.
 */
export interface RichTooltipClasses {
  popup: string;
  arrow: string;
  /** Optional rich-tooltip title (title-small / on-surface). */
  subhead: string;
  /** Rich-tooltip body (body-medium / on-surface-variant). */
  supportingText: string;
  /** Action row of text buttons, leading-aligned at the bottom (per M3). */
  actions: string;
}
