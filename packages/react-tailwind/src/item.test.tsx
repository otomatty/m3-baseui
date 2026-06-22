import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Item } from './item';

describe('Item', () => {
  test('renders the headline (children) text', () => {
    render(<Item>受信トレイ</Item>);
    expect(screen.getByText('受信トレイ')).toBeInTheDocument();
  });

  test('renders overline / supporting / leading / trailing slots when provided', () => {
    render(
      <Item
        overline="OVERLINE"
        supporting="補助テキスト"
        leading={<span>L</span>}
        trailing={<span>T</span>}
      >
        見出し
      </Item>,
    );
    expect(screen.getByText('OVERLINE')).toBeInTheDocument();
    expect(screen.getByText('補助テキスト')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  test('omits optional slots when not provided', () => {
    render(<Item>見出しのみ</Item>);
    expect(screen.queryByText('OVERLINE')).not.toBeInTheDocument();
  });
});
