import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { BottomSheet, bottomSheetTv } from './bottom-sheet';

// BottomSheet is a portal/drawer component; per CLAUDE.md the open/close + swipe
// interaction is covered by E2E. Units assert the M3 token contract on the
// resolved class strings plus the initial (closed) render of the trigger.
describe('BottomSheet tokens', () => {
  const s = bottomSheetTv();

  test('scrim uses scrim/0.32', () => {
    expect(s.backdrop()).toContain('bg-scrim/32');
  });

  test('surface = surface-container-low, top extra-large (28dp) corner, elevation level1', () => {
    expect(s.popup()).toContain('bg-surface-container-low');
    expect(s.popup()).toContain('rounded-t-extra-large');
    expect(s.popup()).toContain('shadow-level1');
  });

  test('drag handle is 32x4dp (w-8 h-1) on-surface-variant @ 40%', () => {
    expect(s.handle()).toContain('w-8');
    expect(s.handle()).toContain('h-1');
    expect(s.handle()).toContain('bg-on-surface-variant/40');
  });

  test('headline = title-large / on-surface (color + type both survive)', () => {
    expect(s.title()).toContain('text-title-large');
    expect(s.title()).toContain('text-on-surface');
  });

  test('supporting text = body-medium / on-surface-variant', () => {
    expect(s.description()).toContain('text-body-medium');
    expect(s.description()).toContain('text-on-surface-variant');
  });
});

describe('BottomSheet render', () => {
  test('renders the trigger button (sheet stays closed)', () => {
    render(
      <BottomSheet.Root>
        <BottomSheet.Trigger>開く</BottomSheet.Trigger>
        <BottomSheet.Portal>
          <BottomSheet.Backdrop />
          <BottomSheet.Viewport>
            <BottomSheet.Popup>
              <BottomSheet.Handle />
              <BottomSheet.Title>タイトル</BottomSheet.Title>
              <BottomSheet.Description>本文</BottomSheet.Description>
            </BottomSheet.Popup>
          </BottomSheet.Viewport>
        </BottomSheet.Portal>
      </BottomSheet.Root>,
    );
    expect(screen.getByRole('button', { name: '開く' })).toBeInTheDocument();
    // Closed by default: the title is not mounted.
    expect(screen.queryByText('タイトル')).not.toBeInTheDocument();
  });
});
