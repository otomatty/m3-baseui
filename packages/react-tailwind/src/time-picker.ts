/**
 * time-picker.ts — Tailwind classes for the M3 Time picker (dial + input).
 *
 * The header time fields are surface-container-highest blocks (display-large)
 * that fill with primary-container when active; the AM/PM toggle fills with
 * secondary-container. The dial is a surface-container-highest face whose
 * selected number fills with primary and is reached by a primary hand. Same DOM
 * + data-* as the VE build.
 */
import { createTimePicker } from '@m3-baseui/core';
import { tv } from './tv';

export type { TimePickerVariant, TimeValue } from '@m3-baseui/core';

export const timePickerTv = tv({
  slots: {
    root: ['inline-flex flex-col items-center gap-2 p-2 text-on-surface'],
    header: ['flex items-center gap-2'],
    field: [
      'inline-grid place-items-center w-24 h-20 rounded-small overflow-hidden box-border',
      'bg-surface-container-highest text-on-surface text-display-large cursor-pointer outline-none',
      'border border-transparent transition-colors duration-100',
      'data-[selected]:bg-primary-container data-[selected]:text-on-primary-container',
    ],
    colon: ['text-display-large text-on-surface px-1 leading-none'],
    periods: [
      'inline-flex flex-col rounded-small overflow-hidden border border-outline self-stretch',
      'm-0 p-0 min-w-0',
    ],
    period: [
      'flex-1 inline-flex items-center justify-center px-3 min-h-[38px] w-14',
      'text-title-medium text-on-surface-variant cursor-pointer outline-none',
      'data-[selected]:bg-secondary-container data-[selected]:text-on-secondary-container',
      '[&+&]:border-t [&+&]:border-outline',
    ],
    dial: [
      'relative size-[256px] my-2 p-0 min-w-0 border-0 rounded-full bg-surface-container-highest',
    ],
    dialNumber: [
      'absolute -translate-x-1/2 -translate-y-1/2 inline-grid place-items-center size-12 rounded-full',
      'text-body-large text-on-surface cursor-pointer outline-none select-none',
      'data-[selected]:bg-primary data-[selected]:text-on-primary',
    ],
    dialHand: [
      'absolute left-1/2 top-[12%] h-[38%] w-0.5 origin-bottom bg-primary -translate-x-1/2 pointer-events-none',
    ],
    dialCenter: [
      'absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary pointer-events-none',
    ],
    inputs: ['flex items-start gap-2'],
    inputBox: [
      'w-24 h-20 rounded-small box-border text-center',
      'bg-surface-container-highest text-on-surface text-display-large outline-none',
      'border border-outline focus:border-2 focus:border-primary',
      '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
    ],
    inputCaption: ['block mt-1 text-body-small text-on-surface-variant'],
  },
});

const tp = timePickerTv();
export const TimePicker = createTimePicker(() => ({
  root: tp.root(),
  header: tp.header(),
  field: tp.field(),
  colon: tp.colon(),
  periods: tp.periods(),
  period: tp.period(),
  dial: tp.dial(),
  dialNumber: tp.dialNumber(),
  dialHand: tp.dialHand(),
  dialCenter: tp.dialCenter(),
  inputs: tp.inputs(),
  inputBox: tp.inputBox(),
  inputCaption: tp.inputCaption(),
}));
