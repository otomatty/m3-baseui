import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { LoadingIndicator, loadingIndicatorTv } from './loading-indicator';

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
  test('48dp box with a primary active indicator that animates', () => {
    const s = loadingIndicatorTv();
    expect(s.root()).toContain('size-12');
    expect(s.indicator()).toContain('fill-primary');
    expect(s.indicator()).toContain('animate-m3-loading');
  });

  test('contained adds a secondary-container container', () => {
    const s = loadingIndicatorTv({ contained: true });
    expect(s.root()).toContain('bg-secondary-container');
  });
});
