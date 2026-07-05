import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { SplitButton, splitButtonTv } from '../split-button/split-button';

// SplitButton's dropdown is a portal component; per CLAUDE.md interaction is
// covered by E2E. Unit tests cover the (non-portal) leading + trailing surface
// and assert the M3 token contract on the resolved class strings.
function Basic(props: { variant?: 'filled' | 'tonal' | 'outlined' | 'elevated' } = {}) {
  return (
    <SplitButton.Root>
      <SplitButton.Group variant={props.variant} aria-label="保存">
        <SplitButton.Leading>保存</SplitButton.Leading>
        <SplitButton.Trailing aria-label="その他の保存オプション" />
      </SplitButton.Group>
      <SplitButton.Portal>
        <SplitButton.Positioner>
          <SplitButton.Popup>
            <SplitButton.Item>下書き保存</SplitButton.Item>
          </SplitButton.Popup>
        </SplitButton.Positioner>
      </SplitButton.Portal>
    </SplitButton.Root>
  );
}

describe('SplitButton', () => {
  test('renders the leading action and trailing menu trigger grouped', () => {
    render(<Basic />);
    expect(screen.getByRole('group', { name: '保存' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'その他の保存オプション' });
    expect(trigger).toHaveAttribute('aria-haspopup');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('leading defaults to type=button (does not submit forms)', () => {
    render(<Basic />);
    expect(screen.getByRole('button', { name: '保存' })).toHaveAttribute('type', 'button');
  });

  test('leading and trailing share the variant container color', () => {
    render(<Basic variant="tonal" />);
    expect(screen.getByRole('button', { name: '保存' }).className).toContain(
      'bg-secondary-container',
    );
    expect(screen.getByRole('button', { name: 'その他の保存オプション' }).className).toContain(
      'bg-secondary-container',
    );
  });

  test('Expressive: the seam corner is extra-small (4dp) and morphs to medium on hover/press', () => {
    const t = splitButtonTv({ variant: 'filled' });
    // Static seam = extra-small (was small/8dp); outer corners stay full.
    expect(t.leading()).toContain('rounded-e-extra-small');
    expect(t.leading()).toContain('rounded-s-full');
    expect(t.trailing()).toContain('rounded-s-extra-small');
    expect(t.trailing()).toContain('rounded-e-full');
    // Hover/press morph the seam to medium (12dp); the trailing morph is gated
    // off while the menu is open (open → full circle must win).
    expect(t.leading()).toContain('hover:rounded-e-medium');
    expect(t.leading()).toContain('data-[pressed]:rounded-e-medium');
    expect(t.trailing()).toContain('[&:hover:not([data-popup-open])]:rounded-s-medium');
    expect(t.trailing()).toContain('[&[data-pressed]:not([data-popup-open])]:rounded-s-medium');
  });

  test('Expressive: the trailing button morphs to a full circle while the menu is open', () => {
    const t = splitButtonTv({ variant: 'filled' });
    expect(t.trailing()).toContain('group');
    // The chevron rotates AND the trailing button becomes a full circle.
    expect(t.chevron()).toContain('group-data-[popup-open]:rotate-180');
    expect(t.trailing()).toContain('data-[popup-open]:rounded-full');
  });

  test('Expressive: the trailing icon is 22dp', () => {
    expect(splitButtonTv().chevron()).toContain('[&>svg]:size-[22px]');
  });

  test('popup close mirrors open (opacity + scale) — drop-in with the VE build', () => {
    const popup = splitButtonTv().popup();
    expect(popup).toContain('data-[starting-style]:scale-95');
    expect(popup).toContain('data-[ending-style]:scale-95');
  });

  test('surfaces carry a currentColor ::before state layer and the M3 focus ring', () => {
    const t = splitButtonTv({ variant: 'filled' });
    expect(t.leading()).toContain('before:bg-current');
    expect(t.leading()).toContain('hover:before:opacity-[var(--md-sys-state-hover)]');
    expect(t.leading()).toContain('focus-visible:outline-[3px]');
  });

  test('variant disabled is per-token (no blanket fade)', () => {
    const t = splitButtonTv({ variant: 'filled' });
    expect(t.leading()).toContain('disabled:bg-on-surface/12');
    expect(t.leading()).toContain('disabled:text-on-surface/38');
    expect(t.leading()).toContain('data-[disabled]:bg-on-surface/12');
    expect(t.leading()).not.toContain('disabled:opacity-[0.38]');
  });

  test('dropdown popup is a surface-container menu surface; item is 48dp', () => {
    expect(splitButtonTv().popup()).toContain('bg-surface-container');
    expect(splitButtonTv().popup()).toContain('shadow-level2');
    expect(splitButtonTv().item()).toContain('h-12');
    expect(splitButtonTv().item()).toContain('text-label-large');
  });

  test('namespace exposes Root/Group/Leading/Trailing/Portal/Positioner/Popup/Item', () => {
    expect(SplitButton.Root).toBeDefined();
    expect(SplitButton.Group).toBeDefined();
    expect(SplitButton.Leading).toBeDefined();
    expect(SplitButton.Trailing).toBeDefined();
    expect(SplitButton.Portal).toBeDefined();
    expect(SplitButton.Positioner).toBeDefined();
    expect(SplitButton.Popup).toBeDefined();
    expect(SplitButton.Item).toBeDefined();
  });
});
