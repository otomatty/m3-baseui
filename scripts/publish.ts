/**
 * publish.ts — publishes the public `@otomatty/*` packages to npm.
 *
 * Two-tool split, on purpose:
 *   1. `bun pm pack` builds each tarball. Bun resolves the `workspace:*`
 *      protocol to the concrete version while packing, so consumers get an
 *      installable range. (`changeset publish` / `npm publish` from the package
 *      dir would leave `workspace:*` in place → EUNSUPPORTEDPROTOCOL on install.)
 *   2. `npm publish <tarball>` uploads it. `bun publish` has unreliable .npmrc
 *      auth in CI (it ignores ~/.npmrc and errors with "missing authentication"
 *      — oven-sh/bun#24124), whereas npm reads the token from ~/.npmrc reliably.
 *      The tarball's manifest is already resolved, so npm never sees a
 *      workspace: range.
 *
 * `changeset version` still drives the version bumps + changelogs (the Version
 * PR); this script only replaces the publish step. It is idempotent: versions
 * already on the registry are skipped, so a re-run after a partial failure
 * publishes only what is missing. Registry auth comes from ~/.npmrc (written
 * from NPM_TOKEN in the Release workflow); access level comes from each
 * package's `publishConfig.access` (forced with --access public for safety).
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = join(import.meta.dir, '..');
const packagesDir = join(root, 'packages');

interface Manifest {
  name?: string;
  version?: string;
  private?: boolean;
}

let published = 0;
let skipped = 0;

for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = join(packagesDir, entry.name);

  let manifest: Manifest;
  try {
    manifest = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
  } catch {
    continue;
  }

  const { name, version } = manifest;
  if (manifest.private || !name?.startsWith('@otomatty/') || !version) continue;

  if (await isPublished(name, version)) {
    console.log(`• ${name}@${version} already on npm — skipping`);
    skipped++;
    continue;
  }

  // Pack with bun (resolves workspace:* → concrete versions), verify the packed
  // manifest carries no leftover workspace: range, then upload with npm.
  const { tarball, cleanup } = packResolved(dir, name);
  try {
    console.log(`▲ publishing ${name}@${version}`);
    execFileSync('npm', ['publish', tarball, '--access', 'public'], { stdio: 'inherit' });
    // changesets/action parses `New tag: <pkg>@<version>` from stdout to push
    // git tags and create the GitHub releases — emit it for each published one.
    console.log(`New tag: ${name}@${version}`);
    published++;
  } finally {
    cleanup();
  }
}

console.log(`\nDone. Published ${published}, skipped ${skipped}.`);

/** Returns true when the exact name@version already exists on the registry. */
async function isPublished(name: string, version: string): Promise<boolean> {
  const res = await fetch(`https://registry.npmjs.org/${name}`, {
    headers: { accept: 'application/vnd.npm.install-v1+json' },
  });
  if (res.status === 404) return false;
  if (!res.ok) throw new Error(`registry lookup for ${name} failed: ${res.status}`);
  const data = (await res.json()) as { versions?: Record<string, unknown> };
  return Boolean(data.versions && version in data.versions);
}

/**
 * Packs the package with bun and returns the tarball path plus a cleanup fn.
 * Throws if no tarball is produced or if its manifest still has a workspace:
 * range (the exact bug this script exists to prevent).
 */
function packResolved(dir: string, name: string): { tarball: string; cleanup: () => void } {
  const out = mkdtempSync(join(tmpdir(), 'm3-pack-'));
  const cleanup = () => rmSync(out, { recursive: true, force: true });
  try {
    execFileSync('bun', ['pm', 'pack', '--quiet', '--destination', out], {
      cwd: dir,
      stdio: 'ignore',
    });
    const tgz = readdirSync(out).find((f) => f.endsWith('.tgz'));
    if (!tgz) {
      throw new Error(`${name}: bun pm pack produced no .tgz artifact`);
    }
    const tarball = join(out, tgz);
    const manifest = execFileSync('tar', ['-xzOf', tarball, 'package/package.json'], {
      encoding: 'utf8',
    });
    if (manifest.includes('workspace:')) {
      throw new Error(`${name}: packed manifest still contains a "workspace:" range`);
    }
    return { tarball, cleanup };
  } catch (err) {
    cleanup();
    throw err;
  }
}
