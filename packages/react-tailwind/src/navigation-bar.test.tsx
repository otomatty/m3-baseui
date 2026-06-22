import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationBar } from './navigation-bar';

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
});
