import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Progress } from './progress';

describe('Progress.Linear', () => {
  test('determinate exposes the value via aria', () => {
    render(<Progress.Linear value={40} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar).toHaveAttribute('aria-valuenow', '40');
    expect(bar).not.toHaveAttribute('data-indeterminate');
  });

  test('omitting value renders the indeterminate animation hook', () => {
    render(<Progress.Linear aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar).toHaveAttribute('data-indeterminate');
    expect(bar.className).toContain('h-1');
  });
});

describe('Progress.Circular', () => {
  test('determinate ring reports aria value + draws the arc', () => {
    const { container } = render(<Progress.Circular value={25} aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar).toHaveAttribute('aria-valuenow', '25');
    expect(bar.className).toContain('size-12');
    // determinate draws both the track and the active arc
    expect(container.querySelectorAll('circle')).toHaveLength(2);
  });

  test('indeterminate spins and drops the track + aria value', () => {
    const { container } = render(<Progress.Circular aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar).toHaveAttribute('data-indeterminate');
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(container.querySelectorAll('circle')).toHaveLength(1);
  });
});
