/**
 * copy-token-css.ts — vendors the generated token stylesheets into this
 * package's own `styles/` directory.
 *
 * The published `exports` expose `@m3/react-tailwind/tokens.css` and
 * `/theme.css` as a convenience. Previously they pointed at
 * `./node_modules/@m3/tokens/styles/*.css`, which does not resolve once the
 * package is installed from the registry. We copy the files at build time so
 * the package is self-contained.
 */
import { copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const tokensStyles = dirname(require.resolve('@m3/tokens/tokens.css'));
const stylesDir = join(import.meta.dir, '..', 'styles');

mkdirSync(stylesDir, { recursive: true });
for (const file of ['tokens.css', 'theme.css']) {
  copyFileSync(join(tokensStyles, file), join(stylesDir, file));
  console.log(`  ✓ styles/${file}`);
}
