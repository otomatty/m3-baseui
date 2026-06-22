import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { List } from './list';

describe('List', () => {
  test('Root renders a semantic list and items', () => {
    render(
      <List.Root>
        <List.Item>受信トレイ</List.Item>
        <List.Item>送信済み</List.Item>
      </List.Root>,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('受信トレイ')).toBeInTheDocument();
  });

  test('supportingText promotes the row to two-line', () => {
    render(
      <List.Root>
        <List.Item supportingText="2 件の未読">受信トレイ</List.Item>
      </List.Root>,
    );
    const row = screen.getByText('受信トレイ').closest('div');
    expect(row?.className).toContain('min-h-[72px]');
    expect(screen.getByText('2 件の未読')).toBeInTheDocument();
  });

  test('interactive item renders a button with the state layer', () => {
    render(
      <List.Root>
        <List.Item interactive>設定</List.Item>
      </List.Root>,
    );
    const button = screen.getByRole('button', { name: '設定' });
    expect(button.className).toContain('before:bg-current');
    expect(button.className).toContain('cursor-pointer');
  });

  test('disabled interactive item is a disabled button with the data hook', () => {
    render(
      <List.Root>
        <List.Item interactive disabled>
          設定
        </List.Item>
      </List.Root>,
    );
    const button = screen.getByRole('button', { name: '設定' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled');
  });

  test('linked item renders an anchor and forwards anchor props', () => {
    render(
      <List.Root>
        <List.Item interactive href="/inbox" target="_blank" rel="noreferrer">
          受信トレイ
        </List.Item>
      </List.Root>,
    );
    const link = screen.getByRole('link', { name: '受信トレイ' });
    expect(link).toHaveAttribute('href', '/inbox');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  test('disabled linked item drops its href + tab stop and suppresses onClick', () => {
    let clicked = false;
    render(
      <List.Root>
        <List.Item interactive href="/inbox" disabled onClick={() => (clicked = true)}>
          受信トレイ
        </List.Item>
      </List.Root>,
    );
    // No href → not a link role; query by text instead.
    const row = screen.getByText('受信トレイ').closest('a') as HTMLAnchorElement;
    expect(row).not.toHaveAttribute('href');
    expect(row).toHaveAttribute('tabindex', '-1');
    expect(row).toHaveAttribute('data-disabled');
    row.click();
    expect(clicked).toBe(false);
  });
});
