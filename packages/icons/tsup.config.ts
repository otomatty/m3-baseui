import { defineConfig } from 'tsup';
import { addUseClient } from '../../scripts/add-use-client';

/**
 * Two entries: the default Icon wrapper (small core glyph set) and `all`
 * (full catalog). Both are client components, so we re-assert `'use client'`
 * after the build (esbuild strips module-level directives while bundling).
 */
export default defineConfig({
  entry: {
    index: 'src/index.tsx',
    all: 'src/all.tsx',
  },
  format: ['esm'],
  target: 'es2022',
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  async onSuccess() {
    await addUseClient(['dist/index.js', 'dist/all.js']);
  },
});
