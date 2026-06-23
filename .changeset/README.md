# Changesets

This directory is managed by [changesets](https://github.com/changesets/changesets).
It records intended version bumps and changelog entries for the published `@m3/*`
packages.

## Workflow

1. After making a change worth releasing, run `bun run changeset` and follow the
   prompts to pick the affected packages and bump type (patch / minor / major).
   A markdown file is written here describing the change.
2. To apply the accumulated changesets — bump versions and update changelogs —
   run `bun run version-packages` (`changeset version`).
3. To build and publish to npm, run `bun run release` (`bun run build &&
   changeset publish`).

Private packages (`@m3/example-playground*`) are ignored and never published.
