import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from './switch';

describe('Switch', () => {
  test('exposes the switch role', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  test('toggles data-checked on click (uncontrolled)', () => {
    render(<Switch />);
    const sw = screen.getByRole('switch');
    expect(sw).not.toHaveAttribute('data-checked');
    fireEvent.click(sw);
    expect(sw).toHaveAttribute('data-checked');
  });

  test('honors defaultChecked', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-checked');
  });
});
