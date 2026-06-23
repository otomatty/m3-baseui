/**
 * link-ve-css.ts — re-links vanilla-extract CSS into its JS module.
 *
 * The VE esbuild plugin extracts each `.css.ts` recipe into a sibling `.css`
 * file, but esbuild (in bundle mode) emits the CSS without leaving an `import`
 * in the JS — it assumes the host links both. For a distributable package we
 * want the style to load automatically, so we prepend a side-effect
 * `import './<name>.css'` to every entry that has a matching CSS file. The
 * source map gets a leading `;` to account for the extra generated line.
 *
 * Used from `tsup.config.ts` via the `onSuccess` hook.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function linkVeCss(distDir = 'dist'): Promise<void> {
  const files = await readdir(distDir);
  const cssBaseNames = new Set(
    files.filter((f) => f.endsWith('.css')).map((f) => f.slice(0, -'.css'.length)),
  );

  for (const base of cssBaseNames) {
    const jsPath = join(distDir, `${base}.js`);
    let code: string;
    try {
      code = await readFile(jsPath, 'utf8');
    } catch {
      continue; // CSS with no matching JS entry — nothing to link.
    }

    const importLine = `import './${base}.css';`;
    if (code.includes(importLine)) continue;
    await writeFile(jsPath, `${importLine}\n${code}`);

    const mapPath = `${jsPath}.map`;
    try {
      const map = JSON.parse(await readFile(mapPath, 'utf8')) as { mappings?: string };
      if (typeof map.mappings === 'string') {
        map.mappings = `;${map.mappings}`;
        await writeFile(mapPath, JSON.stringify(map));
      }
    } catch {
      // No source map — nothing to adjust.
    }
  }
}
