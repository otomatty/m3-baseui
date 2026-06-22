import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Chip } from './chip';

describe('Chip', () => {
  test('uncontrolled filter chip toggles Base UI data-pressed on click', () => {
    render(<Chip variant="filter">Filter</Chip>);
    const chip = screen.getByRole('button', { name: 'Filter' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    expect(chip).not.toHaveAttribute('data-pressed');

    fireEvent.click(chip);

    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(chip).toHaveAttribute('data-pressed');
  });

  test('filter chip keys its selected fill off data-pressed (not the selected prop)', () => {
    render(<Chip variant="filter">Filter</Chip>);
    // The fill must be wired to data-pressed so the uncontrolled toggle paints.
    expect(screen.getByRole('button', { name: 'Filter' }).className).toContain(
      'data-[pressed]:bg-secondary-container',
    );
  });
});
