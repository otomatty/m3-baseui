import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Radio, RadioGroup, radioTv } from './radio';

describe('Radio', () => {
  test('exposes the radio role inside a group', () => {
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a" />
        <Radio value="b" />
      </RadioGroup>,
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  test('reflects the selected value via data-checked', () => {
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('data-checked');
    expect(screen.getByRole('radio', { name: 'B' })).not.toHaveAttribute('data-checked');
  });

  test('disabled uses M3 on-surface/38 tokens, not a blanket opacity', () => {
    const r = radioTv();
    expect(r.root()).toContain('data-[disabled]:border-on-surface/38');
    expect(r.root()).not.toContain('data-[disabled]:opacity-[0.38]');
    // the dot turns on-surface/38 too
    expect(r.indicator()).toContain('group-data-[disabled]:bg-on-surface/38');
  });

  test('unselected state layer tints with on-surface, selected with primary (M3)', () => {
    const r = radioTv();
    const root = r.root();
    expect(root).toContain('text-on-surface ');
    expect(root).not.toContain('text-on-surface-variant');
    expect(root).toContain('data-[checked]:text-primary');
  });
});
