import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { FabMenu, fabMenuTv } from './fab-menu';

// FabMenu is a portal component; per CLAUDE.md interaction is covered by E2E.
// We assert the M3 token contract on the resolved class strings + the namespace,
// and the (non-portal) FAB trigger via a render.
describe('FabMenu tokens', () => {
  test('popup stacks the action items in a column with M3 enter/exit motion', () => {
    const popup = fabMenuTv().popup();
    expect(popup).toContain('flex');
    expect(popup).toContain('flex-col');
    expect(popup).toContain('items-end');
    expect(popup).toContain('data-[starting-style]:opacity-0');
    expect(popup).toContain('data-[ending-style]:opacity-0');
  });

  test('item is a 56dp full-corner pill with label-large type + elevation', () => {
    const item = fabMenuTv({ color: 'primary' }).item();
    expect(item).toContain('h-14');
    expect(item).toContain('rounded-full');
    expect(item).toContain('text-label-large');
    expect(item).toContain('shadow-level3');
  });

  test('item color maps to container / on-container tokens', () => {
    expect(fabMenuTv({ color: 'primary' }).item()).toContain('bg-primary-container');
    expect(fabMenuTv({ color: 'primary' }).item()).toContain('text-on-primary-container');
    expect(fabMenuTv({ color: 'tertiary' }).item()).toContain('bg-tertiary-container');
    expect(fabMenuTv({ color: 'tertiary' }).item()).toContain('text-on-tertiary-container');
  });

  test('item has a currentColor ::before state layer keyed to hover + data-highlighted', () => {
    const item = fabMenuTv({ color: 'primary' }).item();
    expect(item).toContain('before:bg-current');
    expect(item).toContain('hover:before:opacity-[var(--md-sys-state-hover)]');
    expect(item).toContain('data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]');
    expect(item).toContain('active:before:opacity-[var(--md-sys-state-pressed)]');
  });

  test('item disabled is per-token, not a blanket fade', () => {
    const item = fabMenuTv({ color: 'primary' }).item();
    expect(item).toContain('data-[disabled]:bg-on-surface/12');
    expect(item).toContain('data-[disabled]:text-on-surface/38');
    expect(item).toContain('data-[disabled]:shadow-none');
    expect(item).toContain('data-[disabled]:before:opacity-0');
    expect(item).not.toContain('data-[disabled]:opacity-[0.38]');
  });

  test('leading icon slot sizes the svg to 24dp', () => {
    const item = fabMenuTv({ color: 'primary' }).item();
    expect(item).toContain('[&_[data-slot=fab-menu-leading]>svg]:size-6');
  });
});

describe('FabMenu parts', () => {
  test('namespace exposes Root/Trigger/Portal/Positioner/Popup/Item', () => {
    expect(FabMenu.Root).toBeDefined();
    expect(FabMenu.Trigger).toBeDefined();
    expect(FabMenu.Portal).toBeDefined();
    expect(FabMenu.Positioner).toBeDefined();
    expect(FabMenu.Popup).toBeDefined();
    expect(FabMenu.Item).toBeDefined();
  });

  test('trigger renders a FAB-styled button (same container tokens as Fab)', () => {
    render(
      <FabMenu.Root>
        <FabMenu.Trigger color="primary" aria-label="作成">
          <svg viewBox="0 0 24 24" />
        </FabMenu.Trigger>
      </FabMenu.Root>,
    );
    const trigger = screen.getByRole('button', { name: '作成' });
    expect(trigger.className).toContain('bg-primary-container');
    expect(trigger.className).toContain('rounded-large');
    expect(trigger.className).toContain('shadow-level3');
  });
});
