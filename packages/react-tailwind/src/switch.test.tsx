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

  test('handle shifts color on hover/press per M3 state', () => {
    const s = switchTv();
    const thumb = s.thumb();
    // unselected handle: outline → on-surface-variant on hover/press
    expect(thumb).toContain('group-hover:bg-on-surface-variant');
    expect(thumb).toContain('group-active:bg-on-surface-variant');
    // selected handle: on-primary → primary-container on hover/press
    expect(thumb).toContain('group-hover:data-[checked]:bg-primary-container');
    expect(thumb).toContain('group-active:data-[checked]:bg-primary-container');
  });

  test('renders handle icons and enlarges the unchecked handle', () => {
    render(
      <Switch
        icons={{
          checked: <span data-testid="on">on</span>,
          unchecked: <span data-testid="off">off</span>,
        }}
      />,
    );
    // both icons stay mounted; CSS reveals the active one per state
    expect(screen.getByTestId('on')).toBeInTheDocument();
    expect(screen.getByTestId('off')).toBeInTheDocument();
    // thumb carries the with-icon marker that enlarges the unchecked handle
    expect(screen.getByRole('switch').querySelector('[data-with-icon]')).not.toBeNull();
  });

  test('with-icon sizing only applies to the unchecked handle', () => {
    const s = switchTv();
    expect(s.thumb()).toContain('data-[with-icon]:data-[unchecked]:size-6');
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

  test('exposes a transparent 48dp touch target (M3 a11y)', () => {
    render(<Switch />);
    const tt = screen.getByRole('switch').querySelector('[data-touch-target]');
    expect(tt).not.toBeNull();
    expect(tt).toHaveAttribute('aria-hidden', 'true');
    expect((tt as HTMLElement).style.position).toBe('absolute');
    expect((tt as HTMLElement).getAttribute('style')).toContain('48px');
  });
});
