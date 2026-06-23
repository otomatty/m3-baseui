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
});
