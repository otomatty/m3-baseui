import { describe, expect, test } from 'bun:test';
import { menuTv } from './menu';

// Menu is a portal component; per CLAUDE.md interaction is covered by E2E. We
// assert the M3 token contract on the resolved class strings.
describe('Menu tokens', () => {
  const m = menuTv();

  test('surface = surface-container, elevation level2, extra-small corner', () => {
    expect(m.popup()).toContain('bg-surface-container');
    expect(m.popup()).toContain('shadow-level2');
    expect(m.popup()).toContain('rounded-extra-small');
  });

  test('item = 48dp, on-surface label, label-large type (color + type both survive)', () => {
    expect(m.item()).toContain('h-12');
    expect(m.item()).toContain('text-on-surface');
    expect(m.item()).toContain('text-label-large');
  });

  test('item has a state layer keyed to hover + Base UI data-highlighted', () => {
    expect(m.item()).toContain('hover:before:opacity-[var(--md-sys-state-hover)]');
    expect(m.item()).toContain('data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]');
  });
});
