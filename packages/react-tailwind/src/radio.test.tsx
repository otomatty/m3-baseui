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
    const tokens = radioTv().root().split(' ');
    expect(tokens).toContain('text-on-surface');
    expect(tokens).not.toContain('text-on-surface-variant');
    expect(tokens).toContain('data-[checked]:text-primary');
  });

  test('pressed state layer inverts color (M3): unselected→primary, selected→on-surface', () => {
    const root = radioTv().root();
    expect(root).toContain('active:text-primary');
    expect(root).toContain('data-[checked]:active:text-on-surface');
  });

  test('error prop sets data-error and tints with error tokens (M3)', () => {
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="A" error />
      </RadioGroup>,
    );
    const el = screen.getByRole('radio', { name: 'A' });
    expect(el).toHaveAttribute('data-error');
    const r = radioTv();
    expect(r.root()).toContain('data-[error]:border-error');
    expect(r.root()).toContain('data-[error]:text-error');
    // the dot turns error too
    expect(r.indicator()).toContain('group-data-[error]:bg-error');
  });

  test('exposes a transparent 48dp touch target (M3 a11y)', () => {
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="A" />
      </RadioGroup>,
    );
    const tt = screen.getByRole('radio').querySelector('[data-touch-target]');
    expect(tt).not.toBeNull();
    expect(tt).toHaveAttribute('aria-hidden', 'true');
    expect((tt as HTMLElement).style.position).toBe('absolute');
    expect((tt as HTMLElement).getAttribute('style')).toContain('48px');
  });
});
