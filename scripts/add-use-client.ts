/**
 * add-use-client.ts — re-asserts the `'use client'` directive on bundled output.
 *
 * esbuild (and therefore tsup) strips module-level directives when it bundles,
 * so the directive cannot survive via a banner. We prepend it after the build
 * and keep the source map honest by shifting its mappings down one line (a
 * leading `;` in the `mappings` field encodes one empty generated line).
 *
 * Used from a package's `tsup.config.ts` via the `onSuccess` hook.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const DIRECTIVE = '"use client";\n';

/**
 * Lists the entry `.js` files in a dist directory (top-level, excluding split
 * `chunk-*.js`). Used to mark every public styling entry as a client module:
 * the wrappers call the client `create*` factories at module init, so in
 * Next/RSC they must be client modules themselves — relying on @m3/core's
 * boundary is not enough.
 */
export async function listEntryJs(distDir: string): Promise<string[]> {
  // Recursive so nested entries (e.g. dist/foo/bar.js) are annotated too.
  const files = await readdir(distDir, { recursive: true });
  return files
    .filter((f) => f.endsWith('.js') && !basename(f).startsWith('chunk-'))
    .map((f) => join(distDir, f));
}

export async function addUseClient(files: string[]): Promise<void> {
  for (const file of files) {
    const code = await readFile(file, 'utf8');
    if (code.startsWith('"use client"') || code.startsWith("'use client'")) continue;
    await writeFile(file, DIRECTIVE + code);

    const mapPath = `${file}.map`;
    try {
      const map = JSON.parse(await readFile(mapPath, 'utf8')) as { mappings?: string };
      if (typeof map.mappings === 'string') {
        map.mappings = `;${map.mappings}`;
        await writeFile(mapPath, JSON.stringify(map));
      }
    } catch {
      // No source map for this file — nothing to adjust.
    }
  }
}
