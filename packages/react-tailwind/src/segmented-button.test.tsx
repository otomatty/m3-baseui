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

  test('disabled segment uses M3 label and divider tokens (material-web)', () => {
    render(
      <SegmentedButton.Root defaultValue={['day']}>
        <SegmentedButton.Item value="day">日</SegmentedButton.Item>
        <SegmentedButton.Item value="week" disabled>
          週
        </SegmentedButton.Item>
      </SegmentedButton.Root>,
    );
    const week = screen.getByRole('button', { name: /週/ });
    expect(week.className).toContain('disabled:text-on-surface/38');
    expect(week.className).toContain('disabled:border-on-surface/12');
    expect(week.className).not.toContain('disabled:opacity-[0.38]');
  });

  test('segment item exposes the M3 3px focus ring', () => {
    render(
      <SegmentedButton.Root defaultValue={['day']}>
        <SegmentedButton.Item value="day">日</SegmentedButton.Item>
      </SegmentedButton.Root>,
    );
    expect(screen.getByRole('button', { name: /日/ }).className).toContain(
      'focus-visible:outline-[3px]',
    );
  });
});
