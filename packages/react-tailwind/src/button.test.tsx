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
});
