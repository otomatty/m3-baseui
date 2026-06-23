import { defineConfig } from 'tsup';
import { addUseClient, listEntryJs } from '../../scripts/add-use-client';

/**
 * Multi-entry build so every subpath (`@otomatty/react-tailwind/button`, …) maps to
 * its own dist file. Each entry calls a client `create*` factory from @otomatty/core
 * at module init, so it must itself be a client module: in Next/RSC a server
 * component importing `@otomatty/react-tailwind/button` would otherwise execute that
 * factory on the server, where the imported factory is an opaque client
 * reference. We disable splitting so each entry is self-contained (the factory
 * call lives in the annotated file, not a shared chunk) and prepend
 * `'use client'` to every entry after the build.
 */
export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.test.*', '!src/jest-dom.d.ts'],
  format: ['esm'],
  target: 'es2022',
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  async onSuccess() {
    await addUseClient(await listEntryJs('dist'));
  },
});
