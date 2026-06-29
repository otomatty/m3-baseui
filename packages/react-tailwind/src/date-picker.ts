/**
 * date-picker.ts — Tailwind classes for the M3 Date picker.
 *
 * The month-grid Calendar plus its two surfaces: a docked Popover
 * (surface-container-high, elevation 2, large corners) and a modal Dialog
 * (surface-container-high, elevation 3, extra-large corners). Day cells carry a
 * circular `before:` state layer keyed to hover; the selected day fills with
 * primary. Same DOM + ripple as the VE build.
 */
import { createDatePicker } from '@m3-baseui/core';
import { tv } from './tv';

export const datePickerTv = tv({
  slots: {
    calendar: ['w-[328px] max-w-full p-3 text-on-surface'],
    header: ['flex items-center justify-between gap-2 h-12 pl-3 pr-1'],
    navButton: [
      'relative inline-flex items-center justify-center size-10 rounded-full overflow-hidden',
      'text-on-surface-variant cursor-pointer outline-none [&>svg]:size-6',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      'disabled:text-on-surface/[0.38] disabled:before:opacity-0 disabled:pointer-events-none',
    ],
    monthLabel: [
      'relative inline-flex items-center gap-1 h-9 px-3 rounded-full overflow-hidden',
      'text-label-large text-on-surface-variant cursor-pointer outline-none',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      '[&>svg]:transition-transform data-[view=years]:[&>svg]:rotate-180',
    ],
    grid: ['mt-2 border-collapse', '[&_td]:p-0 [&_td]:text-center'],
    weekdays: [''],
    weekday: ['size-12 font-normal text-body-large text-on-surface-variant'],
    day: [
      'relative inline-flex items-center justify-center size-12 rounded-full overflow-hidden',
      'text-body-large text-on-surface cursor-pointer outline-none',
      'before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'focus-visible:before:opacity-[var(--md-sys-state-focus)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
      // today: 1px primary outline ring
      'data-[today]:ring-1 data-[today]:ring-inset data-[today]:ring-primary',
      // selected: primary fill, on-primary label, no state layer tint shift
      'data-[selected]:bg-primary data-[selected]:text-on-primary',
      'data-[disabled]:text-on-surface/[0.38] data-[disabled]:before:opacity-0 data-[disabled]:pointer-events-none',
    ],
    // weeks render as 7-col rows; force grid layout on each row
    yearGrid: ['grid grid-cols-3 gap-2 max-h-[280px] overflow-y-auto px-3 py-2'],
    yearButton: [
      'relative inline-flex items-center justify-center h-9 rounded-full overflow-hidden',
      'text-label-large text-on-surface-variant cursor-pointer outline-none',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'data-[selected]:bg-primary data-[selected]:text-on-primary',
    ],

    field: [
      'inline-flex items-center gap-1 h-14 pl-4 pr-1 min-w-[200px]',
      'bg-surface-container-highest text-on-surface rounded-t-extra-small',
      'border-b border-on-surface-variant',
    ],
    input: [
      'flex-1 min-w-0 h-full bg-transparent border-0 outline-none',
      'text-body-large text-on-surface placeholder:text-on-surface-variant',
    ],
    fieldIcon: [
      'relative inline-flex items-center justify-center size-10 rounded-full overflow-hidden',
      'text-on-surface-variant cursor-pointer outline-none [&>svg]:size-6',
      'before:absolute before:inset-0 before:bg-current before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-100',
      'hover:before:opacity-[var(--md-sys-state-hover)]',
      'active:before:opacity-[var(--md-sys-state-pressed)]',
    ],
    popup: [
      'bg-surface-container-high text-on-surface rounded-large shadow-level2',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-standard',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0',
      'focus:outline-none',
    ],

    modalBackdrop: [
      'fixed inset-0 z-40 bg-scrim/32',
      'transition-opacity duration-200 ease-standard',
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
    ],
    modalPopup: [
      'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
      'w-[min(360px,calc(100vw-48px))] max-h-[calc(100vh-48px)] overflow-auto',
      'bg-surface-container-high text-on-surface rounded-extra-large shadow-level3',
      'flex flex-col',
      'origin-[var(--transform-origin)] transition-[opacity,transform] duration-200 ease-emphasized',
      'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
      'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
      'focus:outline-none',
    ],
    modalHeader: ['px-6 pt-4 text-label-medium text-on-surface-variant m-0'],
    modalHeadline: ['px-6 pt-1 pb-4 text-headline-large text-on-surface m-0'],
    modalActions: ['flex justify-end gap-2 px-6 pb-4 pt-2'],
  },
});

const dp = datePickerTv();
export const DatePicker: ReturnType<typeof createDatePicker> = createDatePicker({
  calendar: dp.calendar(),
  header: dp.header(),
  navButton: dp.navButton(),
  monthLabel: dp.monthLabel(),
  grid: dp.grid(),
  weekdays: dp.weekdays(),
  weekday: dp.weekday(),
  day: dp.day(),
  yearGrid: dp.yearGrid(),
  yearButton: dp.yearButton(),
  field: dp.field(),
  input: dp.input(),
  fieldIcon: dp.fieldIcon(),
  popup: dp.popup(),
  modalBackdrop: dp.modalBackdrop(),
  modalPopup: dp.modalPopup(),
  modalHeader: dp.modalHeader(),
  modalHeadline: dp.modalHeadline(),
  modalActions: dp.modalActions(),
});
