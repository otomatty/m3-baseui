import * as React from 'react';
import type { Decorator, Preview, StoryFn } from '@storybook/react-vite';
import { useArgs, useGlobals } from 'storybook/preview-api';
import {
  ThemeProvider,
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

type StorybookGlobals = {
  engine: EngineId;
  colorMode: ThemeMode;
};

type StorybookThemeArgs = {
  seed: string;
  scheme: SchemeVariant;
  contrast: ContrastLevel;
};

/**
 * Keep `data-theme` on `<html>` in sync with the toolbar selection.
 *
 * tokens.css applies dark vars via `[data-theme='dark']` and via
 * `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) }`.
 * ThemeProvider only sets `data-theme` on its own wrapper, so without this
 * hook Light mode on a dark OS keeps inheriting dark `:root` vars.
 */
function useDocumentTheme(mode: ThemeMode): void {
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
}

function ThemeShell({ Story }: { Story: StoryFn }) {
  const [{ seed, scheme, contrast }] = useArgs<StorybookThemeArgs>();
  const [globals] = useGlobals();
  const { engine, colorMode } = globals as StorybookGlobals;

  useDocumentTheme(colorMode);

  return (
    <EngineProvider engine={engine}>
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
}

/**
 * Global decorator: wires the theme Controls + the Engine / Color mode toolbars
 * into the tree. `ThemeProvider` writes the generated `--md-sys-color-*`
 * channels onto its wrapper when a seed is set; baseline tokens from tokens.css
 * apply via `data-theme` on `<html>`.
 */
const withTheme: Decorator = (Story) => <ThemeShell Story={Story} />;

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    engine: {
      description: 'Styling engine — switch to verify drop-in compatibility',
      defaultValue: 'tailwind',
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
      defaultValue: 'light',
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
