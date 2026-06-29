import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { SideSheet, sideSheetTv } from './side-sheet';

// SideSheet is a portal/drawer component; per CLAUDE.md the open/close + swipe
// interaction is covered by E2E. Units assert the M3 token contract on the
// resolved class strings plus the initial (closed) render of the trigger.
describe('SideSheet tokens', () => {
  const s = sideSheetTv();

  test('scrim uses scrim/0.32', () => {
    expect(s.backdrop()).toContain('bg-scrim/32');
  });

  test('width defaults to 320dp', () => {
    expect(sideSheetTv().popup()).toContain('w-[320px]');
  });

  test('modal: surface-container-low, elevation level1, leading edge rounded large', () => {
    const popup = sideSheetTv({ variant: 'modal' }).popup();
    expect(popup).toContain('bg-surface-container-low');
    expect(popup).toContain('shadow-level1');
    // Right side sheet rounds its leading (start) edge.
    expect(popup).toContain('rounded-s-large');
  });

  test('standard: no elevation', () => {
    expect(sideSheetTv({ variant: 'standard' }).popup()).toContain('shadow-none');
  });

  test('headline = title-large / on-surface', () => {
    expect(s.title()).toContain('text-title-large');
    expect(s.title()).toContain('text-on-surface');
  });
});

describe('SideSheet render', () => {
  test('renders the trigger button (sheet stays closed)', () => {
    render(
      <SideSheet.Root>
        <SideSheet.Trigger>開く</SideSheet.Trigger>
        <SideSheet.Portal>
          <SideSheet.Backdrop />
          <SideSheet.Viewport>
            <SideSheet.Popup>
              <SideSheet.Header>
                <SideSheet.Title>タイトル</SideSheet.Title>
              </SideSheet.Header>
              <SideSheet.Description>本文</SideSheet.Description>
            </SideSheet.Popup>
          </SideSheet.Viewport>
        </SideSheet.Portal>
      </SideSheet.Root>,
    );
    expect(screen.getByRole('button', { name: '開く' })).toBeInTheDocument();
    expect(screen.queryByText('タイトル')).not.toBeInTheDocument();
  });
});
