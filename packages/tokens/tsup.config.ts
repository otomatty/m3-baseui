import { defineConfig } from 'tsup';

/**
 * Builds the JS `.` entry (raw token source + types). The CSS/contract
 * artifacts are produced by `src/build.ts` (run via the `gen` script) and
 * shipped as-is: `tokens.css` / `theme.css` are static CSS and
 * `contract.css.ts` stays a vanilla-extract source file so the consumer's VE
 * plugin can evaluate it.
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
});
