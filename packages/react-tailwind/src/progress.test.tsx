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

  test('normalizes a non-positive max before forwarding it', () => {
    render(<Progress.Linear value={5} max={0} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    // max=0 is sanitized to the 100 fallback, keeping a valid ARIA range.
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(bar).not.toHaveAttribute('data-indeterminate');
  });

  test('clamps an out-of-range determinate value to [0, max]', () => {
    render(<Progress.Linear value={150} max={100} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    // aria-valuenow must never exceed aria-valuemax.
    expect(bar).toHaveAttribute('aria-valuenow', '100');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
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

  test('clamps the value and survives a non-positive max (no NaN arc)', () => {
    const { container } = render(<Progress.Circular value={5} max={0} aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    // value is clamped to safeMax; aria stays in sync and the arc is finite.
    expect(bar).toHaveAttribute('aria-valuenow', '5');
    const arc = container.querySelectorAll('circle')[1] as SVGCircleElement;
    expect(arc.getAttribute('stroke-dashoffset')).not.toContain('NaN');
  });
});
