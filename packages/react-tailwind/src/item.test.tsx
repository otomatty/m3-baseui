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
    // The leading slot is decorative — assert the aria-hidden contract, not just text.
    expect(screen.getByText('L').closest('[aria-hidden="true"]')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
    // Headline carries the body-large typescale (class fragment only).
    expect(screen.getByText('見出し')).toHaveClass('text-body-large');
  });

  test('omits optional slots when not provided', () => {
    render(<Item>見出しのみ</Item>);
    expect(screen.queryByText('OVERLINE')).not.toBeInTheDocument();
  });
});
