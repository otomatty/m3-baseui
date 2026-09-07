import { describe, expect, test } from 'bun:test';
import { render } from '@testing-library/react';
import { Icon, getGlyph } from './index';

describe('Icon', () => {
  test('renders an svg and does not expose the ligature name as text', () => {
    const { container } = render(<Icon name="photo_camera" />);
    expect(container.textContent).not.toContain('photo_camera');
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  test('sets width and height from size', () => {
    const { container } = render(<Icon name="search" size={18} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '18');
  });

  test('paints with currentColor so it inherits text color', () => {
    const { container } = render(<Icon name="add" />);
    expect(container.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
  });

  test('filled selects a different path than the outline glyph', () => {
    const { container, rerender } = render(<Icon name="favorite" />);
    const outline = container.querySelector('path')?.getAttribute('d');
    rerender(<Icon name="favorite" filled />);
    const filled = container.querySelector('path')?.getAttribute('d');
    expect(outline).toBeTruthy();
    expect(filled).toBeTruthy();
    expect(filled).not.toBe(outline);
  });

  test('unknown names still render an empty svg without leaking the name', () => {
    const { container } = render(<Icon name="not_a_real_icon_xyz" />);
    expect(container.textContent).not.toContain('not_a_real_icon_xyz');
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelector('path')).toBeNull();
  });

  test('forwards className onto the svg', () => {
    const { container } = render(<Icon name="close" className="text-primary" />);
    expect(container.querySelector('svg')).toHaveClass('text-primary');
  });
});

describe('getGlyph', () => {
  test('returns path data for a known ligature name', () => {
    expect(getGlyph('arrow_drop_down')?.startsWith('M')).toBe(true);
  });

  test('does not ship the full Material Symbols catalog in the default entry', () => {
    expect(getGlyph('10k')).toBeUndefined();
  });
});
