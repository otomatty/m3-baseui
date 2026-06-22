import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Switch, switchTv } from './switch';

describe('Switch', () => {
  test('exposes the switch role', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  test('toggles data-checked on click (uncontrolled)', () => {
    render(<Switch />);
    const sw = screen.getByRole('switch');
    expect(sw).not.toHaveAttribute('data-checked');
    fireEvent.click(sw);
    expect(sw).toHaveAttribute('data-checked');
  });

  test('honors defaultChecked', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-checked');
  });

  test('handle grows to 28px while pressed (M3 squish), per state', () => {
    const s = switchTv();
    const thumb = s.thumb();
    // unselected pressed → 28px, hugging its side
    expect(thumb).toContain('group-active:size-7');
    expect(thumb).toContain('group-active:left-0');
    // selected pressed → 28px, hugging the other side
    expect(thumb).toContain('group-active:data-[checked]:size-7');
    expect(thumb).toContain('group-active:data-[checked]:left-5');
  });

  test('disabled uses M3 track/handle tokens, not a blanket opacity', () => {
    const s = switchTv();
    const root = s.root();
    // unselected disabled: faint track + faint outline
    expect(root).toContain('data-[disabled]:bg-surface-container-highest/12');
    expect(root).toContain('data-[disabled]:border-on-surface/12');
    // selected disabled: on-surface/12 track, no outline
    expect(root).toContain('data-[disabled]:data-[checked]:bg-on-surface/12');
    // and not the old blanket opacity
    expect(root).not.toContain('data-[disabled]:opacity-[0.38]');
    // handle: unselected on-surface/38, selected → surface
    expect(s.thumb()).toContain('group-data-[disabled]:bg-on-surface/38');
    expect(s.thumb()).toContain('group-data-[disabled]:data-[checked]:bg-surface');
  });
});
