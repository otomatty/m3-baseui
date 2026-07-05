import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { ButtonGroup, buttonGroup } from '../button-group/button-group';
import { Button } from '../button/button';

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

  test('Expressive: standard variant spaces the buttons with a 12dp gap', () => {
    // ButtonGroupSmallTokens.BetweenSpace = 12dp (was 8dp).
    expect(buttonGroup({ variant: 'standard' })).toContain('gap-3');
    expect(buttonGroup({ variant: 'standard' })).not.toContain('gap-2');
  });

  test('connected variant tightens the gap and morphs the children inner corners', () => {
    const cls = buttonGroup({ variant: 'connected' });
    expect(cls).toContain('gap-0.5');
    // outer corners stay full; only the inner-facing corners are reduced. The
    // first/last rules are guarded so a lone child keeps all corners full.
    expect(cls).toContain('[&>*:first-child:not(:last-child)]:rounded-e-small');
    expect(cls).toContain('[&>*:last-child:not(:first-child)]:rounded-s-small');
    expect(cls).toContain('[&>*:not(:first-child):not(:last-child)]:rounded-small');
  });

  test('Expressive: connected seam morphs to extra-small on press', () => {
    const cls = buttonGroup({ variant: 'connected' });
    expect(cls).toContain(
      '[&>*:not(:first-child):not(:last-child):is(:active,[data-pressed])]:rounded-extra-small',
    );
    expect(cls).toContain(
      '[&>*:first-child:not(:last-child):is(:active,[data-pressed])]:rounded-e-extra-small',
    );
  });

  test('Expressive: a selected connected child rounds fully', () => {
    const cls = buttonGroup({ variant: 'connected' });
    expect(cls).toContain('[&>*[data-selected]:not(:first-child):not(:last-child)]:rounded-full');
    expect(cls).toContain('[&>*[data-selected]:first-child:not(:last-child)]:rounded-e-full');
  });

  test('Expressive: pressed child grows by the ExpandedRatio (squeeze)', () => {
    // ExpandedRatio 0.15 kept as a component custom property.
    expect(buttonGroup()).toContain('[--md-comp-button-group-expanded-ratio:0.15]');
    expect(buttonGroup({ variant: 'connected' })).toContain(
      '[&>*:is(:active,[data-pressed])]:[flex-grow:calc(1+var(--md-comp-button-group-expanded-ratio))]',
    );
  });

  test('defaults to the standard variant', () => {
    render(
      <ButtonGroup aria-label="g">
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group').className).toContain('gap-3');
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
