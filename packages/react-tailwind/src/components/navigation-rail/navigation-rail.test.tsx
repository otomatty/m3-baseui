import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationRail, navigationRailTv } from '../navigation-rail/navigation-rail';

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
  test('Expressive: 96dp collapsed rail on surface, 44dp top space, 4dp item gap', () => {
    const s = navigationRailTv();
    // NavigationRailCollapsedTokens.ContainerWidth = 96dp (was the legacy 80dp).
    expect(s.root()).toContain('w-24');
    expect(s.root()).not.toContain('w-20');
    expect(s.root()).toContain('flex-col');
    expect(s.root()).toContain('bg-surface');
    // TopSpace 44dp, ItemVerticalSpace 4dp.
    expect(s.root()).toContain('py-11');
    expect(s.root()).toContain('gap-1');
    // Item container height 64dp.
    expect(s.item()).toContain('h-16');
  });

  test('Expressive: active label is secondary + labelMediumEmphasized', () => {
    const s = navigationRailTv();
    // NavigationRailColorTokens.ItemActiveLabelText = Secondary.
    expect(s.label()).toContain('group-data-[pressed]:text-secondary');
    expect(s.label()).toContain('group-data-[pressed]:text-label-medium-emphasized');
    expect(s.label()).not.toContain('font-bold');
  });

  test('Expressive: state layer is on-secondary-container and the indicator springs', () => {
    const s = navigationRailTv();
    expect(s.indicator()).toContain('before:bg-on-secondary-container');
    expect(s.indicator()).not.toContain('before:bg-current');
    // Only the pill background color animates here, so it uses the effects (color)
    // spring; the size spring is N/A because the indicator does not resize.
    expect(s.indicator()).toContain('ease-spring-effects-default');
  });

  test('disabled is per-token (icon + label on-surface/0.38, no state layer)', () => {
    const s = navigationRailTv();
    expect(s.icon()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
    expect(s.label()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
    expect(s.indicator()).toContain('group-data-[disabled]:before:opacity-0');
  });
});
