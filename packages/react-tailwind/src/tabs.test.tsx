import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs, tabsTv } from './tabs';

function Example() {
  return (
    <Tabs.Root defaultValue="a">
      <Tabs.List>
        <Tabs.Tab value="a">A</Tabs.Tab>
        <Tabs.Tab value="b">B</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="a">Panel A</Tabs.Panel>
      <Tabs.Panel value="b">Panel B</Tabs.Panel>
    </Tabs.Root>
  );
}

describe('Tabs', () => {
  test('marks the active tab with Base UI data-active', () => {
    render(<Example />);
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('data-active');
    expect(screen.getByRole('tab', { name: 'B' })).not.toHaveAttribute('data-active');
  });

  test('moves data-active when another tab is selected', () => {
    render(<Example />);
    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('data-active');
    expect(screen.getByRole('tab', { name: 'A' })).not.toHaveAttribute('data-active');
  });

  test('wires the active-color class to the data-active selector', () => {
    render(<Example />);
    // The primary variant must key its active color off data-active (not data-selected).
    expect(screen.getByRole('tab', { name: 'A' }).className).toContain(
      'data-[active]:text-primary',
    );
  });
});

describe('Tabs tokens', () => {
  test('inactive label = on-surface-variant; primary active = primary, secondary active = on-surface', () => {
    const p = tabsTv({ variant: 'primary' });
    const s = tabsTv({ variant: 'secondary' });
    expect(p.tab()).toContain('text-on-surface-variant');
    expect(p.tab()).toContain('data-[active]:text-primary');
    expect(s.tab()).toContain('data-[active]:text-on-surface');
  });

  test('bottom divider uses surface-variant', () => {
    const p = tabsTv({ variant: 'primary' });
    expect(p.list()).toContain('border-surface-variant');
    expect(p.list()).not.toContain('border-outline-variant');
  });

  test('active indicator is primary, 3dp rounded for primary / 2dp square for secondary', () => {
    const p = tabsTv({ variant: 'primary' });
    const s = tabsTv({ variant: 'secondary' });
    expect(p.indicator()).toContain('bg-primary');
    expect(p.indicator()).toContain('h-[3px]');
    expect(p.indicator()).toContain('rounded-t-[3px]');
    expect(s.indicator()).toContain('bg-primary');
    expect(s.indicator()).toContain('h-[2px]');
    expect(s.indicator()).not.toContain('rounded-t-[3px]');
  });

  test('disabled is per-token (no blanket opacity): label + icon on-surface/0.38, no state layer', () => {
    const p = tabsTv({ variant: 'primary' });
    expect(p.tab()).toContain('data-[disabled]:text-on-surface/[0.38]');
    expect(p.tab()).toContain('data-[disabled]:before:opacity-0');
    expect(p.tab()).toContain('data-[disabled]:pointer-events-none');
    // the old blanket opacity is gone
    expect(p.tab()).not.toContain('data-[disabled]:opacity-[0.38]');
  });
});

describe('Tabs layout extensions', () => {
  test('primary tab with icon stacks vertically and grows to 64dp (M3)', () => {
    render(
      <Tabs.Root defaultValue="a" variant="primary">
        <Tabs.List>
          <Tabs.Tab value="a" icon={<svg data-testid="ti" />}>
            Home
          </Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
      </Tabs.Root>,
    );
    const tab = screen.getByRole('tab', { name: 'Home' });
    expect(tab).toHaveAttribute('data-with-icon');
    expect(tab.querySelector('[data-slot="tab-icon"]')).not.toBeNull();
    expect(screen.getByTestId('ti')).toBeInTheDocument();
    // primary icon-above layout
    expect(tab.className).toContain('data-[with-icon]:flex-col');
    expect(tab.className).toContain('data-[with-icon]:h-16');
  });

  test('scrollable list enables horizontal overflow (M3 scrollable tabs)', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List scrollable>
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
      </Tabs.Root>,
    );
    const list = screen.getByRole('tablist');
    expect(list).toHaveAttribute('data-scrollable');
    expect(list.className).toContain('data-[scrollable]:overflow-x-auto');
  });
});
