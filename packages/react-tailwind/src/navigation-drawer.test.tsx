import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationDrawer } from './navigation-drawer';

describe('NavigationDrawer', () => {
  test('renders a headline and destinations', () => {
    render(
      <NavigationDrawer.Root aria-label="メール">
        <NavigationDrawer.Headline>メール</NavigationDrawer.Headline>
        <NavigationDrawer.Item selected>受信トレイ</NavigationDrawer.Item>
        <NavigationDrawer.Item>送信済み</NavigationDrawer.Item>
      </NavigationDrawer.Root>,
    );
    expect(screen.getByRole('heading', { name: 'メール' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '受信トレイ' })).toBeInTheDocument();
  });

  test('marks the selected destination with aria-current + data-selected', () => {
    render(
      <NavigationDrawer.Root>
        <NavigationDrawer.Item selected>受信トレイ</NavigationDrawer.Item>
        <NavigationDrawer.Item>送信済み</NavigationDrawer.Item>
      </NavigationDrawer.Root>,
    );
    const active = screen.getByRole('button', { name: '受信トレイ' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active).toHaveAttribute('data-selected');
    expect(screen.getByRole('button', { name: '送信済み' })).not.toHaveAttribute('aria-current');
  });

  test('renders a destination as a link when href is set', () => {
    render(
      <NavigationDrawer.Root>
        <NavigationDrawer.Item href="/inbox" selected>
          受信トレイ
        </NavigationDrawer.Item>
      </NavigationDrawer.Root>,
    );
    const link = screen.getByRole('link', { name: '受信トレイ' });
    expect(link).toHaveAttribute('href', '/inbox');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  test('disabled destination blocks clicks and exposes data-disabled', () => {
    let clicked = false;
    render(
      <NavigationDrawer.Root>
        <NavigationDrawer.Item disabled onClick={() => (clicked = true)}>
          下書き
        </NavigationDrawer.Item>
      </NavigationDrawer.Root>,
    );
    const item = screen.getByRole('button', { name: '下書き' });
    expect(item).toBeDisabled();
    expect(item).toHaveAttribute('data-disabled');
    fireEvent.click(item);
    expect(clicked).toBe(false);
  });
});
