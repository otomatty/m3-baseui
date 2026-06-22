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
});
