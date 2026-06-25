# @m3-baseui/icons

## 0.1.0

### Minor Changes

- 57ac796: Add the library build & distribution pipeline (issue #5).

  Each package now builds to `dist/` with tsup — ESM output, `.d.ts` types, and
  source maps — instead of shipping source only. Highlights:

  - `exports` resolve to `dist` for published consumers (`default`) while in-repo
    tooling resolves to source via the `@m3/source` condition.
  - `@m3-baseui/core` keeps its `'use client'` directive in the distributed bundle (RSC
    compatible).
  - `@m3-baseui/react-vanilla-extract` pre-compiles its recipes to static `.css` files,
    with `sideEffects: ["**/*.css"]` so the styles survive consumer tree-shaking.
  - `@m3-baseui/react-tailwind` vendors the token stylesheets so
    `@m3-baseui/react-tailwind/tokens.css` / `/theme.css` resolve from the package.

- a24103d: Publish under the `@m3-baseui` npm scope (renamed from `@otomatty`).

  The packages now carry npm publishing metadata (`repository`, `homepage`,
  `bugs`, `publishConfig.access: "public"`) and ship via a Changesets-driven
  `Release` GitHub Actions workflow. Install from npm, e.g.
  `npm i @m3-baseui/react-tailwind @m3-baseui/core @base-ui/react react react-dom`.
