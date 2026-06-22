import { describe, expect, test } from 'bun:test';
import { dialogTv } from './dialog';

// Dialog is a portal component; per CLAUDE.md interaction is covered by E2E. We
// assert the M3 token contract on the resolved class strings.
describe('Dialog tokens', () => {
  const d = dialogTv();

  test('scrim uses scrim/0.32', () => {
    expect(d.backdrop()).toContain('bg-scrim/32');
  });

  test('surface = surface-container-high, elevation level3, extra-large (28dp) corner', () => {
    expect(d.popup()).toContain('bg-surface-container-high');
    expect(d.popup()).toContain('shadow-level3');
    expect(d.popup()).toContain('rounded-extra-large');
  });

  test('headline = headline-small / on-surface (color + type both survive)', () => {
    expect(d.title()).toContain('text-headline-small');
    expect(d.title()).toContain('text-on-surface');
  });

  test('supporting text = body-medium / on-surface-variant (color + type both survive)', () => {
    expect(d.description()).toContain('text-body-medium');
    expect(d.description()).toContain('text-on-surface-variant');
  });
});
