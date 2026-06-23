/**
 * publish.ts — publishes the public `@otomatty/*` packages to npm with bun.
 *
 * Why not `changeset publish`? Changesets shells out to `npm publish`, which
 * does NOT resolve the `workspace:*` protocol — it would upload tarballs whose
 * deps read `"@otomatty/x": "workspace:*"`, and `npm install` of those fails
 * with EUNSUPPORTEDPROTOCOL. `bun publish` rewrites `workspace:*` to the
 * concrete version while packing, so consumers get an installable range.
 *
 * `changeset version` still drives the version bumps + changelogs (the Version
 * PR); this script only replaces the publish step. It is idempotent: versions
 * already on the registry are skipped, so a re-run after a partial failure
 * publishes only what is missing. Registry auth comes from ~/.npmrc (written
 * from NPM_TOKEN in the Release workflow); access level comes from each
 * package's `publishConfig.access`.
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

  // Guard against the exact bug this script exists to prevent: never upload a
  // tarball whose manifest still carries an unresolved workspace: range.
  assertNoWorkspaceRanges(dir, name);

  console.log(`▲ publishing ${name}@${version}`);
  execFileSync('bun', ['publish'], { cwd: dir, stdio: 'inherit' });
  // changesets/action parses `New tag: <pkg>@<version>` from stdout to push git
  // tags and create the GitHub releases — emit it for each published package.
  console.log(`New tag: ${name}@${version}`);
  published++;
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

/** Packs the package and fails if the packed manifest still has a workspace: range. */
function assertNoWorkspaceRanges(dir: string, name: string): void {
  const out = mkdtempSync(join(tmpdir(), 'm3-pack-'));
  try {
    execFileSync('bun', ['pm', 'pack', '--quiet', '--destination', out], {
      cwd: dir,
      stdio: 'ignore',
    });
    const tgz = readdirSync(out).find((f) => f.endsWith('.tgz'));
    if (!tgz) return;
    const manifest = execFileSync('tar', ['-xzOf', join(out, tgz), 'package/package.json'], {
      encoding: 'utf8',
    });
    if (manifest.includes('workspace:')) {
      throw new Error(`${name}: packed manifest still contains a "workspace:" range`);
    }
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
}
