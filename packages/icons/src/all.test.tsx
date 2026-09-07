import { describe, expect, test } from 'bun:test';
import { getGlyph } from './all';

describe('getGlyph (full catalog)', () => {
  test('includes glyphs omitted from the default entry', () => {
    expect(getGlyph('10k')?.startsWith('M')).toBe(true);
  });
});
