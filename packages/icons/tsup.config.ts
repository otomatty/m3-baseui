import { defineConfig } from 'tsup';
import { addUseClient } from '../../scripts/add-use-client';

/**
 * Single-entry bundle. The Icon wrapper is a client component, so we re-assert
 * `'use client'` after the build (esbuild strips module-level directives while
 * bundling).
 */
export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm'],
  target: 'es2022',
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  async onSuccess() {
    await addUseClient(['dist/index.js']);
  },
});
