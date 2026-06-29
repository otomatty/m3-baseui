/**
 * date-picker.contract.ts — slot classes for the M3 Date picker.
 *
 * The headless month-grid Calendar plus the two M3 surfaces it sits in: a docked
 * Popover (anchored under a text field) and a modal Dialog. Both engines resolve
 * the same slots, so the DOM + `data-*` contract stays drop-in compatible.
 */
export interface DatePickerClasses {
  // --- Calendar (the month grid) ---
  /** Calendar root. */
  calendar: string;
  /** Navigation header row (prev / label / next). */
  header: string;
  /** Prev / next arrow buttons. */
  navButton: string;
  /** Month-year label button (toggles the year view). */
  monthLabel: string;
  /** The 7-column day grid. */
  grid: string;
  /** Weekday header row. */
  weekdays: string;
  /** A single weekday header cell. */
  weekday: string;
  /** A day cell button (state layer + data-selected/today/outside/disabled). */
  day: string;
  /** Scrollable year-selection grid. */
  yearGrid: string;
  /** A single year button (data-selected). */
  yearButton: string;

  // --- Docked field + popover surface ---
  /** Docked text-field container. */
  field: string;
  /** Docked text input. */
  input: string;
  /** Trailing calendar icon trigger. */
  fieldIcon: string;
  /** Docked popover surface that wraps the Calendar. */
  popup: string;

  // --- Modal surface ---
  /** Modal scrim. */
  modalBackdrop: string;
  /** Modal surface that wraps header + Calendar + actions. */
  modalPopup: string;
  /** Modal supporting line ("Select date"). */
  modalHeader: string;
  /** Modal headline (the large selected-date text). */
  modalHeadline: string;
  /** Modal action-button row. */
  modalActions: string;
}
