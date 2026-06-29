import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'bun:test';
import { TimePicker, timePickerTv } from './time-picker';
import type { TimeValue } from './time-picker';

// The picker body renders inline; the modal Dialog wrapper is the consumer's.
// Drag on the dial face needs layout → E2E; here we cover render + click select.
describe('TimePicker dial', () => {
  test('renders the header time fields + AM/PM toggle (12h)', () => {
    render(<TimePicker variant="dial" defaultValue={{ hour: 10, minute: 30 }} />);
    expect(screen.getByRole('button', { name: 'Hours' })).toHaveTextContent('10');
    expect(screen.getByRole('button', { name: 'Minutes' })).toHaveTextContent('30');
    const group = screen.getByRole('group', { name: 'AM or PM' });
    expect(within(group).getByRole('button', { name: 'AM' })).toHaveAttribute('data-selected');
  });

  test('clicking a dial hour selects it and advances to minutes', () => {
    let picked: TimeValue | null = null;
    render(
      <TimePicker
        variant="dial"
        defaultValue={{ hour: 10, minute: 30 }}
        onValueChange={(v) => {
          picked = v;
        }}
      />,
    );
    // hours view shows clock numbers; pick 3 → 3 AM
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect((picked as unknown as TimeValue).hour).toBe(3);
    // now in minutes selection: the Minutes field is active
    expect(screen.getByRole('button', { name: 'Minutes' })).toHaveAttribute('data-selected');
  });

  test('PM toggle shifts the stored 24h hour by 12', () => {
    let picked: TimeValue | null = null;
    render(
      <TimePicker
        variant="dial"
        defaultValue={{ hour: 9, minute: 0 }}
        onValueChange={(v) => {
          picked = v;
        }}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'PM' }));
    expect((picked as unknown as TimeValue).hour).toBe(21);
  });
});

describe('TimePicker input', () => {
  test('typed hour/minute fields clamp and update (24h)', () => {
    let picked: TimeValue | null = null;
    render(
      <TimePicker
        variant="input"
        format="24h"
        defaultValue={{ hour: 8, minute: 5 }}
        onValueChange={(v) => {
          picked = v;
        }}
      />,
    );
    const hour = screen.getByRole('spinbutton', { name: 'Hour' });
    fireEvent.change(hour, { target: { value: '20' } });
    expect((picked as unknown as TimeValue).hour).toBe(20);
    // no AM/PM toggle in 24h
    expect(screen.queryByRole('group', { name: 'AM or PM' })).toBeNull();
  });
});

describe('TimePicker tokens', () => {
  const tp = timePickerTv();

  test('active time field fills with primary-container', () => {
    expect(tp.field()).toContain('data-[selected]:bg-primary-container');
    expect(tp.field()).toContain('data-[selected]:text-on-primary-container');
  });

  test('selected dial number fills with primary', () => {
    expect(tp.dialNumber()).toContain('data-[selected]:bg-primary');
    expect(tp.dialNumber()).toContain('rounded-full');
  });

  test('AM/PM selected fills with secondary-container', () => {
    expect(tp.period()).toContain('data-[selected]:bg-secondary-container');
  });
});
