import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Carousel, carouselTv } from '../carousel/carousel';

describe('Carousel', () => {
  test('renders a carousel group with its items', () => {
    render(
      <Carousel.Root aria-label="gallery">
        <Carousel.Item>one</Carousel.Item>
        <Carousel.Item>two</Carousel.Item>
      </Carousel.Root>,
    );
    const group = screen.getByRole('group', { name: 'gallery' });
    expect(group).toHaveAttribute('aria-roledescription', 'carousel');
    // Scrollable region must be keyboard-accessible (focusable).
    expect(group).toHaveAttribute('tabindex', '0');
    expect(group).toHaveAttribute('data-variant', 'multi-browse');
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  test('hero variant is marked via data-variant', () => {
    render(
      <Carousel.Root aria-label="hero">
        <Carousel.Item>a</Carousel.Item>
      </Carousel.Root>,
    );
    // default
    expect(screen.getByRole('group', { name: 'hero' })).toHaveAttribute(
      'data-variant',
      'multi-browse',
    );
    render(
      <Carousel.Root aria-label="hero2" variant="hero">
        <Carousel.Item>a</Carousel.Item>
      </Carousel.Root>,
    );
    expect(screen.getByRole('group', { name: 'hero2' })).toHaveAttribute('data-variant', 'hero');
  });

  test('uncontained variant is marked and sizes items uniformly', () => {
    render(
      <Carousel.Root aria-label="uncontained" variant="uncontained">
        <Carousel.Item>a</Carousel.Item>
      </Carousel.Root>,
    );
    expect(screen.getByRole('group', { name: 'uncontained' })).toHaveAttribute(
      'data-variant',
      'uncontained',
    );
  });

  test('Item throws outside Root', () => {
    expect(() => render(<Carousel.Item>orphan</Carousel.Item>)).toThrow();
  });

  describe('keyboard scrolling', () => {
    test('arrow keys move the focused scroller (horizontal)', () => {
      render(
        <Carousel.Root aria-label="kbd">
          <Carousel.Item>a</Carousel.Item>
          <Carousel.Item>b</Carousel.Item>
        </Carousel.Root>,
      );
      const group = screen.getByRole('group', { name: 'kbd' });
      group.focus();
      // Arrow along the scroll axis is consumed (default prevented → returns false).
      expect(fireEvent.keyDown(group, { key: 'ArrowRight' })).toBe(false);
      expect(fireEvent.keyDown(group, { key: 'ArrowLeft' })).toBe(false);
      // Cross-axis / other keys are left to the browser.
      expect(fireEvent.keyDown(group, { key: 'ArrowUp' })).toBe(true);
      expect(fireEvent.keyDown(group, { key: 'Enter' })).toBe(true);
    });

    test('full-screen consumes the vertical arrows instead', () => {
      render(
        <Carousel.Root aria-label="fs" variant="full-screen">
          <Carousel.Item>a</Carousel.Item>
          <Carousel.Item>b</Carousel.Item>
        </Carousel.Root>,
      );
      const group = screen.getByRole('group', { name: 'fs' });
      group.focus();
      expect(fireEvent.keyDown(group, { key: 'ArrowDown' })).toBe(false);
      expect(fireEvent.keyDown(group, { key: 'ArrowRight' })).toBe(true);
    });

    test('a caller onKeyDown still runs and can opt out', () => {
      let seen = '';
      render(
        <Carousel.Root
          aria-label="cb"
          onKeyDown={(e) => {
            seen = e.key;
            e.preventDefault();
          }}
        >
          <Carousel.Item>a</Carousel.Item>
        </Carousel.Root>,
      );
      const group = screen.getByRole('group', { name: 'cb' });
      group.focus();
      // Caller prevented default first, so our handler must not double-scroll;
      // the event is still reported as consumed.
      expect(fireEvent.keyDown(group, { key: 'ArrowRight' })).toBe(false);
      expect(seen).toBe('ArrowRight');
    });
  });
});

describe('Carousel tokens', () => {
  test('root is a scroll-snap container', () => {
    const s = carouselTv({ variant: 'multi-browse' });
    expect(s.root()).toContain('overflow-x-auto');
    expect(s.root()).toContain('snap-x');
  });

  test('full-screen scrolls vertically', () => {
    const s = carouselTv({ variant: 'full-screen' });
    expect(s.root()).toContain('flex-col');
    expect(s.root()).toContain('snap-y');
  });

  test('uncontained is a horizontal single-size scroller', () => {
    const s = carouselTv({ variant: 'uncontained' });
    expect(s.root()).toContain('snap-x');
    expect(s.item()).toContain('w-56');
  });

  test('root carries a keyboard focus ring and honors reduced motion', () => {
    const s = carouselTv({ variant: 'multi-browse' });
    // Focus is only visible to keyboard users (WCAG 2.4.7).
    expect(s.root()).toContain('focus-visible:outline-secondary');
    // Smooth snap animation drops under prefers-reduced-motion.
    expect(s.root()).toContain('motion-reduce:scroll-auto');
  });
});
