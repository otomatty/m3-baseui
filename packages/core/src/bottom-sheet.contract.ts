/**
 * bottom-sheet.contract.ts — slot classes + props for the M3 Bottom sheet.
 *
 * Built on Base UI `drawer` (swipeDirection="down"): a `surface-container-low`
 * surface docked to the bottom edge with extra-large top corners, a drag handle,
 * and an optional scrim. The `modal` variant traps focus + locks scroll + shows
 * the scrim; `standard` co-exists with the page (no scrim, no focus trap). The
 * surface itself is identical between variants (M3 keeps both at elevation 1), so
 * a single class per slot keeps both engines drop-in compatible.
 */
export const BOTTOM_SHEET_VARIANTS = ['modal', 'standard'] as const;
export type BottomSheetVariant = (typeof BOTTOM_SHEET_VARIANTS)[number];

export interface BottomSheetClasses {
  /** Scrim behind a modal sheet. */
  backdrop: string;
  /** Fixed full-viewport positioner that docks the popup to the bottom. */
  viewport: string;
  /** The sheet surface. */
  popup: string;
  /** The 32×4dp drag handle affordance. */
  handle: string;
  /** Optional sheet headline. */
  title: string;
  /** Optional supporting text. */
  description: string;
}

export interface BottomSheetOwnProps {
  /** Modality. `modal` shows a scrim + traps focus. @default 'modal' */
  variant?: BottomSheetVariant;
}
