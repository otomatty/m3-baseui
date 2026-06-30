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

  test('falls back to indeterminate for a non-finite value (e.g. 0 / 0)', () => {
    render(<Progress.Linear value={0 / 0} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    // NaN/Infinity must not leak into aria; render indeterminate instead.
    expect(bar).toHaveAttribute('data-indeterminate');
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  // The M3 gap (between the active indicator tip and the inactive track) and the
  // track-stop dot are CSS pseudo-elements positioned from the fill fraction, so
  // the factory publishes that fraction as the `--m3-progress` custom property.
  test('determinate publishes the fill fraction as the --m3-progress variable', () => {
    render(<Progress.Linear value={40} max={100} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar.style.getPropertyValue('--m3-progress')).toBe('40%');
  });

  test('the fill fraction tracks a custom max', () => {
    render(<Progress.Linear value={1} max={4} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar.style.getPropertyValue('--m3-progress')).toBe('25%');
  });

  test('indeterminate omits the --m3-progress variable (track stays full)', () => {
    render(<Progress.Linear aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar.style.getPropertyValue('--m3-progress')).toBe('');
  });

  test('keeps a caller-provided style alongside the fraction variable', () => {
    render(<Progress.Linear value={50} style={{ opacity: 0.5 }} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar.style.getPropertyValue('--m3-progress')).toBe('50%');
    expect(bar.style.opacity).toBe('0.5');
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
    // Built-in `animate-spin` (1s) works in every setup; the VE build matches
    // that period for drop-in parity.
    expect(bar.className).toContain('animate-spin');
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
