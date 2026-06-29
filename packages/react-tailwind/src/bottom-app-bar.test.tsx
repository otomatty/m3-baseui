import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { BottomAppBar, bottomAppBarTv } from './bottom-app-bar';

describe('BottomAppBar', () => {
  test('renders the actions and an optional FAB as a toolbar', () => {
    render(
      <BottomAppBar aria-label="actions" fab={<button type="button">add</button>}>
        <button type="button">edit</button>
      </BottomAppBar>,
    );
    const bar = screen.getByRole('toolbar', { name: 'actions' });
    expect(bar).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'edit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument();
  });

  test('omits the FAB slot when no fab is given', () => {
    render(
      <BottomAppBar>
        <button type="button">edit</button>
      </BottomAppBar>,
    );
    expect(screen.queryByRole('button', { name: 'add' })).not.toBeInTheDocument();
  });
});

describe('BottomAppBar tokens', () => {
  test('80dp container on surface-container', () => {
    const s = bottomAppBarTv();
    expect(s.root()).toContain('h-20');
    expect(s.root()).toContain('bg-surface-container');
  });
});
