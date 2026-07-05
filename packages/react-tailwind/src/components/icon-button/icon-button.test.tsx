import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { IconButton } from '../icon-button/icon-button';

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

  test('unselected filled toggle uses surface-container + on-surface-variant (M3 Expressive)', () => {
    render(
      <IconButton variant="filled" selected={false} aria-label="Fav">
        ♥
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Fav' });
    expect(btn.className).toContain('bg-surface-container');
    expect(btn.className).toContain('text-on-surface-variant');
    // Not the pre-Expressive surface-container-highest + primary.
    expect(btn.className).not.toContain('bg-surface-container-highest');
  });

  test('selected filled toggle keeps the primary container (M3)', () => {
    render(
      <IconButton variant="filled" selected aria-label="Fav2">
        ♥
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Fav2' });
    expect(btn.className).toContain('bg-primary');
    expect(btn.className).toContain('text-on-primary');
  });

  test('selected tonal toggle switches to secondary/on-secondary (Expressive fix)', () => {
    const { rerender } = render(
      <IconButton variant="tonal" selected={false} aria-label="T">
        ★
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'T' });
    // Unselected = the variant default (secondary-container).
    expect(btn.className).toContain('bg-secondary-container');
    rerender(
      <IconButton variant="tonal" selected aria-label="T">
        ★
      </IconButton>,
    );
    // Selected raises to secondary/on-secondary so the toggle is visible.
    expect(btn.className).toContain('bg-secondary');
    expect(btn.className).toContain('text-on-secondary');
  });

  test('standard selected raises the icon to primary', () => {
    render(
      <IconButton selected aria-label="S">
        ★
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'S' }).className).toContain('text-primary');
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

  test('disabled filled uses M3 Expressive container/label tokens (0.1), not a blanket opacity', () => {
    render(
      <IconButton variant="filled" disabled aria-label="Off">
        ✕
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Off' });
    expect(btn.className).toContain('disabled:bg-on-surface/10');
    expect(btn.className).toContain('disabled:text-on-surface/38');
    expect(btn.className).not.toContain('disabled:opacity-[0.38]');
  });

  test('outlined outline is outline-variant, enabled and disabled (M3 Expressive)', () => {
    const { rerender } = render(
      <IconButton variant="outlined" aria-label="On">
        ✕
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'On' }).className).toContain(
      'border-outline-variant',
    );
    rerender(
      <IconButton variant="outlined" disabled aria-label="On">
        ✕
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'On' });
    expect(btn.className).toContain('disabled:border-outline-variant');
    expect(btn.className).toContain('disabled:text-on-surface/38');
  });

  test('outlined border thickens at L (2px) and XL (3px) per M3 Expressive', () => {
    render(
      <>
        <IconButton variant="outlined" size="l" aria-label="OL">
          ✕
        </IconButton>
        <IconButton variant="outlined" size="xl" aria-label="OXL">
          ✕
        </IconButton>
      </>,
    );
    expect(screen.getByRole('button', { name: 'OL' }).className).toContain('border-2');
    expect(screen.getByRole('button', { name: 'OXL' }).className).toContain('border-[3px]');
  });

  // ---- Shape + morph -------------------------------------------------------

  test('round shape is a full circle; square shape rounds to the size corner', () => {
    const { rerender } = render(
      <IconButton shape="round" aria-label="Sh">
        ●
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'Sh' }).className).toContain('rounded-full');
    rerender(
      <IconButton shape="square" size="s" aria-label="Sh">
        ●
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'Sh' }).className).toContain('rounded-medium'); // 12dp
  });

  test('pressed shape morph shrinks the corner (XS/S → small 8dp)', () => {
    render(
      <IconButton size="s" aria-label="P">
        ●
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'P' }).className).toContain(
      'data-[pressed]:rounded-small',
    );
  });

  test('selected round container morphs to the square corner (no leftover rounded-full)', () => {
    render(
      <IconButton shape="round" size="s" selected aria-label="Rs">
        ●
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Rs' });
    expect(btn.className).toContain('rounded-medium'); // swapped to square
    expect(btn.className).not.toContain('rounded-full'); // resting round dropped
  });

  test('selected square container morphs to full (round↔square inversion)', () => {
    render(
      <IconButton shape="square" size="s" selected aria-label="Sq">
        ●
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'Sq' });
    expect(btn.className).toContain('rounded-full');
    expect(btn.className).not.toContain('rounded-medium');
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
    // Assert each dimension so a regression in only one is still caught.
    expect((tt as HTMLElement).style.minWidth).toBe('48px');
    expect((tt as HTMLElement).style.minHeight).toBe('48px');
  });
});
