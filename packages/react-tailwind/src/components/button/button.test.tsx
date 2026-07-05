import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Button } from '../button/button';

describe('Button', () => {
  test('renders the filled variant by default', () => {
    render(<Button>Send</Button>);
    const btn = screen.getByRole('button', { name: 'Send' });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-primary');
  });

  test('applies the requested variant class', () => {
    // Expressive: outlined border is outline-variant (was outline).
    render(<Button variant="outlined">Cancel</Button>);
    expect(screen.getByRole('button', { name: 'Cancel' }).className).toContain(
      'border-outline-variant',
    );
  });

  test('changes host element via the render prop (polymorphism)', () => {
    // biome-ignore lint/a11y/useAnchorContent: content is injected by Button's children at runtime
    render(<Button render={<a href="/x" />}>Link</Button>);
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/x');
  });

  test('mounts a ripple host by default and omits it when disabled', () => {
    const { rerender } = render(<Button>R</Button>);
    expect(
      screen.getByRole('button', { name: 'R' }).querySelector('span[aria-hidden="true"]'),
    ).not.toBeNull();
    rerender(<Button ripple={false}>R</Button>);
    expect(
      screen.getByRole('button', { name: 'R' }).querySelector('span[aria-hidden="true"]'),
    ).toBeNull();
  });

  test('forwards the disabled attribute', () => {
    render(<Button disabled>D</Button>);
    expect(screen.getByRole('button', { name: 'D' })).toBeDisabled();
  });

  test('disabled filled uses Expressive container/label tokens (10% / on-surface-variant 38%)', () => {
    render(<Button disabled>D2</Button>);
    const btn = screen.getByRole('button', { name: 'D2' });
    // M3 Expressive: disabled container = on-surface 10%, label = on-surface-variant 38%
    expect(btn.className).toContain('disabled:bg-on-surface/10');
    expect(btn.className).toContain('disabled:text-on-surface-variant/38');
    // ...and not the old on-surface/12 container or whole-element opacity.
    expect(btn.className).not.toContain('disabled:bg-on-surface/12');
    expect(btn.className).not.toContain('disabled:opacity-[0.38]');
  });

  test('tonal keeps its pre-Expressive disabled container (0.12, unchanged upstream)', () => {
    render(
      <Button variant="tonal" disabled>
        T
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'T' });
    expect(btn.className).toContain('disabled:bg-on-surface/12');
  });

  test('elevated variant rises one elevation level on hover (M3 elevation)', () => {
    render(<Button variant="elevated">E</Button>);
    const btn = screen.getByRole('button', { name: 'E' });
    expect(btn.className).toContain('shadow-level1');
    expect(btn.className).toContain('hover:shadow-level2');
  });

  test('filled variant gains elevation on hover and stays flat when pressed', () => {
    render(<Button variant="filled">F</Button>);
    const btn = screen.getByRole('button', { name: 'F' });
    expect(btn.className).toContain('hover:shadow-level1');
    expect(btn.className).toContain('data-[pressed]:shadow-none');
  });

  test('outlined / text label uses on-surface-variant (Expressive), not primary', () => {
    render(
      <>
        <Button variant="outlined">O</Button>
        <Button variant="text">X</Button>
      </>,
    );
    expect(screen.getByRole('button', { name: 'O' }).className).toContain(
      'text-on-surface-variant',
    );
    expect(screen.getByRole('button', { name: 'X' }).className).toContain(
      'text-on-surface-variant',
    );
  });

  test('motion uses the spring-effects-default easing', () => {
    render(<Button>M</Button>);
    expect(screen.getByRole('button', { name: 'M' }).className).toContain(
      'ease-spring-effects-default',
    );
  });

  // ---- Size system (M3 Expressive) -----------------------------------------

  test('defaults to the S size (40dp height, labelLarge, symmetric 16dp padding)', () => {
    render(<Button>S</Button>);
    const btn = screen.getByRole('button', { name: 'S' });
    expect(btn.className).toContain('h-10'); // 40dp
    expect(btn.className).toContain('px-4'); // 16dp both sides
    expect(btn.className).toContain('text-label-large');
  });

  test.each([
    ['xs', 'h-8', 'text-label-large'],
    ['s', 'h-10', 'text-label-large'],
    ['m', 'h-14', 'text-title-medium'],
    ['l', 'h-24', 'text-headline-small'],
    ['xl', 'h-[136px]', 'text-headline-large'],
  ] as const)('size %s maps to its height + typescale', (size, height, type) => {
    render(<Button size={size}>Z</Button>);
    const btn = screen.getByRole('button', { name: 'Z' });
    expect(btn.className).toContain(height);
    expect(btn.className).toContain(type);
  });

  test('S size fix: icon is 20dp and padding stays symmetric (no asymmetric icon padding)', () => {
    render(<Button startIcon={<svg data-testid="lead" />}>Save</Button>);
    const btn = screen.getByRole('button', { name: 'Save' });
    // Icon presence is still flagged for the DOM contract...
    expect(btn).toHaveAttribute('data-with-start-icon');
    expect(btn.querySelector('[data-slot="button-icon"]')).not.toBeNull();
    // ...but the pre-Expressive asymmetric icon padding is gone.
    expect(btn.className).not.toContain('data-[with-start-icon]:pl-4');
    // Icon sizes to 20dp at S (was 18dp).
    expect(btn.className).toContain('[&_[data-slot=button-icon]>svg]:size-5');
  });

  // ---- Shape + morph -------------------------------------------------------

  test('round shape is a full pill; square shape rounds to the size corner', () => {
    const { rerender } = render(<Button shape="round">R</Button>);
    expect(screen.getByRole('button', { name: 'R' }).className).toContain('rounded-full');
    rerender(
      <Button shape="square" size="s">
        Q
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Q' }).className).toContain('rounded-medium'); // 12dp
  });

  test('pressed shape morph shrinks the corner (XS/S → small 8dp)', () => {
    render(<Button size="s">P</Button>);
    expect(screen.getByRole('button', { name: 'P' }).className).toContain(
      'data-[pressed]:rounded-small',
    );
  });

  // ---- Toggle (selected) ---------------------------------------------------

  test('selected drives aria-pressed + data-selected (toggle semantics)', () => {
    const { rerender } = render(<Button selected={false}>Tg</Button>);
    const btn = screen.getByRole('button', { name: 'Tg' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).not.toHaveAttribute('data-selected');
    rerender(<Button selected>Tg</Button>);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn).toHaveAttribute('data-selected');
  });

  test('non-toggle button has no aria-pressed', () => {
    render(<Button>Plain</Button>);
    expect(screen.getByRole('button', { name: 'Plain' })).not.toHaveAttribute('aria-pressed');
  });

  test('filled unselected toggle uses surface-container + on-surface-variant', () => {
    render(<Button selected={false}>U</Button>);
    const btn = screen.getByRole('button', { name: 'U' });
    expect(btn.className).toContain('bg-surface-container');
    expect(btn.className).toContain('text-on-surface-variant');
  });

  // ---- Icons ---------------------------------------------------------------

  test('leading icon mounts an icon slot', () => {
    render(<Button startIcon={<svg data-testid="lead" />}>Save</Button>);
    const btn = screen.getByRole('button', { name: 'Save' });
    expect(btn).toHaveAttribute('data-with-start-icon');
    expect(screen.getByTestId('lead')).toBeInTheDocument();
  });

  test('trailing icon mounts an icon slot', () => {
    render(<Button endIcon={<svg data-testid="trail" />}>Next</Button>);
    const btn = screen.getByRole('button', { name: 'Next' });
    expect(btn).toHaveAttribute('data-with-end-icon');
    expect(screen.getByTestId('trail')).toBeInTheDocument();
  });
});
