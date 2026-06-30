import { describe, expect, test } from 'bun:test';
import { tooltipTv, richTooltipTv } from './tooltip';

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

// Rich tooltip (M3 second type, Popover-based): surface-container container,
// level2 elevation, medium (12dp) corner, 320dp max-width; optional title-small
// subhead, body-medium supporting text on on-surface-variant, and a row of
// text-button actions.
describe('Rich tooltip tokens', () => {
  const t = richTooltipTv();

  test('popup uses surface-container, level2 elevation and medium (12dp) corner', () => {
    expect(t.popup()).toContain('bg-surface-container');
    expect(t.popup()).toContain('text-on-surface');
    expect(t.popup()).toContain('shadow-level2');
    expect(t.popup()).toContain('rounded-medium');
  });

  test('popup caps at a 320dp max-width', () => {
    expect(t.popup()).toContain('max-w-[320px]');
  });

  test('arrow matches the surface-container container', () => {
    expect(t.arrow()).toContain('text-surface-container');
  });

  test('subhead uses title-small on on-surface', () => {
    expect(t.subhead()).toContain('text-title-small');
    expect(t.subhead()).toContain('text-on-surface');
  });

  test('supporting text uses body-medium on on-surface-variant', () => {
    expect(t.supportingText()).toContain('text-body-medium');
    expect(t.supportingText()).toContain('text-on-surface-variant');
  });

  test('actions lay out in a trailing row', () => {
    expect(t.actions()).toContain('flex');
  });
});
