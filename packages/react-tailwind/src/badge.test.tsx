import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  test('renders a small dot (no value) with data-size="small"', () => {
    render(<Badge data-testid="b" aria-label="新着あり" />);
    const badge = screen.getByTestId('b');
    expect(badge).toHaveAttribute('data-size', 'small');
    expect(badge).toHaveTextContent('');
  });

  test('renders a large numeric badge with data-size="large"', () => {
    render(<Badge data-testid="b" value={3} />);
    const badge = screen.getByTestId('b');
    expect(badge).toHaveAttribute('data-size', 'large');
    expect(badge).toHaveTextContent('3');
  });

  test('caps numeric values above max', () => {
    render(<Badge data-testid="b" value={120} max={99} />);
    expect(screen.getByTestId('b')).toHaveTextContent('99+');
  });

  test('a labelled badge gets a role so aria-label is valid (a11y)', () => {
    render(<Badge data-testid="b" aria-label="新着あり" />);
    expect(screen.getByTestId('b')).toHaveAttribute('role', 'status');
  });

  test('an unlabelled badge stays roleless (decorative)', () => {
    render(<Badge data-testid="b" value={3} />);
    expect(screen.getByTestId('b')).not.toHaveAttribute('role');
  });

  test('an explicit role is preserved', () => {
    render(<Badge data-testid="b" role="img" aria-label="新着あり" />);
    expect(screen.getByTestId('b')).toHaveAttribute('role', 'img');
  });
});
