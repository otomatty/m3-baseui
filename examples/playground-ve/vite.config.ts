import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

/**
 * VE playground — renders the *same* demo as examples/playground, but the M3
 * components come from @otomatty/react-vanilla-extract instead of @otomatty/react-tailwind.
 *
 * The shared App.tsx imports from '@otomatty/react-tailwind'; we alias that specifier
 * to the VE build so the two playgrounds emit identical DOM + data-* attributes
 * (drop-in compatibility), while the VE plugin compiles the recipe styles.
 * Tailwind stays on for the demo's layout/typography utilities only.
 */
export default defineConfig({
  plugins: [vanillaExtractPlugin(), react(), tailwindcss()],
  resolve: {
    // Resolve workspace packages to their TS source in dev (see playground).
    conditions: ['@m3/source'],
    alias: {
      '@otomatty/react-tailwind': fileURLToPath(
        new URL('../../packages/react-vanilla-extract/src/index.ts', import.meta.url),
      ),
    },
  },
});
