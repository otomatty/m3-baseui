/**
 * build.ts — runs all generators and writes artifacts.
 *
 *   styles/tokens.css            engine-neutral --md-sys-* variables (Layer 2)
 *   styles/theme.css             Tailwind v4 @theme preset
 *   src/generated/contract.css.ts vanilla-extract typed contract
 *
 * Run with: `bun run build` (from packages/tokens) or `bun run gen:tokens`.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { tokens } from './tokens';
import { generateTokensCss } from './generators/css';
import { generateVeContract } from './generators/ve-contract';
import { generateTailwindTheme } from './generators/tailwind';

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, '..');

function emit(relPath: string, contents: string): void {
  const abs = join(pkgRoot, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, contents, 'utf8');
  console.log(`  ✓ ${relPath} (${contents.length} bytes)`);
}

console.log('@m3/tokens — generating artifacts from src/tokens.ts');
emit('styles/tokens.css', generateTokensCss(tokens));
emit('styles/theme.css', generateTailwindTheme(tokens));
emit('src/generated/contract.css.ts', generateVeContract(tokens));
console.log('Done.');
