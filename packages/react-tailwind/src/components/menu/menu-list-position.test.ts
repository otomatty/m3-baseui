import { describe, expect, test } from 'bun:test';
import { getMenuListItemPosition } from '@m3-baseui/core';

describe('getMenuListItemPosition', () => {
  test('single item is only', () => {
    expect(getMenuListItemPosition(0, 1)).toBe('only');
  });

  test('first / middle / last in a list', () => {
    expect(getMenuListItemPosition(0, 3)).toBe('first');
    expect(getMenuListItemPosition(1, 3)).toBe('middle');
    expect(getMenuListItemPosition(2, 3)).toBe('last');
  });
});
