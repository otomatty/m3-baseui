import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'bun:test';
import { Search, searchTv } from './search';

// Search is a portal component (combobox popup); per CLAUDE.md the open/filter
// interaction is covered by E2E. Here we assert the M3 token contract on the
// resolved class strings plus the resting-bar initial render.
describe('Search tokens', () => {
  const s = searchTv();

  test('bar = surface-container-high pill, 56dp, full corner', () => {
    expect(s.bar()).toContain('bg-surface-container-high');
    expect(s.bar()).toContain('rounded-full');
    expect(s.bar()).toContain('h-14');
  });

  test('input is transparent body-large on-surface with on-surface-variant placeholder', () => {
    expect(s.input()).toContain('bg-transparent');
    expect(s.input()).toContain('text-body-large');
    expect(s.input()).toContain('text-on-surface');
    expect(s.input()).toContain('placeholder:text-on-surface-variant');
  });

  test('docked view = surface-container-high, elevation level3', () => {
    expect(s.popup()).toContain('bg-surface-container-high');
    expect(s.popup()).toContain('shadow-level3');
  });

  test('suggestion row has a state layer keyed to hover + data-highlighted + data-selected', () => {
    expect(s.item()).toContain('hover:before:opacity-[var(--md-sys-state-hover)]');
    expect(s.item()).toContain('data-[highlighted]:before:opacity-[var(--md-sys-state-hover)]');
    expect(s.item()).toContain('data-[selected]:before:opacity-[var(--md-sys-state-pressed)]');
  });

  test('disabled is per-token (label on-surface/0.38, no state layer)', () => {
    expect(s.item()).toContain('data-[disabled]:text-on-surface/[0.38]');
    expect(s.item()).toContain('data-[disabled]:before:opacity-0');
    expect(s.item()).not.toContain('data-[disabled]:opacity-[0.38]');
  });

  test('selected indicator reveals only when the row is selected', () => {
    expect(s.itemIndicator()).toContain('group-data-[selected]:visible');
  });
});

describe('Search parts', () => {
  test('namespace exposes the bar + docked-view parts', () => {
    expect(Search.Root).toBeDefined();
    expect(Search.Bar).toBeDefined();
    expect(Search.Input).toBeDefined();
    expect(Search.Clear).toBeDefined();
    expect(Search.Popup).toBeDefined();
    expect(Search.List).toBeDefined();
    expect(Search.Item).toBeDefined();
    expect(Search.ItemIndicator).toBeDefined();
    expect(Search.Empty).toBeDefined();
    expect(Search.SearchGlyph).toBeDefined();
    expect(Search.Check).toBeDefined();
  });

  test('resting bar renders an accessible combobox input', () => {
    render(
      <Search.Root items={['Apple', 'Banana']}>
        <Search.Bar>
          <Search.Icon>
            <Search.SearchGlyph />
          </Search.Icon>
          <Search.Input placeholder="Search" aria-label="Search" />
        </Search.Bar>
      </Search.Root>,
    );
    const input = screen.getByRole('combobox', { name: 'Search' });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search');
  });
});
