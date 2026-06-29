import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { ButtonGroup, buttonGroup } from './button-group';
import { Button } from './button';

describe('ButtonGroup', () => {
  test('renders a role=group container holding its buttons', () => {
    render(
      <ButtonGroup aria-label="文字書式">
        <Button>左</Button>
        <Button>右</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group', { name: '文字書式' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '左' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '右' })).toBeInTheDocument();
  });

  test('standard variant spaces the buttons with an 8dp gap', () => {
    expect(buttonGroup({ variant: 'standard' })).toContain('gap-2');
  });

  test('connected variant tightens the gap and morphs the children inner corners', () => {
    const cls = buttonGroup({ variant: 'connected' });
    expect(cls).toContain('gap-0.5');
    // outer corners stay full; only the inner-facing corners are reduced
    expect(cls).toContain('[&>*:first-child]:rounded-e-small');
    expect(cls).toContain('[&>*:last-child]:rounded-s-small');
    expect(cls).toContain('[&>*:not(:first-child):not(:last-child)]:rounded-small');
  });

  test('defaults to the standard variant', () => {
    render(
      <ButtonGroup aria-label="g">
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group').className).toContain('gap-2');
  });

  test('forwards arbitrary props and merges className', () => {
    render(
      <ButtonGroup className="custom" data-testid="bg">
        <Button>A</Button>
      </ButtonGroup>,
    );
    const group = screen.getByTestId('bg');
    expect(group.className).toContain('custom');
    expect(group).toHaveAttribute('role', 'group');
  });
});
