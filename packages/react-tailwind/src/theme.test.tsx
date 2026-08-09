/**
 * Theme sync — colors live on documentElement (portal-safe).
 * ThemeProvider is sugar over syncDocumentTheme; components read CSS vars only.
 */
import { afterEach, describe, expect, test } from 'bun:test';
import { render, cleanup, act } from '@testing-library/react';
import {
  ThemeProvider,
  applyScheme,
  clearScheme,
  generateScheme,
  syncDocumentTheme,
  useTheme,
} from '@m3-baseui/core';

const BASELINE_SEED = '#6750A4';

afterEach(() => {
  cleanup();
  clearScheme(document.documentElement);
  document.documentElement.removeAttribute('data-theme');
});

describe('clearScheme / applyScheme', () => {
  test('clearScheme removes inline --md-sys-color-* props', () => {
    const root = document.documentElement;
    applyScheme(root, generateScheme(BASELINE_SEED).light);
    expect(root.style.getPropertyValue('--md-sys-color-primary')).not.toBe('');
    clearScheme(root);
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe('');
  });
});

describe('syncDocumentTheme', () => {
  test('writes seed scheme + data-theme onto documentElement', () => {
    const root = document.documentElement;
    const dispose = syncDocumentTheme({ mode: 'dark', seed: BASELINE_SEED });
    expect(root.getAttribute('data-theme')).toBe('dark');
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe(
      generateScheme(BASELINE_SEED).dark.primary,
    );
    dispose();
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe('');
  });

  test('colors prop wins over seed', () => {
    const custom = { ...generateScheme(BASELINE_SEED).light, primary: '1 2 3' };
    syncDocumentTheme({ mode: 'light', seed: BASELINE_SEED, colors: custom });
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe('1 2 3');
  });

  test('mode-only clears inline scheme so tokens.css can drive colors', () => {
    applyScheme(document.documentElement, generateScheme(BASELINE_SEED).light);
    syncDocumentTheme({ mode: 'dark' });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe('');
  });
});

describe('ThemeProvider', () => {
  test('applies seed colors to documentElement by default (not only the wrapper)', () => {
    render(
      <ThemeProvider seed={BASELINE_SEED} mode="light">
        <span>child</span>
      </ThemeProvider>,
    );
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe(
      generateScheme(BASELINE_SEED).light.primary,
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  test('applies explicit colors for host / dynamic switching', () => {
    const colors = { ...generateScheme(BASELINE_SEED).light, primary: '10 20 30' };
    render(
      <ThemeProvider colors={colors} mode="light">
        <span>child</span>
      </ThemeProvider>,
    );
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe(
      '10 20 30',
    );
  });

  test('setMode switches document scheme', () => {
    function Probe() {
      const { setMode, resolvedMode } = useTheme();
      return (
        <button type="button" onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
          toggle
        </button>
      );
    }
    const { getByRole } = render(
      <ThemeProvider seed={BASELINE_SEED} mode="light">
        <Probe />
      </ThemeProvider>,
    );
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe(
      generateScheme(BASELINE_SEED).light.primary,
    );
    act(() => {
      getByRole('button').click();
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe(
      generateScheme(BASELINE_SEED).dark.primary,
    );
  });

  test('target="scope" keeps colors on the wrapper', () => {
    const { container } = render(
      <ThemeProvider seed={BASELINE_SEED} mode="light" target="scope" className="scope-root">
        <span>child</span>
      </ThemeProvider>,
    );
    const scope = container.querySelector('.scope-root');
    expect(scope).toBeTruthy();
    expect((scope as HTMLElement).style.getPropertyValue('--md-sys-color-primary')).toBe(
      generateScheme(BASELINE_SEED).light.primary,
    );
    // document may still get data-theme from a previous test cleared in afterEach —
    // scope mode must not rely on document inline colors.
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe('');
  });
});
