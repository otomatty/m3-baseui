import { defineConfig } from 'tsup';

/**
 * Multi-entry build so every subpath (`@m3/react-tailwind/button`, …) maps to
 * its own dist file. The factories — and the `'use client'` boundary — live in
 * @m3/core, which is external here, so these modules only resolve Tailwind
 * classes and need no directive of their own.
 */
export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.test.*', '!src/jest-dom.d.ts'],
  format: ['esm'],
  target: 'es2022',
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true,
});
