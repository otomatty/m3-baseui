import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { TextField } from './textfield';

describe('TextField', () => {
  test('associates the floating label with the input', () => {
    render(<TextField label="名前" />);
    // The Field.Label is wired to the control via htmlFor/id.
    expect(screen.getByLabelText('名前')).toHaveProperty('tagName', 'INPUT');
  });

  test('error marks the input invalid and flags the root with data-invalid', () => {
    const { container } = render(<TextField label="メール" error supportingText="必須です" />);
    expect(screen.getByLabelText('メール')).toHaveAttribute('aria-invalid', 'true');
    // The error color keys off data-invalid on the Field.Root (the group).
    expect(container.querySelector('[data-invalid]')).not.toBeNull();
  });

  test('counter reflects the current length and updates on input', () => {
    render(<TextField label="バイオ" showCounter maxLength={10} defaultValue="ab" />);
    expect(screen.getByText('2/10')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('バイオ'), { target: { value: 'abcd' } });
    expect(screen.getByText('4/10')).toBeInTheDocument();
  });
});
