/**
 * Theme sync — colors live on documentElement (portal-safe).
 * ThemeProvider is sugar over syncDocumentTheme; components read CSS vars only.
 */
import { afterEach, describe, expect, test } from 'bun:test';
import { act, cleanup, render } from '@testing-library/react';
import {
  ThemeProvider,
  applyScheme,
  clearScheme,
  generateScheme,
  resetDocumentTheme,
  syncDocumentTheme,
  useTheme,
} from '@m3-baseui/core';

const BASELINE_SEED = '#6750A4';

afterEach(() => {
  cleanup();
  resetDocumentTheme(document.documentElement);
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
    expect(root.getAttribute('data-theme')).toBeNull();
  });

  test('colors prop wins over seed', () => {
    const custom = { ...generateScheme(BASELINE_SEED).light, primary: '1 2 3' };
    const dispose = syncDocumentTheme({
      mode: 'light',
      seed: BASELINE_SEED,
      colors: custom,
    });
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe('1 2 3');
    dispose();
  });

  test('mode-only clears inline scheme so tokens.css can drive colors', () => {
    applyScheme(document.documentElement, generateScheme(BASELINE_SEED).light);
    const dispose = syncDocumentTheme({ mode: 'dark' });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe('');
    dispose();
  });

  test('dispose restores prior data-theme and inline colors', () => {
    const root = document.documentElement;
    const prior = { ...generateScheme(BASELINE_SEED).light, primary: '9 9 9' };
    applyScheme(root, prior);
    root.setAttribute('data-theme', 'light');

    const dispose = syncDocumentTheme({ mode: 'dark', seed: BASELINE_SEED });
    expect(root.getAttribute('data-theme')).toBe('dark');
    dispose();

    expect(root.getAttribute('data-theme')).toBe('light');
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe('9 9 9');
  });

  test('disposing an older layer leaves a newer shared-root layer intact', () => {
    const root = document.documentElement;
    const aColors = { ...generateScheme(BASELINE_SEED).light, primary: '1 1 1' };
    const bColors = { ...generateScheme(BASELINE_SEED).dark, primary: '2 2 2' };
    const disposeA = syncDocumentTheme({ mode: 'light', colors: aColors });
    const disposeB = syncDocumentTheme({ mode: 'dark', colors: bColors });

    disposeA();
    expect(root.getAttribute('data-theme')).toBe('dark');
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe('2 2 2');

    disposeB();
    expect(root.getAttribute('data-theme')).toBeNull();
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe('');
  });

  test('disposing the newer layer restores the older shared-root layer', () => {
    const root = document.documentElement;
    const aColors = { ...generateScheme(BASELINE_SEED).light, primary: '1 1 1' };
    const bColors = { ...generateScheme(BASELINE_SEED).dark, primary: '2 2 2' };
    const disposeA = syncDocumentTheme({ mode: 'light', colors: aColors });
    const disposeB = syncDocumentTheme({ mode: 'dark', colors: bColors });

    disposeB();
    expect(root.getAttribute('data-theme')).toBe('light');
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe('1 1 1');

    disposeA();
    expect(root.getAttribute('data-theme')).toBeNull();
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe('');
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

  test('unmount restores document theme baseline', () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    const { unmount } = render(
      <ThemeProvider seed={BASELINE_SEED} mode="dark">
        <span>child</span>
      </ThemeProvider>,
    );
    expect(root.getAttribute('data-theme')).toBe('dark');
    unmount();
    expect(root.getAttribute('data-theme')).toBe('light');
    expect(root.style.getPropertyValue('--md-sys-color-primary')).toBe('');
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
    expect(document.documentElement.style.getPropertyValue('--md-sys-color-primary')).toBe('');
  });
});
