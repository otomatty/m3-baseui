import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from './card';

describe('Card', () => {
  test('renders an inert card as a non-button element', () => {
    render(<Card>静的カード</Card>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('静的カード')).toBeInTheDocument();
  });

  test('renders an interactive card as a button and fires onClick', () => {
    let clicked = false;
    render(
      <Card interactive onClick={() => (clicked = true)}>
        押せるカード
      </Card>,
    );
    const button = screen.getByRole('button', { name: /押せるカード/ });
    fireEvent.click(button);
    expect(clicked).toBe(true);
  });

  test('disabled interactive card exposes data-disabled and blocks clicks', () => {
    let clicked = false;
    render(
      <Card interactive disabled onClick={() => (clicked = true)}>
        無効カード
      </Card>,
    );
    const button = screen.getByRole('button', { name: /無効カード/ });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-disabled');
    fireEvent.click(button);
    expect(clicked).toBe(false);
  });
});
