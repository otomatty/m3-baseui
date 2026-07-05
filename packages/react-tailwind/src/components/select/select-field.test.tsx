import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Select, selectFieldTv } from './select';

/**
 * Exposed Dropdown Menu = the M3 pattern where the Select anchor is a TextField
 * (floating label + supporting text + trailing dropdown icon). `Select.Field`
 * wraps `Select.Root` in Base UI `Field.Root`, so the trigger carries the same
 * `data-focused` / `data-filled` / `data-invalid` field state as the TextField.
 */
function Example(props: {
  variant?: 'filled' | 'outlined';
  error?: boolean;
  disabled?: boolean;
  supportingText?: string;
}) {
  return (
    <Select.Field
      label="果物"
      variant={props.variant}
      error={props.error}
      disabled={props.disabled}
      supportingText={props.supportingText}
      defaultValue="apple"
    >
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="apple">
              <Select.ItemIndicator />
              <Select.ItemText>りんご</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Field>
  );
}

describe('Select.Field (Exposed Dropdown Menu)', () => {
  test('renders a combobox labelled by the floating label', () => {
    render(<Example />);
    expect(screen.getByRole('combobox', { name: '果物' })).toBeInTheDocument();
  });

  test('exposes supporting text and associates it with the trigger', () => {
    render(<Example supportingText="ひとつ選択" />);
    const trigger = screen.getByRole('combobox', { name: '果物' });
    const describedby = trigger.getAttribute('aria-describedby');
    expect(describedby).toBeTruthy();
    expect(screen.getByText('ひとつ選択')).toBeInTheDocument();
  });

  test('error marks the trigger invalid', () => {
    render(<Example error supportingText="必須です" />);
    expect(screen.getByRole('combobox', { name: '果物' })).toHaveAttribute('data-invalid');
  });

  test('disabled trigger carries data-disabled', () => {
    render(<Example disabled />);
    expect(screen.getByRole('combobox', { name: '果物' })).toHaveAttribute('data-disabled');
  });

  test('renders a default trailing dropdown icon inside the trigger', () => {
    const { container } = render(<Example />);
    expect(container.querySelector('[data-slot="select-icon"]')).not.toBeNull();
  });
});

describe('Select.Field tokens', () => {
  test('field box is 56dp and matches the TextField anchor height', () => {
    expect(selectFieldTv({ variant: 'outlined' }).field()).toContain('h-14');
    expect(selectFieldTv({ variant: 'filled' }).field()).toContain('h-14');
  });

  test('outlined anchor: 1dp outline that grows to the M3 3dp focus width', () => {
    const field = selectFieldTv({ variant: 'outlined' }).field();
    expect(field).toContain('border-outline');
    expect(field).toContain('rounded-extra-small');
    expect(field).toContain('data-[popup-open]:border-[3px]');
    expect(field).toContain('data-[focused]:border-[3px]');
    expect(field).toContain('data-[invalid]:border-error');
  });

  test('filled anchor: surface-container-highest with a 3dp focus indicator', () => {
    const field = selectFieldTv({ variant: 'filled' }).field();
    expect(field).toContain('bg-surface-container-highest');
    expect(field).toContain('rounded-t-extra-small');
    expect(field).toContain('data-[focused]:border-b-[3px]');
    expect(field).toContain('data-[focused]:border-primary');
  });

  test('trailing dropdown icon rotates 180deg when the popup opens', () => {
    expect(selectFieldTv().icon()).toContain('group-data-[popup-open]/field:rotate-180');
  });

  test('label floats on filled / focused / open state', () => {
    const label = selectFieldTv({ variant: 'outlined' }).label();
    expect(label).toContain('group-data-[filled]/field:');
    expect(label).toContain('group-data-[focused]/field:');
    expect(label).toContain('group-data-[popup-open]/field:');
  });

  test('supporting text turns error color when invalid', () => {
    expect(selectFieldTv().supporting()).toContain('group-data-[invalid]:text-error');
  });
});
