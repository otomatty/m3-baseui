'use client';
/**
 * create-date-picker.tsx — headless M3 Date picker.
 *
 * No Base UI calendar primitive exists, so the month-grid `Calendar` is built
 * here as a pure, engine-styled component (state lives in `data-*` so the CSS is
 * shared between engines). It is then placed in the two M3 surfaces: a docked
 * Popover anchored under a text field, and a modal Dialog. Engines inject slot
 * classes only, so the DOM + `data-*` contract is identical between builds.
 */
import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

import type { DatePickerClasses } from './date-picker.contract';
import { createSlot } from './slot';
import { cx } from './utils';

/** A typed forwardRef host-element slot that merges a base class with the caller's. */
function hostSlot<T extends keyof React.JSX.IntrinsicElements>(tag: T, baseClass: string) {
  type P = React.JSX.IntrinsicElements[T];
  const Comp = React.forwardRef<unknown, P>(function HostSlot(props, ref) {
    const { className, ...rest } = props as { className?: string };
    return React.createElement(tag, {
      ...rest,
      ref,
      className: cx(baseClass, className) || undefined,
    });
  });
  Comp.displayName = `M3HostSlot(${tag})`;
  return Comp as React.ForwardRefExoticComponent<P & React.RefAttributes<unknown>>;
}

// --- date helpers (no external deps; all local-time) ---
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export interface CalendarProps {
  /** Selected date (controlled). */
  value?: Date | null;
  /** Selected date (uncontrolled initial). */
  defaultValue?: Date | null;
  /** Fires when a day is chosen. */
  onValueChange?: (date: Date) => void;
  /** Displayed month (controlled); any day in the month works. */
  month?: Date;
  /** Displayed month (uncontrolled initial). */
  defaultMonth?: Date;
  /** Fires when the displayed month changes (navigation / year pick). */
  onMonthChange?: (month: Date) => void;
  /** Earliest selectable day (inclusive). */
  min?: Date;
  /** Latest selectable day (inclusive). */
  max?: Date;
  /** Reference "today" (override for deterministic rendering/tests). */
  today?: Date;
  /** BCP-47 locale for month/weekday formatting. */
  locale?: string;
  /** Weekday header labels, Sunday-first. Defaults to locale-derived narrow names. */
  weekdayLabels?: string[];
  previousMonthLabel?: string;
  nextMonthLabel?: string;
  /** Accessible name for the year-selection list. */
  yearLabel?: string;
  className?: string;
}

