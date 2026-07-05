import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { LoadingIndicator, loadingIndicatorTv } from '../loading-indicator/loading-indicator';

describe('LoadingIndicator', () => {
  test('renders an indeterminate progressbar with an accessible name', () => {
    render(<LoadingIndicator aria-label="読み込み中" />);
    const bar = screen.getByRole('progressbar', { name: '読み込み中' });
    expect(bar).toBeInTheDocument();
    // Indeterminate: no numeric value is announced.
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  test('marks the contained variant with data-contained', () => {
    render(<LoadingIndicator aria-label="contained" contained />);
    expect(screen.getByRole('progressbar', { name: 'contained' })).toHaveAttribute(
      'data-contained',
      '',
    );
  });

  test('omits data-contained by default (uncontained)', () => {
    render(<LoadingIndicator aria-label="plain" />);
    expect(screen.getByRole('progressbar', { name: 'plain' })).not.toHaveAttribute(
      'data-contained',
    );
  });
});

describe('LoadingIndicator tokens', () => {
  test('38dp active indicator (primary) that animates', () => {
    const s = loadingIndicatorTv();
    expect(s.root()).toContain('[&_svg]:size-[38px]');
    expect(s.indicator()).toContain('fill-primary');
    expect(s.indicator()).toContain('animate-m3-loading');
    // Reduced motion halts the continuous rotation.
    expect(s.indicator()).toContain('motion-reduce:animate-none');
  });

  test('Expressive: contained is a 48dp primary-container pill with on-primary-container shape', () => {
    const s = loadingIndicatorTv({ contained: true });
    expect(s.root()).toContain('size-12');
    expect(s.root()).toContain('rounded-full');
    // Expressive contained config: PrimaryContainer / OnPrimaryContainer
    // (was wrongly secondary-container / primary).
    expect(s.root()).toContain('bg-primary-container');
    expect(s.root()).not.toContain('bg-secondary-container');
    expect(s.indicator()).toContain('fill-on-primary-container');
  });

  test('renders the 7-shape morph as a sampled SVG path', () => {
    const { container } = render(<LoadingIndicator aria-label="morph" />);
    const path = container.querySelector('path');
    expect(path).toBeTruthy();
    const d = path?.getAttribute('d') ?? '';
    // A sampled closed polyline (M … L … Z), not the old single flower path.
    expect(d.startsWith('M')).toBe(true);
    expect(d.endsWith('Z')).toBe(true);
    expect(d.split('L').length).toBeGreaterThan(20);
  });
});
