import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Toolbar, toolbarTv } from './toolbar';

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
  test('floating pill: rounded-full + elevation', () => {
    expect(toolbarTv({ variant: 'standard', orientation: 'horizontal' })).toContain('rounded-full');
    expect(toolbarTv({ variant: 'standard', orientation: 'horizontal' })).toContain(
      'shadow-level3',
    );
  });

  test('color roles per variant', () => {
    expect(toolbarTv({ variant: 'standard', orientation: 'horizontal' })).toContain(
      'bg-surface-container',
    );
    expect(toolbarTv({ variant: 'vibrant', orientation: 'horizontal' })).toContain(
      'bg-primary-container',
    );
  });

  test('vibrant forces interactive children to inherit the on-primary-container color', () => {
    expect(toolbarTv({ variant: 'vibrant', orientation: 'horizontal' })).toContain(
      '[&_button]:text-on-primary-container',
    );
  });
});
