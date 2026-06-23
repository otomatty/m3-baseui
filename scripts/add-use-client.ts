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
import { readFile, writeFile } from 'node:fs/promises';

const DIRECTIVE = '"use client";\n';

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
