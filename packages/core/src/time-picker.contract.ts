/**
 * time-picker.contract.ts — variants + slot classes for the M3 Time picker.
 *
 * One component, two M3 layouts: a `dial` (clock face) and an `input` (typed
 * hour/minute fields). Both share the header field + AM/PM toggle. Engines
 * resolve the same slots so the DOM + `data-*` stay drop-in compatible.
 */
export const TIME_PICKER_VARIANTS = ['dial', 'input'] as const;
export type TimePickerVariant = (typeof TIME_PICKER_VARIANTS)[number];

/** Hour is 0–23 (24-hour clock); the `12h` format derives AM/PM for display. */
export interface TimeValue {
  hour: number;
  minute: number;
}

export interface TimePickerOwnProps {
  variant?: TimePickerVariant;
  /** `12h` shows an AM/PM toggle; `24h` hides it. */
  format?: '12h' | '24h';
  value?: TimeValue;
  defaultValue?: TimeValue;
  onValueChange?: (value: TimeValue) => void;
  className?: string;
}

export interface TimePickerClasses {
  root: string;
  /** Header row: hour/minute fields + AM/PM toggle. */
  header: string;
  /** The big hour/minute selector button (data-selected while active). */
  field: string;
  /** The ":" between the hour and minute fields. */
  colon: string;
  /** Vertical AM/PM toggle group. */
  periods: string;
  /** A single AM/PM button (data-selected). */
  period: string;
  /** Clock face (dial variant). */
  dial: string;
  /** A number button on the dial (data-selected). */
  dialNumber: string;
  /** The clock hand pointing at the selected value. */
  dialHand: string;
  /** The dial center dot. */
  dialCenter: string;
  /** Container for the typed hour/minute fields (input variant). */
  inputs: string;
  /** A typed hour/minute number input box. */
  inputBox: string;
  /** A small caption under an input box ("Hour" / "Minute"). */
  inputCaption: string;
}

export interface TimePickerResolverArgs {
  variant: TimePickerVariant;
}

export type TimePickerClassResolver = (args: TimePickerResolverArgs) => TimePickerClasses;
