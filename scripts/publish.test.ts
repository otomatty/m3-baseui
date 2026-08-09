import { describe, expect, test } from 'bun:test';
import { join } from 'node:path';
import { assertResolvedWorkspaceDeps, loadWorkspaceVersions } from './publish-lib.ts';

const packagesDir = join(import.meta.dir, '..', 'packages');

describe('publish workspace dep resolution', () => {
  test('loadWorkspaceVersions reads live package.json versions', () => {
    const versions = loadWorkspaceVersions(packagesDir);
    expect(versions['@m3-baseui/core']).toBeTruthy();
    expect(versions['@m3-baseui/react-tailwind']).toBeTruthy();
    expect(versions['@m3-baseui/tokens']).toBeTruthy();
  });

  test('assertResolvedWorkspaceDeps accepts matching pins', () => {
    const versions = {
      '@m3-baseui/core': '7.0.0',
      '@m3-baseui/tokens': '1.1.0',
    };
    expect(() =>
      assertResolvedWorkspaceDeps(
        {
          name: '@m3-baseui/react-tailwind',
          dependencies: {
            '@m3-baseui/core': '7.0.0',
            '@m3-baseui/tokens': '1.1.0',
            'tailwind-variants': '^0.3.0',
          },
        },
        versions,
      ),
    ).not.toThrow();
  });

  test('assertResolvedWorkspaceDeps rejects stale core pin (7.0.0 publish bug)', () => {
    const versions = {
      '@m3-baseui/core': '7.0.0',
      '@m3-baseui/tokens': '1.1.0',
    };
    expect(() =>
      assertResolvedWorkspaceDeps(
        {
          name: '@m3-baseui/react-tailwind',
          dependencies: {
            '@m3-baseui/core': '3.0.0',
            '@m3-baseui/tokens': '1.1.0',
          },
        },
        versions,
      ),
    ).toThrow(/@m3-baseui\/core.*3\.0\.0.*7\.0\.0/);
  });

  test('assertResolvedWorkspaceDeps rejects leftover workspace: ranges', () => {
    expect(() =>
      assertResolvedWorkspaceDeps(
        {
          name: '@m3-baseui/core',
          dependencies: { '@m3-baseui/tokens': 'workspace:*' },
        },
        { '@m3-baseui/tokens': '1.1.0' },
      ),
    ).toThrow(/workspace:/);
  });
});
