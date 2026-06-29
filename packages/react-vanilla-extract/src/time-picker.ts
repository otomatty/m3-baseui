/**
 * time-picker.ts — wires the VE styles into the shared component factory.
 */
import { createTimePicker } from '@m3-baseui/core';
import {
  root,
  header,
  field,
  colon,
  periods,
  period,
  dial,
  dialNumber,
  dialHand,
  dialCenter,
  inputs,
  inputBox,
  inputCaption,
} from './time-picker.css';

export const TimePicker = createTimePicker(() => ({
  root,
  header,
  field,
  colon,
  periods,
  period,
  dial,
  dialNumber,
  dialHand,
  dialCenter,
  inputs,
  inputBox,
  inputCaption,
}));
