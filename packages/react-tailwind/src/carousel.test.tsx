import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Carousel, carouselTv } from './carousel';

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

  test('Item throws outside Root', () => {
    expect(() => render(<Carousel.Item>orphan</Carousel.Item>)).toThrow();
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
});
