import { describe, expect, test } from 'bun:test';
import { Menu, menuTv } from './menu';

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

  test('item supports a trailing shortcut slot pushed to the end', () => {
    expect(m.item()).toContain('[&_[data-slot=menu-trailing]]:ml-auto');
    expect(m.item()).toContain('[&_[data-slot=menu-leading]>svg]:size-6');
  });

  test('disabled is per-token (no blanket opacity): label on-surface/0.38, icons 0.38, no state layer', () => {
    // label + leading/trailing icon dim per-token; the state layer is suppressed
    expect(m.item()).toContain('data-[disabled]:text-on-surface/[0.38]');
    expect(m.item()).toContain('data-[disabled]:before:opacity-0');
    expect(m.item()).toContain(
      'data-[disabled]:[&_[data-slot=menu-leading]]:text-on-surface/[0.38]',
    );
    expect(m.item()).toContain(
      'data-[disabled]:[&_[data-slot=menu-trailing]]:text-on-surface/[0.38]',
    );
    // the old blanket opacity is gone from every interactive item
    expect(m.item()).not.toContain('data-[disabled]:opacity-[0.38]');
    expect(m.submenuTrigger()).not.toContain('data-[disabled]:opacity-[0.38]');
    expect(m.checkboxItem()).not.toContain('data-[disabled]:opacity-[0.38]');
    expect(m.radioItem()).not.toContain('data-[disabled]:opacity-[0.38]');
    expect(m.submenuTrigger()).toContain('data-[disabled]:text-on-surface/[0.38]');
    expect(m.checkboxItem()).toContain('data-[disabled]:text-on-surface/[0.38]');
    expect(m.radioItem()).toContain('data-[disabled]:text-on-surface/[0.38]');
    // the check/dot indicator dims with its disabled checked row (own text color)
    expect(m.itemIndicator()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
    // every interactive item type also disables pointer events
    expect(m.item()).toContain('data-[disabled]:pointer-events-none');
    expect(m.submenuTrigger()).toContain('data-[disabled]:pointer-events-none');
    expect(m.checkboxItem()).toContain('data-[disabled]:pointer-events-none');
    expect(m.radioItem()).toContain('data-[disabled]:pointer-events-none');
  });

  test('submenu trigger spreads its label + chevron and stays lit while open', () => {
    expect(m.submenuTrigger()).toContain('justify-between');
    expect(m.submenuTrigger()).toContain(
      'data-[popup-open]:before:opacity-[var(--md-sys-state-hover)]',
    );
  });

  test('selectable items reserve a 24px leading indicator column', () => {
    expect(m.checkboxItem()).toContain('grid-cols-[24px_1fr]');
    expect(m.radioItem()).toContain('grid-cols-[24px_1fr]');
    // indicator stays mounted but is hidden unless the item is checked
    expect(m.itemIndicator()).toContain('group-data-[checked]:visible');
  });
});

describe('Menu parts', () => {
  test('namespace exposes submenu + selectable item parts', () => {
    expect(Menu.SubmenuRoot).toBeDefined();
    expect(Menu.SubmenuTrigger).toBeDefined();
    expect(Menu.RadioGroup).toBeDefined();
    expect(Menu.CheckboxItem).toBeDefined();
    expect(Menu.RadioItem).toBeDefined();
    expect(Menu.CheckboxItemIndicator).toBeDefined();
    expect(Menu.RadioItemIndicator).toBeDefined();
    expect(Menu.Check).toBeDefined();
  });
});
