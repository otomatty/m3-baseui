# @otomatty/tokens

## 0.1.0

### Minor Changes

- 57ac796: Add the library build & distribution pipeline (issue #5).

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

- a24103d: Publish under the `@otomatty` npm scope.

  The packages now carry npm publishing metadata (`repository`, `homepage`,
  `bugs`, `publishConfig.access: "public"`) and ship via a Changesets-driven
  `Release` GitHub Actions workflow. Install from npm, e.g.
  `npm i @otomatty/react-tailwind @otomatty/core @base-ui/react react react-dom`.
