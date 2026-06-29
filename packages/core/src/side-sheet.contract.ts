/**
 * side-sheet.contract.ts — slot classes + props for the M3 Side sheet.
 *
 * Built on Base UI `drawer` (swipeDirection="left"|"right"): a full-height
 * `surface-container-low` surface anchored to a side edge for supplementary
 * content. The `modal` variant shows a scrim, traps focus, floats at elevation 1
 * and rounds its leading edge; `standard` co-exists with the page (no scrim, no
 * elevation, flush corners). The side is driven by Base UI's `data-swipe-direction`
 * on the popup, so a single resolver per variant keeps both engines drop-in
 * compatible.
 */
export const SIDE_SHEET_VARIANTS = ['modal', 'standard'] as const;
export type SideSheetVariant = (typeof SIDE_SHEET_VARIANTS)[number];

export const SIDE_SHEET_SIDES = ['left', 'right'] as const;
export type SideSheetSide = (typeof SIDE_SHEET_SIDES)[number];

export interface SideSheetResolverArgs {
  variant: SideSheetVariant;
}

export interface SideSheetClasses {
  /** Scrim behind a modal sheet. */
  backdrop: string;
  /** Fixed full-viewport positioner. */
  viewport: string;
  /** Resolves the sheet surface class for the variant. */
  popup: (args: SideSheetResolverArgs) => string;
  /** Header row (headline + close). */
  header: string;
  /** Sheet headline. */
  title: string;
  /** Supporting text. */
  description: string;
  /** Trailing close control in the header. */
  close: string;
}

export interface SideSheetOwnProps {
  /** Modality. `modal` shows a scrim + traps focus. @default 'modal' */
  variant?: SideSheetVariant;
  /** Edge the sheet is anchored to. @default 'right' */
  side?: SideSheetSide;
}
