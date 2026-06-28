import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Divider } from './divider';

describe('Divider', () => {
  test('renders a horizontal separator by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('data-orientation', 'horizontal');
    expect(divider).not.toHaveAttribute('aria-orientation', 'vertical');
    expect(divider.className).toContain('bg-outline-variant');
    expect(divider.className).toContain('h-px');
  });

  test('vertical orientation flags aria + swaps the thickness axis', () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(divider.className).toContain('w-px');
  });

  test('inset variants add the leading / both-ends margin', () => {
    const { rerender } = render(<Divider inset="inset" />);
    expect(screen.getByRole('separator').className).toContain('ms-4');
    rerender(<Divider inset="middle" />);
    expect(screen.getByRole('separator').className).toContain('mx-4');
  });

  test('vertical inset uses a logical block-start margin (engine parity)', () => {
    render(<Divider orientation="vertical" inset="inset" />);
    // Logical margin matches the VE recipe's `marginBlockStart` (not physical mt-4).
    expect(screen.getByRole('separator').className).toContain('margin-block-start:1rem');
  });
});
