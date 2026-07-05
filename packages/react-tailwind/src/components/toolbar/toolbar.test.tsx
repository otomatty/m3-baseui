import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Toolbar, toolbarTv } from '../toolbar/toolbar';

describe('Toolbar', () => {
  test('renders its actions inside a toolbar', () => {
    render(
      <Toolbar aria-label="format">
        <button type="button">bold</button>
        <button type="button">italic</button>
      </Toolbar>,
    );
    const bar = screen.getByRole('toolbar', { name: 'format' });
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('data-variant', 'standard');
    expect(bar).toHaveAttribute('data-orientation', 'horizontal');
    expect(screen.getByRole('button', { name: 'bold' })).toBeInTheDocument();
  });

  test('vibrant variant is marked via data-variant', () => {
    render(<Toolbar aria-label="v" variant="vibrant" />);
    expect(screen.getByRole('toolbar', { name: 'v' })).toHaveAttribute('data-variant', 'vibrant');
  });

  test('vertical orientation sets aria-orientation and data-orientation', () => {
    render(<Toolbar aria-label="vert" orientation="vertical" />);
    const bar = screen.getByRole('toolbar', { name: 'vert' });
    expect(bar).toHaveAttribute('aria-orientation', 'vertical');
    expect(bar).toHaveAttribute('data-orientation', 'vertical');
  });
});

describe('Toolbar tokens', () => {
  test('Expressive: floating pill is rounded-full with NO elevation (Level0)', () => {
    const cls = toolbarTv({ type: 'floating', variant: 'standard', orientation: 'horizontal' });
    expect(cls).toContain('rounded-full');
    // Compose FloatingToolbar defaults to Level0 — the level3 shadow is removed.
    expect(cls).not.toContain('shadow-level3');
  });

  test('Expressive: docked is a square-cornered, full-width surface-container bar', () => {
    const cls = toolbarTv({ type: 'docked', variant: 'standard', orientation: 'horizontal' });
    expect(cls).toContain('rounded-none');
    expect(cls).toContain('w-full');
    expect(cls).toContain('bg-surface-container');
    // 16dp leading/trailing space.
    expect(cls).toContain('px-4');
  });

  test('Expressive: standard content is on-surface (was on-surface-variant)', () => {
    const cls = toolbarTv({ variant: 'standard', orientation: 'horizontal' });
    expect(cls).toContain('text-on-surface');
    expect(cls).not.toContain('text-on-surface-variant');
  });

  test('color roles per variant', () => {
    expect(toolbarTv({ variant: 'standard', orientation: 'horizontal' })).toContain(
      'bg-surface-container',
    );
    expect(toolbarTv({ variant: 'vibrant', orientation: 'horizontal' })).toContain(
      'bg-primary-container',
    );
  });

  test('floating vibrant forces interactive children to the on-primary-container color', () => {
    const cls = toolbarTv({ type: 'floating', variant: 'vibrant', orientation: 'horizontal' });
    expect(cls).toContain('[&_button]:text-on-primary-container');
    expect(cls).toContain('[&_a]:text-on-primary-container');
  });

  test('docked vibrant does NOT force children (docked is always surface-container)', () => {
    const cls = toolbarTv({ type: 'docked', variant: 'vibrant', orientation: 'horizontal' });
    // Root reverts to surface-container; children keep their own colors.
    expect(cls).toContain('bg-surface-container');
    expect(cls).not.toContain('[&_button]:text-on-primary-container');
    expect(cls).not.toContain('[&_a]:text-on-primary-container');
  });

  test('Expressive: a data-expanded=false hook collapses the bar (show/hide)', () => {
    const cls = toolbarTv();
    expect(cls).toContain('data-[expanded=false]:opacity-0');
    expect(cls).toContain('ease-spring-spatial-fast');
  });
});
