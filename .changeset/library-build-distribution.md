---
"@m3/tokens": minor
"@m3/core": minor
"@m3/react-tailwind": minor
"@m3/react-vanilla-extract": minor
"@m3/icons": minor
---

Add the library build & distribution pipeline (issue #5).

Each package now builds to `dist/` with tsup — ESM output, `.d.ts` types, and
source maps — instead of shipping source only. Highlights:

- `exports` resolve to `dist` for published consumers (`default`) while in-repo
  tooling resolves to source via the `@m3/source` condition.
- `@m3/core` keeps its `'use client'` directive in the distributed bundle (RSC
  compatible).
- `@m3/react-vanilla-extract` pre-compiles its recipes to static `.css` files,
  with `sideEffects: ["**/*.css"]` so the styles survive consumer tree-shaking.
- `@m3/react-tailwind` vendors the token stylesheets so
  `@m3/react-tailwind/tokens.css` / `/theme.css` resolve from the package.
