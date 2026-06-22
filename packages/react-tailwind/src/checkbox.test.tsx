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
    const c = checkboxTv();
    const root = c.root();
    // unselected disabled: faint outline
    expect(root).toContain('data-[disabled]:border-on-surface/38');
    // selected/indeterminate disabled: faint filled box, no outline
    expect(root).toContain('data-[disabled]:data-[checked]:bg-on-surface/38');
    expect(root).toContain('data-[disabled]:data-[indeterminate]:bg-on-surface/38');
    expect(root).not.toContain('data-[disabled]:opacity-[0.38]');
    // disabled check/dash use the surface color
    expect(c.indicator()).toContain('group-data-[disabled]:text-surface');
  });

  test('unselected state layer tints with on-surface, selected with primary (M3)', () => {
    const c = checkboxTv();
    const root = c.root();
    expect(root).toContain('text-on-surface ');
    expect(root).not.toContain('text-on-surface-variant');
    expect(root).toContain('data-[checked]:text-primary');
  });
});
