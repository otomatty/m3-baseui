import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  test('renders the filled variant by default', () => {
    render(<Button>Send</Button>);
    const btn = screen.getByRole('button', { name: 'Send' });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-primary');
  });

  test('applies the requested variant class', () => {
    render(<Button variant="outlined">Cancel</Button>);
    expect(screen.getByRole('button', { name: 'Cancel' }).className).toContain('border-outline');
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

  test('disabled filled uses M3 container/label tokens, not a blanket opacity', () => {
    render(<Button disabled>D2</Button>);
    const btn = screen.getByRole('button', { name: 'D2' });
    // M3 (material-web): disabled container = on-surface 12%, label = on-surface 38%
    expect(btn.className).toContain('disabled:bg-on-surface/12');
    expect(btn.className).toContain('disabled:text-on-surface/38');
    // ...and not the old whole-element opacity:0.38
    expect(btn.className).not.toContain('disabled:opacity-[0.38]');
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
});
