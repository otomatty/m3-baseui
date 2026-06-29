import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationBar, navigationBarTv } from './navigation-bar';

function Example() {
  return (
    <NavigationBar.Root defaultValue={['home']}>
      <NavigationBar.Item value="home" icon={<span>H</span>}>
        ホーム
      </NavigationBar.Item>
      <NavigationBar.Item value="search" icon={<span>S</span>}>
        検索
      </NavigationBar.Item>
    </NavigationBar.Root>
  );
}

describe('NavigationBar', () => {
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
    expect(home).toHaveAttribute('aria-pressed', 'true');
    // A navigation bar always keeps a destination active: re-tapping must not clear it.
    fireEvent.click(home);
    expect(home).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('NavigationBar tokens', () => {
  test('disabled is per-token (no blanket opacity): icon + label on-surface/0.38, no state layer', () => {
    const s = navigationBarTv();
    // the old blanket element fade is gone (M3 dims the content colors per-token)
    expect(s.item()).not.toContain('opacity-[0.38]');
    expect(s.item()).toContain('data-[disabled]:pointer-events-none');
    // icon + label dim to on-surface/0.38
    expect(s.icon()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
    expect(s.label()).toContain('group-data-[disabled]:text-on-surface/[0.38]');
    // a disabled destination that is also active stays dimmed. The override must
    // test both attributes on the SAME group element (the item is the only
    // `.group`); stacked `group-data-*:group-data-*` would wrongly require two
    // nested groups and never match.
    expect(s.icon()).toContain('group-[&[data-disabled][data-pressed]]:text-on-surface/[0.38]');
    expect(s.label()).toContain('group-[&[data-disabled][data-pressed]]:text-on-surface/[0.38]');
    expect(s.icon()).not.toContain('group-data-[disabled]:group-data-[pressed]:');
    expect(s.label()).not.toContain('group-data-[disabled]:group-data-[pressed]:');
    // the active-indicator state layer is suppressed when disabled
    expect(s.indicator()).toContain('group-data-[disabled]:before:opacity-0');
  });

  test('icon slot constrains a raw svg to 24dp (matches drawer/tabs)', () => {
    const s = navigationBarTv();
    expect(s.icon()).toContain('[&_svg]:size-6');
  });
});
