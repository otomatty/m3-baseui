'use client';
/**
 * create-time-picker.tsx — headless M3 Time picker (dial + input).
 *
 * No Base UI time primitive exists, so the picker is built here as a pure,
 * engine-styled component. Selection state lives in `data-*` so the CSS is
 * shared between engines. The `dial` variant is a 12-hour clock face (numbers
 * positioned with inline geometry; appearance from slot classes); the `input`
 * variant types the hour/minute. Both share the header field + AM/PM toggle.
 */
import * as React from 'react';

import type {
  TimePickerClassResolver,
  TimePickerOwnProps,
  TimeValue,
} from './time-picker.contract';

const DEFAULT_VALUE: TimeValue = { hour: 12, minute: 0 };

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** Build a `TimePicker` component bound to one engine's class resolver. */
export function createTimePicker(resolve: TimePickerClassResolver) {
  function TimePicker({
    variant = 'dial',
    format = '12h',
    value,
    defaultValue,
    onValueChange,
    className,
  }: TimePickerOwnProps): React.JSX.Element {
    const c = resolve({ variant });
    const is12 = format === '12h';

    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<TimeValue>(defaultValue ?? DEFAULT_VALUE);
    const current = isControlled ? (value as TimeValue) : internal;

    const [selection, setSelection] = React.useState<'hours' | 'minutes'>('hours');

    const setValue = (next: TimeValue) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    const period: 'AM' | 'PM' = current.hour < 12 ? 'AM' : 'PM';
    const displayHour = is12 ? current.hour % 12 || 12 : current.hour;

    const setPeriod = (p: 'AM' | 'PM') => {
      const base = current.hour % 12;
      setValue({ ...current, hour: p === 'AM' ? base : base + 12 });
    };

    // Convert a clicked 12h dial hour (1–12) into a 24h hour given the period.
    const setHour12 = (h12: number) => {
      const base = h12 % 12;
      setValue({ ...current, hour: period === 'AM' ? base : base + 12 });
    };

    // AM/PM toggle is shared by both variants; a <fieldset> is the semantic group.
    const periodToggle = is12 ? (
      <fieldset className={c.periods} aria-label="AM or PM">
        <button
          type="button"
          className={c.period}
          data-selected={period === 'AM' || undefined}
          aria-pressed={period === 'AM'}
          onClick={() => setPeriod('AM')}
        >
          AM
        </button>
        <button
          type="button"
          className={c.period}
          data-selected={period === 'PM' || undefined}
          aria-pressed={period === 'PM'}
          onClick={() => setPeriod('PM')}
        >
          PM
        </button>
      </fieldset>
    ) : null;

    if (variant === 'input') {
      const onHour = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = Number.parseInt(e.target.value, 10);
        if (Number.isNaN(raw)) return;
        if (is12) {
          const h12 = clamp(raw, 1, 12);
          const base = h12 % 12;
          setValue({ ...current, hour: period === 'AM' ? base : base + 12 });
        } else {
          setValue({ ...current, hour: clamp(raw, 0, 23) });
        }
      };
      const onMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = Number.parseInt(e.target.value, 10);
        if (Number.isNaN(raw)) return;
        setValue({ ...current, minute: clamp(raw, 0, 59) });
      };
      return (
        <div className={className ? `${c.root} ${className}` : c.root} data-variant="input">
          <div className={c.inputs}>
            <span>
              <input
                className={c.inputBox}
                type="number"
                inputMode="numeric"
                aria-label="Hour"
                min={is12 ? 1 : 0}
                max={is12 ? 12 : 23}
                value={is12 ? displayHour : current.hour}
                onChange={onHour}
              />
              <span className={c.inputCaption}>Hour</span>
            </span>
            <span className={c.colon} aria-hidden="true">
              :
            </span>
            <span>
              <input
                className={c.inputBox}
                type="number"
                inputMode="numeric"
                aria-label="Minute"
                min={0}
                max={59}
                value={pad2(current.minute)}
                onChange={onMinute}
              />
              <span className={c.inputCaption}>Minute</span>
            </span>
            {periodToggle}
          </div>
        </div>
      );
    }

    // --- dial variant (12-hour clock face) ---
    const RADIUS_PCT = 38;
    const numbers =
      selection === 'hours'
        ? Array.from({ length: 12 }, (_, i) => ({ pos: i, label: i === 0 ? 12 : i }))
        : Array.from({ length: 12 }, (_, i) => ({ pos: i, label: i * 5 }));

    const handAngle = selection === 'hours' ? (displayHour % 12) * 30 : current.minute * 6;

    const onNumber = (label: number) => {
      if (selection === 'hours') {
        setHour12(label);
        setSelection('minutes');
      } else {
        setValue({ ...current, minute: label % 60 });
      }
    };

    return (
      <div className={className ? `${c.root} ${className}` : c.root} data-variant="dial">
        <div className={c.header}>
          <button
            type="button"
            className={c.field}
            data-selected={selection === 'hours' || undefined}
            aria-label="Hours"
            aria-pressed={selection === 'hours'}
            onClick={() => setSelection('hours')}
          >
            {is12 ? displayHour : pad2(current.hour)}
          </button>
          <span className={c.colon} aria-hidden="true">
            :
          </span>
          <button
            type="button"
            className={c.field}
            data-selected={selection === 'minutes' || undefined}
            aria-label="Minutes"
            aria-pressed={selection === 'minutes'}
            onClick={() => setSelection('minutes')}
          >
            {pad2(current.minute)}
          </button>
          {periodToggle}
        </div>
        <fieldset className={c.dial} aria-label="Clock">
          <span
            className={c.dialHand}
            aria-hidden="true"
            style={{ transform: `rotate(${handAngle}deg)` }}
          />
          <span className={c.dialCenter} aria-hidden="true" />
          {numbers.map(({ pos, label }) => {
            const angle = (pos * 30 * Math.PI) / 180;
            const left = 50 + Math.sin(angle) * RADIUS_PCT;
            const top = 50 - Math.cos(angle) * RADIUS_PCT;
            const isSel =
              selection === 'hours' ? displayHour % 12 === label % 12 : current.minute === label;
            return (
              <button
                key={`${selection}-${label}`}
                type="button"
                className={c.dialNumber}
                data-selected={isSel || undefined}
                aria-label={String(label)}
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => onNumber(label)}
              >
                {selection === 'minutes' ? pad2(label) : label}
              </button>
            );
          })}
        </fieldset>
      </div>
    );
  }

  TimePicker.displayName = 'M3TimePicker';
  return TimePicker;
}
