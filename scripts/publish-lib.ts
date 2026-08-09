/**
 * Helpers shared by `scripts/publish.ts` and its unit tests.
 * Kept separate so importing the helpers never runs the publish loop.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export interface Manifest {
  name?: string;
  version?: string;
  private?: boolean;
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

const DEP_FIELDS = [
  'dependencies',
  'optionalDependencies',
  'peerDependencies',
  'devDependencies',
] as const;

/** Map of `@m3-baseui/<pkg>` → version from each workspace package.json. */
export function loadWorkspaceVersions(dir: string): Record<string, string> {
  const versions: Record<string, string> = {};
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    try {
      const pkg = JSON.parse(
        readFileSync(join(dir, entry.name, 'package.json'), 'utf8'),
      ) as Manifest;
      if (pkg.name?.startsWith('@m3-baseui/') && pkg.version) {
        versions[pkg.name] = pkg.version;
      }
    } catch {
      // skip non-package dirs
    }
  }
  return versions;
}

/**
 * Fail if packed deps still say `workspace:` or pin an `@m3-baseui/*` version
 * that disagrees with the workspace package.json (stale bun.lock symptom).
 */
export function assertResolvedWorkspaceDeps(
  packed: Manifest,
  workspaceVersions: Record<string, string>,
): void {
  const label = packed.name ?? '<unknown>';
  const raw = JSON.stringify(packed);
  if (raw.includes('workspace:')) {
    throw new Error(`${label}: packed manifest still contains a "workspace:" range`);
  }

  for (const field of DEP_FIELDS) {
    const deps = packed[field];
    if (!deps) continue;
    for (const [dep, range] of Object.entries(deps)) {
      const expected = workspaceVersions[dep];
      if (!expected) continue;
      if (range !== expected) {
        throw new Error(
          `${label}: ${field}["${dep}"] is "${range}" but workspace package.json is "${expected}". ` +
            `bun pm pack reads versions from bun.lock — run \`bun install\` after version bumps ` +
            `(see version-packages script).`,
        );
      }
    }
  }
}
