import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { IconButton } from './icon-button';

describe('IconButton', () => {
  test('renders the standard variant by default', () => {
    render(<IconButton aria-label="Settings">⚙</IconButton>);
    const btn = screen.getByRole('button', { name: 'Settings' });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('text-on-surface-variant');
  });

  test('toggle exposes aria-pressed and data-selected', () => {
    const { rerender } = render(
      <IconButton aria-label="Star" selected={false}>
        ★
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Star' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).not.toHaveAttribute('data-selected');
    rerender(
      <IconButton aria-label="Star" selected={true}>
        ★
      </IconButton>,
    );
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn).toHaveAttribute('data-selected');
  });

  test('plain (non-toggle) buttons get no aria-pressed', () => {
    render(<IconButton aria-label="Plain">★</IconButton>);
    expect(screen.getByRole('button', { name: 'Plain' })).not.toHaveAttribute('aria-pressed');
  });

  test('unselected filled toggle uses the surface-container-highest container (M3)', () => {
    render(
      <IconButton variant="filled" selected={false} aria-label="Fav">
        ♥
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'Fav' }).className).toContain(
      'bg-surface-container-highest',
    );
  });

  test('selected outlined toggle inverts to inverse-surface (M3)', () => {
    render(
      <IconButton variant="outlined" selected={true} aria-label="Lock">
        🔒
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Lock' });
    expect(btn.className).toContain('bg-inverse-surface');
    expect(btn.className).toContain('text-inverse-on-surface');
  });

  test('disabled filled uses M3 container/label tokens, not a blanket opacity', () => {
    render(
      <IconButton variant="filled" disabled aria-label="Off">
        ✕
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Off' });
    expect(btn.className).toContain('disabled:bg-on-surface/12');
    expect(btn.className).toContain('disabled:text-on-surface/38');
    expect(btn.className).not.toContain('disabled:opacity-[0.38]');
  });

  test('disabled outlined dims the outline to on-surface/12 (M3)', () => {
    render(
      <IconButton variant="outlined" disabled aria-label="Off2">
        ✕
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Off2' });
    expect(btn.className).toContain('disabled:border-on-surface/12');
    expect(btn.className).toContain('disabled:text-on-surface/38');
  });

  test('defaults to the 40dp (small) container for back-compat', () => {
    render(<IconButton aria-label="D">●</IconButton>);
    expect(screen.getByRole('button', { name: 'D' }).className).toContain('h-10');
  });

  test('M3 Expressive size + width variants set container dimensions', () => {
    render(
      <>
        <IconButton aria-label="XS" size="xs">
          ●
        </IconButton>
        <IconButton aria-label="XL" size="xl">
          ●
        </IconButton>
        <IconButton aria-label="L-Wide" size="l" width="wide">
          ●
        </IconButton>
        <IconButton aria-label="L-Narrow" size="l" width="narrow">
          ●
        </IconButton>
      </>,
    );
    // height scales per size (xs 32dp → xl 136dp)
    expect(screen.getByRole('button', { name: 'XS' }).className).toContain('h-8');
    expect(screen.getByRole('button', { name: 'XL' }).className).toContain('h-[136px]');
    // width scales per (size, width): large/wide = 128dp, large/narrow = 64dp
    expect(screen.getByRole('button', { name: 'L-Wide' }).className).toContain('w-32');
    expect(screen.getByRole('button', { name: 'L-Narrow' }).className).toContain('w-16');
  });

  test('mounts a ripple host by default and omits it when disabled', () => {
    // The touch target is also an aria-hidden span, so scope the query to the
    // ripple host (which carries no data-touch-target).
    const rippleHost = 'span[aria-hidden="true"]:not([data-touch-target])';
    const { rerender } = render(<IconButton aria-label="R">●</IconButton>);
    expect(screen.getByRole('button', { name: 'R' }).querySelector(rippleHost)).not.toBeNull();
    rerender(
      <IconButton aria-label="R" ripple={false}>
        ●
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'R' }).querySelector(rippleHost)).toBeNull();
  });

  test('exposes a transparent 48dp touch target (M3 a11y)', () => {
    render(<IconButton aria-label="T">●</IconButton>);
    const tt = screen.getByRole('button', { name: 'T' }).querySelector('[data-touch-target]');
    expect(tt).not.toBeNull();
    expect((tt as HTMLElement).style.position).toBe('absolute');
    expect((tt as HTMLElement).getAttribute('style')).toContain('48px');
  });
});
