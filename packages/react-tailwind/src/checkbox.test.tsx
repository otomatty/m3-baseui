import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  test('exposes the checkbox role', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('reflects defaultChecked via data-checked', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-checked');
  });

  test('reflects indeterminate via data-indeterminate', () => {
    render(<Checkbox indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-indeterminate');
  });
});
