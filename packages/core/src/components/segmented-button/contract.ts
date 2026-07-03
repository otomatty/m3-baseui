/**
 * segmented-button.contract.ts — slot classes + props for the M3 SegmentedButton.
 *
 * `labs/segmentedbutton(set)`: a row of connected, outlined toggles. Selection is
 * managed by Base UI `ToggleGroup` (single-select by default, `multiple` opt-in);
 * each segment is a `Toggle` whose pressed state surfaces as `data-pressed` and
 * drives the secondary-container fill + the leading checkmark. One string per
 * slot keeps both engines drop-in compatible.
 */
import type * as React from 'react';

export interface SegmentedButtonClasses {
  /** ToggleGroup — the connected container with the shared outline. */
  root: string;
  /** Toggle — one segment (also carries the `group` hook). */
  item: string;
  /** Leading checkmark, revealed when the segment is selected. */
  check: string;
  /** Optional leading icon, hidden when the segment is selected. */
  icon: string;
  /** Segment label. */
  label: string;
}

export interface SegmentedButtonItemOwnProps {
  /** Optional leading icon (hidden once selected, replaced by the checkmark). */
  icon?: React.ReactNode;
}
