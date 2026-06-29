import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationRail, navigationRailTv } from './navigation-rail';

function Example() {
  return (
    <NavigationRail.Root defaultValue={['home']} header={<button type="button">menu</button>}>
      <NavigationRail.Item value="home" icon={<span>H</span>}>
        ホーム
      </NavigationRail.Item>
      <NavigationRail.Item value="search" icon={<span>S</span>}>
        検索
      </NavigationRail.Item>
    </NavigationRail.Root>
  );
}

describe('NavigationRail', () => {
  test('renders the header region', () => {
    render(<Example />);
    expect(screen.getByRole('button', { name: 'menu' })).toBeInTheDocument();
  });

  test('marks the default destination as pressed', () => {
    render(<Example />);
    expect(screen.getByRole('button', { name: /ホーム/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /検索/ })).toHaveAttribute('aria-pressed', 'false');
  });

  test('moves the selection (data-pressed) when another destination is clicked', () => {
    render(<Example />);
    fireEvent.click(screen.getByRole('button', { name: /検索/ }));
    expect(screen.getByRole('button', { name: /検索/ })).toHaveAttribute('data-pressed');
    expect(screen.getByRole('button', { name: /ホーム/ })).not.toHaveAttribute('data-pressed');
  });

  test('keeps the active destination selected when it is tapped again', () => {
    render(<Example />);
    const home = screen.getByRole('button', { name: /ホーム/ });
    fireEvent.click(home);
    expect(home).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('NavigationRail tokens', () => {
  test('80dp vertical rail on surface', () => {
    const s = navigationRailTv();
    expect(s.root()).toContain('w-20');
    expect(s.root()).toContain('flex-col');
    expect(s.root()).toContain('bg-surface');
  });

  test('disabled is per-token (icon + label on-surface/0.38, no state layer)', () => {
    const s = navigationRailTv();
    expect(s.icon()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
    expect(s.label()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
    expect(s.indicator()).toContain('group-data-[disabled]:before:opacity-0');
  });
});
