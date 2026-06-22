import { describe, expect, test } from 'bun:test';
import { tooltipTv } from './tooltip';

// Tooltip is a portal/positioned component; per CLAUDE.md its interaction is
// covered by E2E. Here we assert the M3 plain-tooltip token contract on the
// resolved class strings (container = inverse-surface, label = inverse-on-surface,
// body-small, 4dp corner, 24dp container height via 4px block padding).
describe('Tooltip tokens', () => {
  const t = tooltipTv();

  test('popup uses inverse-surface container and inverse-on-surface label', () => {
    // Both color and typescale survive the merge (configured tv keeps the
    // M3 `text-<role>` typescale separate from `text-<color>`).
    expect(t.popup()).toContain('bg-inverse-surface');
    expect(t.popup()).toContain('text-inverse-on-surface');
  });

  test('popup uses body-small type and extra-small (4dp) corner', () => {
    expect(t.popup()).toContain('text-body-small');
    expect(t.popup()).toContain('rounded-extra-small');
  });

  test('popup pads to a 24dp container height (py-1 = 4px block)', () => {
    expect(t.popup()).toContain('py-1');
    expect(t.popup()).not.toContain('py-1.5');
  });

  test('arrow matches the inverse-surface container', () => {
    expect(t.arrow()).toContain('text-inverse-surface');
  });
});
