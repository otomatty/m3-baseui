/**
 * time-picker.ts — Tailwind classes for the M3 Time picker (dial + input).
 *
 * Dimensions follow Material Android timepicker dimens (96×80 display, 52×98
 * period toggle, 48dp period targets, 12dp display↔toggle gap, 256dp dial,
 * 28dp dial top margin). State layers on interactive slots match other M3 controls.
 */
import { createTimePicker } from '@m3-baseui/core';
import { tv } from '../../tv';

export type { TimePickerVariant, TimeValue } from '@m3-baseui/core';

const stateLayerBase = [
  'overflow-hidden',
  'before:content-[""] before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
  'hover:before:opacity-[var(--md-sys-state-hover)]',
  'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
  'active:before:opacity-[var(--md-sys-state-pressed)]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
] as const;

export const timePickerTv = tv({
  slots: {
    root: ['inline-flex flex-col items-center p-2 text-on-surface'],
    header: ['flex items-center gap-3 min-h-[98px]'],
    display: ['inline-flex items-center'],
    field: [
      'relative',
      ...stateLayerBase,
      'inline-grid place-items-center w-24 h-20 rounded-small box-border',
      'bg-surface-container-highest text-on-surface text-display-large cursor-pointer outline-none',
      'border border-transparent transition-colors duration-100',
      'data-[selected]:bg-primary-container data-[selected]:text-on-primary-container',
    ],
    colon: ['text-display-large text-on-surface px-1 leading-none self-center'],
    periods: [
      'inline-flex flex-col shrink-0 rounded-small overflow-hidden border border-outline',
      'h-[98px] w-[52px] m-0 p-0 min-w-0 box-border',
    ],
    period: [
      'relative',
      ...stateLayerBase,
      'flex-1 inline-flex items-center justify-center min-h-12 h-12 w-full',
      'border-0 bg-transparent',
      'text-title-medium text-on-surface-variant cursor-pointer outline-none',
      'data-[selected]:bg-secondary-container data-[selected]:text-on-secondary-container',
      '[&+&]:border-t [&+&]:border-outline',
    ],
    dial: [
      'relative size-[256px] mt-[28px] p-0 min-w-0 border-0 rounded-full bg-surface-container-highest',
    ],
    dialNumber: [
      ...stateLayerBase,
      'absolute -translate-x-1/2 -translate-y-1/2 inline-grid place-items-center size-12 rounded-full',
      'border-0 bg-transparent',
      'text-body-large text-on-surface cursor-pointer outline-none select-none',
      'data-[selected]:bg-primary data-[selected]:text-on-primary',
    ],
    dialHand: [
      'absolute left-1/2 top-[12%] h-[38%] w-0.5 origin-bottom bg-primary -translate-x-1/2 pointer-events-none',
    ],
    dialCenter: [
      'absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary pointer-events-none',
    ],
    inputs: ['flex items-start gap-3'],
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
  display: tp.display(),
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
