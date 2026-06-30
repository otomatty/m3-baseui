import { describe, expect, test } from 'bun:test';
import { dialogTv } from './dialog';

// Dialog is a portal component; per CLAUDE.md interaction is covered by E2E. We
// assert the M3 token contract on the resolved class strings.
describe('Dialog tokens', () => {
  const d = dialogTv();

  test('scrim uses scrim/0.32', () => {
    expect(d.backdrop()).toContain('bg-scrim/32');
  });

  test('basic surface = surface-container-high, elevation level3, extra-large (28dp) corner', () => {
    const popup = dialogTv({ fullscreen: false }).popup();
    expect(popup).toContain('bg-surface-container-high');
    expect(popup).toContain('shadow-level3');
    expect(popup).toContain('rounded-extra-large');
  });

  test('basic dialog is 280–560dp wide (min-width set)', () => {
    const popup = dialogTv({ fullscreen: false }).popup();
    expect(popup).toContain('w-[min(560px,calc(100vw-48px))]');
    expect(popup).toContain('min-w-[280px]');
  });

  test('fullscreen variant is edge-to-edge surface (no scrim card)', () => {
    const popup = dialogTv({ fullscreen: true }).popup();
    expect(popup).toContain('inset-0');
    expect(popup).toContain('bg-surface');
    expect(popup).toContain('rounded-none');
    expect(popup).not.toContain('rounded-extra-large');
  });

  test('icon presence center-aligns the headline + supporting text', () => {
    expect(d.popup()).toContain('has-[[data-slot=dialog-icon]]:text-center');
  });

  test('hero icon is the secondary color', () => {
    expect(d.icon()).toContain('text-secondary');
  });

  test('divider is a 1dp outline-variant rule', () => {
    expect(d.divider()).toContain('h-px');
    expect(d.divider()).toContain('bg-outline-variant');
  });

  test('actions are end-aligned with 8dp between buttons', () => {
    expect(d.actions()).toContain('justify-end');
    expect(d.actions()).toContain('gap-2');
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
