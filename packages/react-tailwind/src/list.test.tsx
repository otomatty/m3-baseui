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
    // Explicit role survives marker removal (Safari/VoiceOver).
    expect(screen.getByRole('list')).toHaveAttribute('role', 'list');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('受信トレイ')).toBeInTheDocument();
  });

  test('a bare row is one-line (56dp)', () => {
    render(
      <List.Root>
        <List.Item>受信トレイ</List.Item>
      </List.Root>,
    );
    const row = screen.getByText('受信トレイ').closest('div');
    expect(row?.className).toContain('min-h-14');
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

  test('three-line row is 88dp and top-aligns its slots', () => {
    render(
      <List.Root>
        <List.Item lines={3} supportingText="長い補助テキスト">
          受信トレイ
        </List.Item>
      </List.Root>,
    );
    const row = screen.getByText('受信トレイ').closest('div');
    expect(row?.className).toContain('min-h-[88px]');
    // Tall rows top-align leading/trailing rather than centering them.
    expect(row?.className).toContain('items-start');
  });

  test('leading icon is decorative: aria-hidden + data-leading=icon (default)', () => {
    render(
      <List.Root>
        <List.Item leading={<svg data-testid="ic" />}>受信トレイ</List.Item>
      </List.Root>,
    );
    const slot = screen.getByTestId('ic').closest('[data-leading]');
    expect(slot).toHaveAttribute('data-leading', 'icon');
    expect(slot).toHaveAttribute('aria-hidden', 'true');
  });

  test('leading avatar stays in the a11y tree and sizes to 40dp', () => {
    render(
      <List.Root>
        <List.Item leadingVariant="avatar" leading={<img alt="田中 太郎" src="a.png" />}>
          田中 太郎
        </List.Item>
      </List.Root>,
    );
    // Informative avatar is reachable (not aria-hidden), so the img role resolves.
    const slot = screen.getByRole('img', { name: '田中 太郎' }).closest('[data-leading]');
    expect(slot).toHaveAttribute('data-leading', 'avatar');
    expect(slot).not.toHaveAttribute('aria-hidden');
    expect(slot?.className).toContain('size-10');
  });

  test('leading image sizes to 56dp and is not hidden', () => {
    render(
      <List.Root>
        <List.Item leadingVariant="image" leading={<img alt="サムネ" src="b.png" />}>
          写真
        </List.Item>
      </List.Root>,
    );
    const slot = screen.getByRole('img', { name: 'サムネ' }).closest('[data-leading]');
    expect(slot).toHaveAttribute('data-leading', 'image');
    expect(slot).not.toHaveAttribute('aria-hidden');
    expect(slot?.className).toContain('size-14');
  });

  test('leading video thumbnail sizes to 100×56dp and is not hidden', () => {
    render(
      <List.Root>
        <List.Item leadingVariant="video" leading={<img alt="動画" src="c.png" />}>
          クリップ
        </List.Item>
      </List.Root>,
    );
    const slot = screen.getByRole('img', { name: '動画' }).closest('[data-leading]');
    expect(slot).toHaveAttribute('data-leading', 'video');
    expect(slot).not.toHaveAttribute('aria-hidden');
    expect(slot?.className).toContain('w-25');
    expect(slot?.className).toContain('h-14');
  });

  test('headline keeps both the typescale and the color utility (M3 tv merge)', () => {
    render(
      <List.Root>
        <List.Item>受信トレイ</List.Item>
      </List.Root>,
    );
    const headline = screen.getByText('受信トレイ');
    // The ./tv wrapper teaches tailwind-merge that text-<typescale> and
    // text-<color> are independent, so neither is dropped.
    expect(headline.className).toContain('text-body-large');
    expect(headline.className).toContain('text-on-surface');
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
