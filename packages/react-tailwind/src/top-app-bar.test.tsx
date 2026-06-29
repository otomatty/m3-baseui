import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { TopAppBar, topAppBarTv } from './top-app-bar';

describe('TopAppBar', () => {
  test('renders the headline, leading and trailing slots', () => {
    render(
      <TopAppBar
        leading={<button type="button">menu</button>}
        trailing={<button type="button">more</button>}
      >
        Page title
      </TopAppBar>,
    );
    expect(screen.getByText('Page title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'menu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'more' })).toBeInTheDocument();
  });

  test('defaults to the small variant and reflects it on data-variant', () => {
    const { container } = render(<TopAppBar>Title</TopAppBar>);
    const header = container.querySelector('header');
    expect(header).toHaveAttribute('data-variant', 'small');
  });

  test('exposes the chosen variant on data-variant', () => {
    const { container } = render(<TopAppBar variant="large">Title</TopAppBar>);
    expect(container.querySelector('header')).toHaveAttribute('data-variant', 'large');
  });
});

describe('TopAppBar tokens', () => {
  test('container is surface; small/center headline is title-large', () => {
    expect(topAppBarTv({ variant: 'small' }).root()).toContain('bg-surface');
    expect(topAppBarTv({ variant: 'small' }).headline()).toContain('text-title-large');
    expect(topAppBarTv({ variant: 'center' }).headline()).toContain('text-center');
  });

  test('medium/large grow taller and use headline typescales', () => {
    expect(topAppBarTv({ variant: 'medium' }).root()).toContain('h-28');
    expect(topAppBarTv({ variant: 'medium' }).headline()).toContain('text-headline-small');
    expect(topAppBarTv({ variant: 'large' }).root()).toContain('h-38');
    expect(topAppBarTv({ variant: 'large' }).headline()).toContain('text-headline-medium');
  });
});
