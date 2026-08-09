import type { Decorator, Preview } from '@storybook/react-vite';
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
 * Global decorator: ThemeProvider writes `--md-sys-color-*` + `data-theme` onto
 * `document.documentElement` (portal-safe). No separate html sync helpers.
 */
const withTheme: Decorator = (Story, context) => {
  const { seed, scheme, contrast } = context.args as StorybookThemeArgs;
  const { engine, colorMode } = context.globals as StorybookGlobals;

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
      description: 'Color mode',
      toolbar: {
        title: 'Color',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    engine: 'tailwind',
    colorMode: 'light',
  },
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
      control: 'select',
      options: CONTRASTS,
      table: { category: 'Theme' },
      name: 'Contrast',
    },
  },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
};

export default preview;
