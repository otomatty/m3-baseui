import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

/**
 * Single Storybook that documents BOTH styling engines.
 *
 * The same stories render through @m3/react-tailwind or
 * @m3/react-vanilla-extract depending on the "Engine" toolbar global (see
 * .storybook/preview.tsx). Both Vite plugins are enabled so each engine's
 * styles are produced: Tailwind generates the utility classes the tailwind
 * components reference, while the vanilla-extract plugin compiles the VE
 * recipes. The `@m3/source` condition resolves workspace packages to their TS
 * source in dev (mirrors the playgrounds).
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (cfg) =>
    mergeConfig(cfg, {
      plugins: [vanillaExtractPlugin(), tailwindcss()],
      resolve: { conditions: ['@m3/source'] },
    }),
};

export default config;
