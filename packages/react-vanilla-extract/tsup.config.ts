import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { addUseClient, listEntryJs } from '../../scripts/add-use-client';
import { linkVeCss } from '../../scripts/link-ve-css';

/**
 * Multi-entry build so every subpath (`@m3/react-vanilla-extract/button`, …)
 * maps to its own dist file. The `.css.ts` recipes are evaluated at build time
 * by the vanilla-extract esbuild plugin, which emits static `.css` files and
 * rewrites each module to import them — so consumers need no VE plugin of their
 * own. The `@m3/tokens/contract.css` contract (createGlobalThemeContract) emits
 * no CSS; it only binds to the runtime `--md-sys-*` variables.
 *
 * The emitted CSS imports are real side effects, hence `sideEffects: ["*.css"]`
 * in package.json so bundlers keep them while still tree-shaking the JS.
 */
export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.css.ts', '!src/**/*.test.*'],
  format: ['esm'],
  target: 'es2022',
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  esbuildPlugins: [vanillaExtractPlugin({ identifiers: 'short' })],
  async onSuccess() {
    // esbuild emits the extracted CSS but drops the import from the JS; re-link
    // each entry to its sibling stylesheet so styles load on import.
    await linkVeCss('dist');
    // Each entry calls a client `create*` factory at module init, so it must be
    // a client module for Next/RSC. Runs after linkVeCss so `'use client'` ends
    // up first, before the CSS import.
    await addUseClient(await listEntryJs('dist'));
  },
});
