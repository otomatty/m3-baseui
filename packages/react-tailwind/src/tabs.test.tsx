import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from './tabs';

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
