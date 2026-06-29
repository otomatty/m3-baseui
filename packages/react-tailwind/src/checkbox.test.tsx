import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Checkbox, checkboxTv } from './checkbox';

describe('Checkbox', () => {
  test('exposes the checkbox role', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('reflects defaultChecked via data-checked', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-checked');
  });

  test('reflects indeterminate via data-indeterminate', () => {
    render(<Checkbox indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-indeterminate');
  });

  test('disabled uses M3 tokens, not a blanket opacity', () => {
    render(<Checkbox disabled />);
    const el = screen.getByRole('checkbox');
    expect(el).toHaveAttribute('data-disabled');
    const tokens = el.className.split(' ');
    // unselected disabled: faint outline
    expect(tokens).toContain('data-[disabled]:border-on-surface/38');
    // selected/indeterminate disabled: faint filled box, no outline
    expect(tokens).toContain('data-[disabled]:data-[checked]:bg-on-surface/38');
    expect(tokens).toContain('data-[disabled]:data-[indeterminate]:bg-on-surface/38');
    expect(tokens).not.toContain('data-[disabled]:opacity-[0.38]');
    // disabled check/dash use the surface color (on the indicator slot)
    const indicator = el.querySelector('span');
    expect(indicator?.className.split(' ')).toContain('group-data-[disabled]:text-surface');
  });

  test('unselected state layer tints with on-surface, selected with primary (M3)', () => {
    render(<Checkbox />);
    const tokens = screen.getByRole('checkbox').className.split(' ');
    expect(tokens).toContain('text-on-surface');
    expect(tokens).not.toContain('text-on-surface-variant');
    expect(tokens).toContain('data-[checked]:text-primary');
  });

  test('pressed state layer inverts color (M3): unselected→primary, selected→on-surface', () => {
    render(<Checkbox />);
    const tokens = screen.getByRole('checkbox').className.split(' ');
    expect(tokens).toContain('active:text-primary');
    expect(tokens).toContain('data-[checked]:active:text-on-surface');
    expect(tokens).toContain('data-[indeterminate]:active:text-on-surface');
  });

  test('exposes a transparent 48dp touch target (M3 a11y)', () => {
    render(<Checkbox />);
    const tt = screen.getByRole('checkbox').querySelector('[data-touch-target]');
    expect(tt).not.toBeNull();
    expect(tt).toHaveAttribute('aria-hidden', 'true');
    expect((tt as HTMLElement).style.position).toBe('absolute');
    // Assert each dimension so a regression in only one is still caught.
    expect((tt as HTMLElement).style.minWidth).toBe('48px');
    expect((tt as HTMLElement).style.minHeight).toBe('48px');
  });

  test('selection indicator uses M3 asymmetric motion (enter decelerate / exit accelerate)', () => {
    const ind = checkboxTv().indicator();
    // unselected-exit: emphasized-accelerate over 150ms (short3)
    expect(ind).toContain('ease-emphasized-accelerate');
    expect(ind).toContain('duration-[var(--md-sys-motion-duration-short3)]');
    // selected-enter: emphasized-decelerate over 350ms (medium3), for both states
    expect(ind).toContain('data-[checked]:ease-emphasized-decelerate');
    expect(ind).toContain('data-[checked]:duration-[var(--md-sys-motion-duration-medium3)]');
    expect(ind).toContain('data-[indeterminate]:ease-emphasized-decelerate');
    expect(ind).toContain('data-[indeterminate]:duration-[var(--md-sys-motion-duration-medium3)]');
    // no longer the flat house-style (duration-150 ease-standard) on the indicator
    expect(ind).not.toContain('ease-standard');
  });

  test('error prop sets data-error and tints with error tokens (M3)', () => {
    render(<Checkbox error />);
    const el = screen.getByRole('checkbox');
    expect(el).toHaveAttribute('data-error');
    const tokens = el.className.split(' ');
    // unselected error: error outline + error state layer
    expect(tokens).toContain('data-[error]:border-error');
    expect(tokens).toContain('data-[error]:text-error');
    // selected error: error-filled box
    expect(tokens).toContain('data-[error]:data-[checked]:bg-error');
    // check turns on-error on the error-filled box
    const indicator = el.querySelector('span');
    expect(indicator?.className.split(' ')).toContain('group-data-[error]:text-on-error');
  });
});
