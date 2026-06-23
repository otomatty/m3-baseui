import { defineConfig } from 'tsup';
import { addUseClient } from '../../scripts/add-use-client';

/**
 * Single-entry bundle. The package only exposes the `.` entry, so everything is
 * bundled into one ESM file. The bundle is a client module (Ripple,
 * ThemeProvider and the create-* factories all use React state/hooks), so we
 * re-assert `'use client'` after the build — esbuild strips module-level
 * directives while bundling, which makes a banner unusable. Code splitting is
 * disabled so there is a single output file to annotate.
 */
export default defineConfig({
  entry: ['src/index.ts'],
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