/** Build a `Calendar` bound to one engine's slot classes. */
function makeCalendar(classes: DatePickerClasses) {
  function Calendar({
    value,
    defaultValue = null,
    onValueChange,
    month,
    defaultMonth,
    onMonthChange,
    min,
    max,
    today,
    locale = 'en-US',
    weekdayLabels,
    previousMonthLabel = 'Previous month',
    nextMonthLabel = 'Next month',
    yearLabel = 'Year',
    className,
  }: CalendarProps): React.JSX.Element {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<Date | null>(defaultValue);
    const selected = isControlled ? (value ?? null) : internal;

    const initialMonth = month ?? defaultMonth ?? selected ?? today ?? new Date();
    const isMonthControlled = month !== undefined;
    const [internalMonth, setInternalMonth] = React.useState<Date>(
      () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
    );
    const display = isMonthControlled
      ? new Date(month.getFullYear(), month.getMonth(), 1)
      : internalMonth;

    const [view, setView] = React.useState<'days' | 'years'>('days');

    const setDisplay = (next: Date) => {
      if (!isMonthControlled) setInternalMonth(next);
      onMonthChange?.(next);
    };

    const minDay = min ? startOfDay(min) : undefined;
    const maxDay = max ? startOfDay(max) : undefined;
    const isDisabled = (d: Date) =>
      (minDay !== undefined && d.getTime() < minDay.getTime()) ||
      (maxDay !== undefined && d.getTime() > maxDay.getTime());

    const selectDay = (d: Date) => {
      if (isDisabled(d)) return;
      if (!isControlled) setInternal(d);
      onValueChange?.(d);
    };

    const year = display.getFullYear();
    const monthIndex = display.getMonth();
    const monthYearLabel = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(display);

    // M3 shows only the current month's days; lead with blank cells.
    const firstWeekday = new Date(year, monthIndex, 1).getDay();
    const total = daysInMonth(year, monthIndex);
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(new Date(year, monthIndex, d));
    while (cells.length % 7 !== 0) cells.push(null);
    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    const todayDay = today ? startOfDay(today) : startOfDay(new Date());

    // Year view range: clamp to min/max when provided.
    const fromYear = minDay ? minDay.getFullYear() : year - 100;
    const toYear = maxDay ? maxDay.getFullYear() : year + 10;
    const years: number[] = [];
    for (let y = fromYear; y <= toYear; y++) years.push(y);

    const canPrev =
      minDay === undefined || new Date(year, monthIndex, 1).getTime() > minDay.getTime();
    const canNext =
      maxDay === undefined || new Date(year, monthIndex + 1, 1).getTime() <= maxDay.getTime();

    const fullDateLabel = (d: Date) =>
      new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(d);

    // Stable, unique keys + accessible names for the weekday columns (2024-01-07
    // is a Sunday, so this enumerates Sun→Sat in the active locale). The visible
    // labels default to locale-derived narrow names unless overridden.
    const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    const narrowFmt = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
    const weekdayKeys = Array.from({ length: 7 }, (_, i) =>
      weekdayFmt.format(new Date(2024, 0, 7 + i)),
    );
    const displayWeekdays =
      weekdayLabels ??
      Array.from({ length: 7 }, (_, i) => narrowFmt.format(new Date(2024, 0, 7 + i)));

    return (
      <div className={cx(classes.calendar, className)}>
        <div className={classes.header}>
          <button
            type="button"
            className={classes.monthLabel}
            aria-label={monthYearLabel}
            data-view={view}
            onClick={() => setView((v) => (v === 'days' ? 'years' : 'days'))}
          >
            <span>{monthYearLabel}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          {view === 'days' ? (
            <div>
              <button
                type="button"
                className={classes.navButton}
                aria-label={previousMonthLabel}
                disabled={!canPrev}
                onClick={() => setDisplay(addMonths(display, -1))}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                type="button"
                className={classes.navButton}
                aria-label={nextMonthLabel}
                disabled={!canNext}
                onClick={() => setDisplay(addMonths(display, 1))}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path fill="currentColor" d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        {view === 'days' ? (
          // A semantic <table> gives the grid/columnheader roles for free; the
          // day buttons stay the interactive cells (state in their data-*).
          <table className={classes.grid} aria-label={monthYearLabel}>
            <thead>
              <tr className={classes.weekdays}>
                {displayWeekdays.map((w, i) => (
                  <th
                    key={weekdayKeys[i]}
                    scope="col"
                    className={classes.weekday}
                    aria-label={weekdayKeys[i]}
                  >
                    {w}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => {
                const weekKey = (week.find((x): x is Date => x !== null) as Date).getTime();
                return (
                  <tr key={weekKey}>
                    {week.map((d, di) =>
                      d ? (
                        <td key={d.getTime()}>
                          <button
                            type="button"
                            className={classes.day}
                            aria-label={fullDateLabel(d)}
                            aria-pressed={isSameDay(d, selected) || undefined}
                            data-selected={isSameDay(d, selected) || undefined}
                            data-today={isSameDay(d, todayDay) || undefined}
                            data-disabled={isDisabled(d) || undefined}
                            disabled={isDisabled(d)}
                            onClick={() => selectDay(d)}
                          >
                            {d.getDate()}
                          </button>
                        </td>
                      ) : (
                        <td key={`${weekKey}-${weekdayKeys[di]}`} aria-hidden="true" />
                      ),
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={classes.yearGrid} role="listbox" aria-label={yearLabel}>
            {years.map((y) => (
              <button
                key={`y-${y}`}
                type="button"
                role="option"
                className={classes.yearButton}
                aria-selected={y === year || undefined}
                data-selected={y === year || undefined}
                onClick={() => {
                  setDisplay(new Date(y, monthIndex, 1));
                  setView('days');
                }}
              >
                {y}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  Calendar.displayName = 'M3Calendar';
  return Calendar;
}

/**
 * Build the M3 Date picker namespace: the headless `Calendar` plus the docked
 * (Popover) and modal (Dialog) surfaces, bound to one engine's slot classes.
 */
export function createDatePicker(classes: DatePickerClasses) {
  return {
    // Docked: text field + anchored popover.
    Root: PopoverPrimitive.Root,
    Trigger: PopoverPrimitive.Trigger,
    Portal: PopoverPrimitive.Portal,
    Positioner: PopoverPrimitive.Positioner,
    Popup: createSlot(PopoverPrimitive.Popup, classes.popup),
    Field: hostSlot('div', classes.field),
    Input: hostSlot('input', classes.input),
    FieldIcon: createSlot(PopoverPrimitive.Trigger, classes.fieldIcon),

    // The month grid (usable standalone or inside either surface).
    Calendar: makeCalendar(classes),

    // Modal: scrim + centered surface.
    Modal: DialogPrimitive.Root,
    ModalTrigger: DialogPrimitive.Trigger,
    ModalPortal: DialogPrimitive.Portal,
    ModalBackdrop: createSlot(DialogPrimitive.Backdrop, classes.modalBackdrop),
    ModalPopup: createSlot(DialogPrimitive.Popup, classes.modalPopup),
    // Title/Description wire the dialog's accessible name + description (rendered
    // as the same <p>/<h2> DOM as before, so both engines stay drop-in compatible).
    ModalHeader: createSlot(DialogPrimitive.Description, classes.modalHeader),
    ModalHeadline: createSlot(DialogPrimitive.Title, classes.modalHeadline),
    ModalActions: hostSlot('div', classes.modalActions),
    ModalClose: DialogPrimitive.Close,
  };
}
