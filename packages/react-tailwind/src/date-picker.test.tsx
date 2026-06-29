import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'bun:test';
import { DatePicker, datePickerTv } from './date-picker';

// The Calendar grid renders inline (no portal), so we unit-test its behavior.
// The docked Popover / modal Dialog surfaces are portal/position based → E2E.
describe('DatePicker Calendar', () => {
  test('renders the displayed month grid with weekday headers', () => {
    render(
      <DatePicker.Calendar defaultMonth={new Date(2024, 0, 1)} today={new Date(2024, 0, 15)} />,
    );
    // January 2024 label on the month toggle
    expect(screen.getByRole('button', { name: 'January 2024' })).toBeInTheDocument();
    // 7 weekday column headers
    expect(screen.getAllByRole('columnheader')).toHaveLength(7);
    // day 1 exists as an interactive day button
    expect(screen.getByRole('button', { name: /January 1, 2024/ })).toBeInTheDocument();
  });

  test('selecting a day marks it data-selected and fires onValueChange', () => {
    let picked: Date | null = null;
    render(
      <DatePicker.Calendar
        defaultMonth={new Date(2024, 0, 1)}
        today={new Date(2024, 0, 15)}
        onValueChange={(d) => {
          picked = d;
        }}
      />,
    );
    const day10 = screen.getByRole('button', { name: /January 10, 2024/ });
    fireEvent.click(day10);
    expect(day10).toHaveAttribute('data-selected');
    expect(picked).not.toBeNull();
    expect((picked as unknown as Date).getDate()).toBe(10);
  });

  test('today cell carries data-today', () => {
    render(
      <DatePicker.Calendar defaultMonth={new Date(2024, 0, 1)} today={new Date(2024, 0, 15)} />,
    );
    expect(screen.getByRole('button', { name: /January 15, 2024/ })).toHaveAttribute('data-today');
  });

  test('next-month navigation advances the displayed month', () => {
    render(
      <DatePicker.Calendar defaultMonth={new Date(2024, 0, 1)} today={new Date(2024, 0, 15)} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('button', { name: 'February 2024' })).toBeInTheDocument();
  });

  test('min/max disables out-of-range days', () => {
    render(
      <DatePicker.Calendar
        defaultMonth={new Date(2024, 0, 1)}
        today={new Date(2024, 0, 15)}
        min={new Date(2024, 0, 10)}
      />,
    );
    expect(screen.getByRole('button', { name: /January 5, 2024/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /January 12, 2024/ })).not.toBeDisabled();
  });

  test('month label toggles a year listbox; picking a year returns to the grid', () => {
    render(
      <DatePicker.Calendar defaultMonth={new Date(2024, 0, 1)} today={new Date(2024, 0, 15)} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'January 2024' }));
    const listbox = screen.getByRole('listbox', { name: 'Year' });
    fireEvent.click(within(listbox).getByRole('option', { name: '2026' }));
    expect(screen.getByRole('button', { name: 'January 2026' })).toBeInTheDocument();
  });
});

describe('DatePicker tokens', () => {
  const dp = datePickerTv();

  test('selected day fills with primary; today gets a primary ring', () => {
    expect(dp.day()).toContain('data-[selected]:bg-primary');
    expect(dp.day()).toContain('data-[selected]:text-on-primary');
    expect(dp.day()).toContain('data-[today]:ring-primary');
  });

  test('day has a circular state layer keyed to hover', () => {
    expect(dp.day()).toContain('rounded-full');
    expect(dp.day()).toContain('hover:before:opacity-[var(--md-sys-state-hover)]');
  });

  test('docked popup = surface-container-high elevation level2; modal = elevation level3', () => {
    expect(dp.popup()).toContain('bg-surface-container-high');
    expect(dp.popup()).toContain('shadow-level2');
    expect(dp.modalPopup()).toContain('shadow-level3');
    expect(dp.modalPopup()).toContain('rounded-extra-large');
  });
});

describe('DatePicker parts', () => {
  test('namespace exposes the docked + modal surfaces and the Calendar', () => {
    expect(DatePicker.Root).toBeDefined();
    expect(DatePicker.Calendar).toBeDefined();
    expect(DatePicker.Popup).toBeDefined();
    expect(DatePicker.Field).toBeDefined();
    expect(DatePicker.Modal).toBeDefined();
    expect(DatePicker.ModalPopup).toBeDefined();
    expect(DatePicker.ModalHeadline).toBeDefined();
  });
});
