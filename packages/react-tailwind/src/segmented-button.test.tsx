import { describe, expect, test } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { SegmentedButton } from './segmented-button';

function Single() {
  return (
    <SegmentedButton.Root defaultValue={['day']}>
      <SegmentedButton.Item value="day">日</SegmentedButton.Item>
      <SegmentedButton.Item value="week">週</SegmentedButton.Item>
      <SegmentedButton.Item value="month">月</SegmentedButton.Item>
    </SegmentedButton.Root>
  );
}

describe('SegmentedButton', () => {
  test('marks the default segment as pressed', () => {
    render(<Single />);
    expect(screen.getByRole('button', { name: /日/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /週/ })).toHaveAttribute('aria-pressed', 'false');
  });

  test('single-select moves the selection on click', () => {
    render(<Single />);
    fireEvent.click(screen.getByRole('button', { name: /週/ }));
    expect(screen.getByRole('button', { name: /週/ })).toHaveAttribute('data-pressed');
    expect(screen.getByRole('button', { name: /日/ })).not.toHaveAttribute('data-pressed');
  });

  test('multi-select keeps several segments pressed at once', () => {
    render(
      <SegmentedButton.Root multiple defaultValue={['b']}>
        <SegmentedButton.Item value="b">太字</SegmentedButton.Item>
        <SegmentedButton.Item value="i">斜体</SegmentedButton.Item>
      </SegmentedButton.Root>,
    );
    fireEvent.click(screen.getByRole('button', { name: /斜体/ }));
    expect(screen.getByRole('button', { name: /太字/ })).toHaveAttribute('data-pressed');
    expect(screen.getByRole('button', { name: /斜体/ })).toHaveAttribute('data-pressed');
  });
});
