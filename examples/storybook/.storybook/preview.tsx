import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider, type ContrastLevel, type SchemeVariant } from '@m3/react-tailwind';
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

/**
 * Global decorator: wires the theme Controls + the Engine toolbar into the
 * tree. `ThemeProvider` writes the generated `--md-sys-color-*` channels onto
 * its wrapper, which both engines read, so seed/scheme/contrast/mode drive
 * dynamic color for every story regardless of the active engine.
 */
const withTheme: Decorator = (Story, context) => {
  const engine = context.globals.engine as EngineId;
  const { seed, scheme, contrast, mode } = context.args as {
    seed: string;
    scheme: SchemeVariant;
    contrast: ContrastLevel;
    mode: 'light' | 'dark' | 'system';
  };
  return (
    <EngineProvider engine={engine}>
      <ThemeProvider
        seed={seed || undefined}
        scheme={scheme}
        contrast={contrast}
        mode={mode}
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
  },
  initialGlobals: { engine: 'tailwind' },
  // Project-level args/argTypes apply to every story and surface in Controls.
  args: {
    seed: '#6750A4',
    scheme: 'tonalSpot',
    contrast: 'standard',
    mode: 'light',
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
    mode: {
      control: 'inline-radio',
      options: ['light', 'dark', 'system'],
      table: { category: 'Theme' },
      name: 'Mode',
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
