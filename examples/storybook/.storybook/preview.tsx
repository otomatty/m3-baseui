import * as React from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';
import { tokens } from '@m3-baseui/tokens';
import {
  ThemeProvider,
  applyScheme,
  generateScheme,
  type ContrastLevel,
  type SchemeVariant,
  type ThemeMode,
} from '@m3-baseui/react-tailwind';
import { EngineProvider, type EngineId } from '../src/engine';
import './preview.css';

const SCHEMES: SchemeVariant[] = [
  'tonalSpot',
  'vibrant',
  'expressive',
  'neutral',
  'content',
  'fidelity',
];
const CONTRASTS: ContrastLevel[] = ['standard', 'medium', 'high'];
const COLOR_ROLES = Object.keys(tokens.sys.color);

type StorybookGlobals = {
  engine: EngineId;
  colorMode: ThemeMode;
};

type StorybookThemeArgs = {
  seed: string;
  scheme: SchemeVariant;
  contrast: ContrastLevel;
};

function kebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function resolveThemeMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode;
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function clearAppliedScheme(element: HTMLElement): void {
  for (const role of COLOR_ROLES) {
    element.style.removeProperty(`--md-sys-color-${kebab(role)}`);
  }
}

/** Sync `<html data-theme>` — see preview decorator comment for rationale. */
function DocumentThemeSync({ mode }: { mode: ThemeMode }): null {
  React.useEffect(() => {
    const root = document.documentElement;
    if (mode === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    return () => {
      root.removeAttribute('data-theme');
    };
  }, [mode]);
  return null;
}

/**
 * Mirror dynamic color onto `<html>` so portaled surfaces (Dialog, Menu, sheets)
 * inherit the same `--md-sys-color-*` vars as the ThemeProvider wrapper.
 */
function DocumentDynamicColorSync({
  seed,
  scheme,
  contrast,
  mode,
}: StorybookThemeArgs & { mode: ThemeMode }): null {
  React.useEffect(() => {
    const root = document.documentElement;
    if (!seed) {
      clearAppliedScheme(root);
      return;
    }

    const apply = () => {
      const schemes = generateScheme(seed, scheme, contrast);
      applyScheme(root, resolveThemeMode(mode) === 'dark' ? schemes.dark : schemes.light);
    };

    apply();

    if (mode !== 'system' || typeof window === 'undefined' || !window.matchMedia) {
      return () => {
        clearAppliedScheme(root);
      };
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply();
    mq.addEventListener('change', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      clearAppliedScheme(root);
    };
  }, [seed, scheme, contrast, mode]);

  return null;
}

/**
 * Global decorator: wires the theme Controls + the Engine / Color mode toolbars
 * into the tree. `ThemeProvider` writes the generated `--md-sys-color-*`
 * channels onto its wrapper when a seed is set; baseline tokens from tokens.css
 * apply via `data-theme` on `<html>` (synced by {@link DocumentThemeSync}).
 * {@link DocumentDynamicColorSync} duplicates dynamic vars onto `<html>` for
 * portal targets that render outside the provider wrapper.
 *
 * tokens.css applies dark vars via `[data-theme='dark']` and via
 * `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) }`.
 * ThemeProvider only sets `data-theme` on its own wrapper, so `<html>` must be
 * synced separately or Light mode on a dark OS keeps inheriting dark `:root` vars.
 */
const withTheme: Decorator = (Story, context) => {
  const { seed, scheme, contrast } = context.args as StorybookThemeArgs;
  const { engine, colorMode } = context.globals as StorybookGlobals;

  return (
    <EngineProvider engine={engine}>
      <DocumentThemeSync mode={colorMode} />
      <DocumentDynamicColorSync seed={seed} scheme={scheme} contrast={contrast} mode={colorMode} />
      <ThemeProvider
        seed={seed || undefined}
        scheme={scheme}
        contrast={contrast}
        mode={colorMode}
        className="p-6 min-h-[120px] bg-surface text-on-surface"
      >
        <Story />
      </ThemeProvider>
    </EngineProvider>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    engine: {
      description: 'Styling engine — switch to verify drop-in compatibility',
      toolbar: {
        title: 'Engine',
        icon: 'paintbrush',
        items: [
          { value: 'tailwind', title: 'Tailwind CSS v4' },
          { value: 'vanilla-extract', title: 'vanilla-extract' },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Light / dark color mode for the preview canvas',
      toolbar: {
        title: 'Color mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { engine: 'tailwind', colorMode: 'light' },
  // Project-level args/argTypes apply to every story and surface in Controls.
  args: {
    seed: '#6750A4',
    scheme: 'tonalSpot',
    contrast: 'standard',
  },
  argTypes: {
    seed: { control: 'color', table: { category: 'Theme' }, name: 'Seed' },
    scheme: {
      control: 'select',
      options: SCHEMES,
      table: { category: 'Theme' },
      name: 'Scheme',
    },
    contrast: {
      control: 'inline-radio',
      options: CONTRASTS,
      table: { category: 'Theme' },
      name: 'Contrast',
    },
  },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: ['Overview', 'Components'],
      },
    },
  },
};

export default preview;
