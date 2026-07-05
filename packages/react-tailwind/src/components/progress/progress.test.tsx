import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Progress } from '../progress/progress';

describe('Progress.Linear', () => {
  test('determinate exposes the value via aria', () => {
    render(<Progress.Linear value={40} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar).toHaveAttribute('aria-valuenow', '40');
    expect(bar).not.toHaveAttribute('data-indeterminate');
  });

  test('omitting value runs the disjoint two-bar indeterminate animation', () => {
    const { container } = render(<Progress.Linear aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar).toHaveAttribute('data-indeterminate');
    // M3 disjoint = two primary bars (primary + secondary) animate out of phase.
    const track = container.querySelector('[class*="absolute"]');
    const html = container.innerHTML;
    expect(html).toContain('animate-m3-linear-primary');
    expect(html).toContain('animate-m3-linear-secondary');
    expect(track).toBeTruthy();
  });

  test('defaults to a 4dp track height and honors a custom thickness', () => {
    const { rerender } = render(<Progress.Linear value={40} aria-label="読み込み" />);
    let bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar.style.height).toBe('4px');
    rerender(<Progress.Linear value={40} thickness={8} aria-label="読み込み" />);
    bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar.style.height).toBe('8px');
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

  test('an explicit caller style height wins over the thickness default', () => {
    render(<Progress.Linear value={50} style={{ height: 12 }} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar.style.height).toBe('12px');
    // internal vars still resolve
    expect(bar.style.getPropertyValue('--m3-progress')).toBe('50%');
  });

  test('wavy determinate publishes the wave mask, grows taller and sets data-wavy', () => {
    render(<Progress.Linear value={50} wavy amplitude={3} aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar).toHaveAttribute('data-wavy');
    // Track grows to thickness + 2*amplitude (4 + 6) to fit the wave.
    expect(bar.style.height).toBe('10px');
    expect(bar.style.getPropertyValue('--m3-wave')).toContain('data:image/svg+xml');
    // The flat track/dot stay at the stroke height.
    expect(bar.style.getPropertyValue('--m3-thickness')).toBe('4px');
  });

  test('wavy is ignored while indeterminate (no data-wavy, no mask)', () => {
    render(<Progress.Linear wavy aria-label="読み込み" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み' });
    expect(bar).toHaveAttribute('data-indeterminate');
    expect(bar).not.toHaveAttribute('data-wavy');
    expect(bar.style.getPropertyValue('--m3-wave')).toBe('');
  });

  test('carries reduced-motion fallbacks that freeze the indeterminate loop', () => {
    const { container } = render(<Progress.Linear aria-label="読み込み" />);
    // The looping animations drop under prefers-reduced-motion (a11y).
    expect(container.innerHTML).toContain('motion-reduce:group-data-[indeterminate]:animate-none');
  });
});

describe('Progress.Circular', () => {
  test('determinate ring reports aria value + draws track and active arc', () => {
    const { container } = render(<Progress.Circular value={25} aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar).toHaveAttribute('aria-valuenow', '25');
    // determinate draws both the inactive track and the active arc.
    expect(container.querySelectorAll('circle')).toHaveLength(2);
    // Arcs are normalized against pathLength=100 so the gap is size-independent.
    const arcs = container.querySelectorAll('circle');
    for (const arc of arcs) expect(arc.getAttribute('pathLength')).toBe('100');
  });

  test('defaults to the M3 40dp outer diameter (viewBox + inline size)', () => {
    const { container } = render(<Progress.Circular value={25} aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar.style.width).toBe('40px');
    expect(bar.style.height).toBe('40px');
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 40 40');
  });

  test('an explicit caller style width/height wins over the default size', () => {
    render(<Progress.Circular value={50} style={{ width: 64, height: 64 }} aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar.style.width).toBe('64px');
    expect(bar.style.height).toBe('64px');
  });

  test('honors a custom size and thickness', () => {
    const { container } = render(
      <Progress.Circular value={50} size={240} thickness={8} aria-label="処理中" />,
    );
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar.style.width).toBe('240px');
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 240 240');
    const arc = container.querySelectorAll('circle')[1] as SVGCircleElement;
    expect(arc.getAttribute('stroke-width')).toBe('8');
  });

  test('leaves a gap between active and inactive track (inactive is offset)', () => {
    const { container } = render(<Progress.Circular value={50} aria-label="処理中" />);
    const circles = container.querySelectorAll('circle');
    const track = circles[0] as SVGCircleElement;
    const active = circles[1] as SVGCircleElement;
    // The active arc starts at the top (no offset); the inactive track is pushed
    // past the active arc + gap, so it carries a non-zero negative offset.
    expect(active.getAttribute('stroke-dashoffset')).toBe('0');
    expect(Number(track.getAttribute('stroke-dashoffset'))).toBeLessThan(0);
  });

  test('indeterminate rotates the ring, drops the track + aria value', () => {
    const { container } = render(<Progress.Circular aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar).toHaveAttribute('data-indeterminate');
    expect(bar).not.toHaveAttribute('aria-valuenow');
    // Only the active arc is drawn (no inactive track in the indeterminate ring).
    expect(container.querySelectorAll('circle')).toHaveLength(1);
    // The ring rotates; the arc grows/shrinks via the indicator's dash animation.
    expect(bar.className).toContain('animate-m3-circular-rotate');
    const arc = container.querySelector('circle') as SVGCircleElement;
    expect(arc.getAttribute('class')).toContain('animate-m3-circular-dash');
  });

  test('clamps the value and survives a non-positive max (no NaN arc)', () => {
    const { container } = render(<Progress.Circular value={5} max={0} aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    // value is clamped to safeMax; aria stays in sync and the arc is finite.
    expect(bar).toHaveAttribute('aria-valuenow', '5');
    for (const arc of container.querySelectorAll('circle')) {
      expect(arc.getAttribute('stroke-dasharray')).not.toContain('NaN');
      expect(arc.getAttribute('stroke-dashoffset') ?? '').not.toContain('NaN');
    }
  });

  test('wavy determinate draws sine-modulated paths (not plain arcs)', () => {
    const { container } = render(<Progress.Circular value={50} wavy aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar).toHaveAttribute('aria-valuenow', '50');
    // Wavy uses <path> for the active wave (+ inactive arc); no dashed circles.
    expect(container.querySelectorAll('circle')).toHaveLength(0);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
    // The active wave path has many line segments (sine samples) and no NaN.
    const active = paths[paths.length - 1] as SVGPathElement;
    const d = active.getAttribute('d') ?? '';
    expect(d).not.toContain('NaN');
    expect(d.split('L').length).toBeGreaterThan(10);
  });

  test('wavy draws a real path (not an M-only path) for a tiny value', () => {
    const { container } = render(<Progress.Circular value={0.2} wavy aria-label="処理中" />);
    const active = container.querySelectorAll('path');
    const d = (active[active.length - 1] as SVGPathElement).getAttribute('d') ?? '';
    // A tiny span must still include the endpoint, so it has at least one line-to.
    expect(d).toContain('L');
  });

  test('wavy is ignored while indeterminate (still a spinning circle)', () => {
    const { container } = render(<Progress.Circular wavy aria-label="処理中" />);
    const bar = screen.getByRole('progressbar', { name: '処理中' });
    expect(bar).toHaveAttribute('data-indeterminate');
    expect(container.querySelectorAll('circle')).toHaveLength(1);
    expect(container.querySelectorAll('path')).toHaveLength(0);
  });
});
