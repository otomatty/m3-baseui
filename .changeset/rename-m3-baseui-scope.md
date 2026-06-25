---
"@m3-baseui/tokens": major
"@m3-baseui/core": major
"@m3-baseui/icons": major
"@m3-baseui/react-tailwind": major
"@m3-baseui/react-vanilla-extract": major
---

Rename the npm scope from `@otomatty/*` to `@m3-baseui/*` under the new npm organization. Update all package names, workspace dependencies, imports, docs, and release workflow Trusted Publisher settings.

Consumers should migrate installs and imports:

- `@otomatty/tokens` → `@m3-baseui/tokens`
- `@otomatty/core` → `@m3-baseui/core`
- `@otomatty/icons` → `@m3-baseui/icons`
- `@otomatty/react-tailwind` → `@m3-baseui/react-tailwind`
- `@otomatty/react-vanilla-extract` → `@m3-baseui/react-vanilla-extract`

The legacy `@otomatty/*` packages will be deprecated on npm after the new scope is published.
