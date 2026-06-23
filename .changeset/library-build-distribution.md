---
"@otomatty/tokens": minor
"@otomatty/core": minor
"@otomatty/react-tailwind": minor
"@otomatty/react-vanilla-extract": minor
"@otomatty/icons": minor
---

Add the library build & distribution pipeline (issue #5).

Each package now builds to `dist/` with tsup — ESM output, `.d.ts` types, and
source maps — instead of shipping source only. Highlights:

- `exports` resolve to `dist` for published consumers (`default`) while in-repo
  tooling resolves to source via the `@m3/source` condition.
- `@otomatty/core` keeps its `'use client'` directive in the distributed bundle (RSC
  compatible).
- `@otomatty/react-vanilla-extract` pre-compiles its recipes to static `.css` files,
  with `sideEffects: ["**/*.css"]` so the styles survive consumer tree-shaking.
- `@otomatty/react-tailwind` vendors the token stylesheets so
  `@otomatty/react-tailwind/tokens.css` / `/theme.css` resolve from the package.
