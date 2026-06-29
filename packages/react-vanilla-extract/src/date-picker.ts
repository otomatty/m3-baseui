/**
 * date-picker.ts — wires the VE styles into the shared parts factory.
 */
import { createDatePicker } from '@m3-baseui/core';
import {
  calendar,
  header,
  navButton,
  monthLabel,
  grid,
  weekdays,
  weekday,
  day,
  yearGrid,
  yearButton,
  field,
  input,
  fieldIcon,
  popup,
  modalBackdrop,
  modalPopup,
  modalHeader,
  modalHeadline,
  modalActions,
} from './date-picker.css';

export const DatePicker: ReturnType<typeof createDatePicker> = createDatePicker({
  calendar,
  header,
  navButton,
  monthLabel,
  grid,
  weekdays,
  weekday,
  day,
  yearGrid,
  yearButton,
  field,
  input,
  fieldIcon,
  popup,
  modalBackdrop,
  modalPopup,
  modalHeader,
  modalHeadline,
  modalActions,
});
