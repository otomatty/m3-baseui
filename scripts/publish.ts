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
 * publishes only what is missing. Registry auth in CI: npm trusted publishing
 * (OIDC) when ~/.npmrc has no token; otherwise the Release workflow's optional
 * NPM_TOKEN bootstrap path (first publish before Trusted Publisher can be
 * configured). npm attaches provenance by default with OIDC. Access level comes
 * from each package's publishConfig.access (forced with --access public for
 * safety).
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

  const tag = `${name}@${version}`;

  if (await isPublished(name, version)) {
    console.log(`• ${name}@${version} already on npm — skipping publish`);
    await createGithubTag(tag);
    skipped++;
    continue;
  }

  // Pack with bun (resolves workspace:* → concrete versions), verify the packed
  // manifest carries no leftover workspace: range, then upload with npm.
  const { tarball, cleanup } = packResolved(dir, name);
  try {
    console.log(`▲ publishing ${name}@${version}`);
    execFileSync('npm', ['publish', tarball, '--access', 'public'], { stdio: 'inherit' });
    await createGithubTag(tag);
    // Kept for log readability; release tags are created via the GitHub API above.
    console.log(`New tag: ${tag}`);
    published++;
  } finally {
    cleanup();
  }
}

console.log(`\nDone. Published ${published}, skipped ${skipped}.`);

/**
 * Creates a git tag on GitHub via the REST API when running in Actions.
 * Uses the GitHub API instead of `git push origin <tag>` because checkout
 * with `persist-credentials: false` and changesets/action's default
 * `commitMode: git-cli` only run `git push` without creating a local tag first.
 */
async function createGithubTag(tag: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  const sha = process.env.GITHUB_SHA;
  if (!token || !repository || !sha) return;

  const res = await fetch(`https://api.github.com/repos/${repository}/git/refs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ref: `refs/tags/${tag}`, sha }),
  });

  if (res.status === 422) {
    const body = await res.text();
    if (body.includes('Reference already exists')) {
      console.log(`• git tag ${tag} already exists — skipping`);
      return;
    }
    throw new Error(`git tag ${tag} failed: ${res.status} ${body}`);
  }
  if (!res.ok) {
    throw new Error(`git tag ${tag} failed: ${res.status} ${await res.text()}`);
  }
  console.log(`▲ created git tag ${tag}`);
}

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
