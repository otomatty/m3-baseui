# @m3-baseui/tokens

## 1.1.0

### Minor Changes

- ea3c7b9: FAB / Extended FAB / FAB Menu now follow the Material 3 Expressive spec.

  **Breaking (FAB / FabMenu):**

  - `size` is now `'small' | 'medium' | 'large'` mapping to **56 / 80 / 96 dp** (was `small` 40dp / `regular` 56dp / `large` 96dp). The pre-Expressive 40dp FAB is removed.
  - The extended FAB is no longer a `size` value. Use the new `variant="extended"` prop, which combines with `size` — extended small/medium/large are 56/80/96 dp with title-medium / title-large / headline-small labels.
  - The `surface` container color is removed (deprecated by M3). Colors are `primary | secondary | tertiary`; the default FAB color is now `primary`.
  - Large FAB icon is 32dp (was 36dp); FAB Menu items use a title-medium label with 24dp leading/trailing padding.

  **Tokens:** added the Expressive shape steps `largeIncreased` (20dp) and `extraLargeIncreased` (32dp), surfaced as `rounded-large-increased` / `rounded-extra-large-increased` (Tailwind) and `vars.sys.shape.largeIncreased` / `extraLargeIncreased` (vanilla-extract).

  Migration: `size="regular"` → `size="small"`; old `size="small"` (40dp) → nearest is `size="small"` (56dp); `size="extended"` → `variant="extended"`; `color="surface"` → `color="primary"`.

## 1.0.1

### Patch Changes

- 10e244b: Fix Tailwind v4 dynamic color: emit `rgb(var(--md-sys-color-*))` instead of `rgb(var(--md-sys-color-*) / <alpha-value>)` in the generated `theme.css`. Tailwind v4's `@theme` block does not substitute the v3 `<alpha-value>` placeholder, which left every `--color-*` token as an invalid color and caused color utilities (`bg-primary`, `text-on-primary`, `border-outline`, …) to fall back to transparent / `currentColor`. v4 derives opacity modifiers via `color-mix()` off the bare value, so the placeholder is unnecessary.

  Also bumps `@m3-baseui/react-tailwind` so its vendored `theme.css` export (copied at build from `@m3-baseui/tokens`) is republished; otherwise consumers of `@m3-baseui/react-tailwind/theme.css` would keep the broken stylesheet on an already-published version.

## 1.0.0

### Major Changes

- b78bcd6: Rename the npm scope from `@otomatty/*` to `@m3-baseui/*` under the new npm organization. Update all package names, workspace dependencies, imports, docs, and release workflow Trusted Publisher settings.

  Consumers should migrate installs and imports:

  - `@otomatty/tokens` → `@m3-baseui/tokens`
  - `@otomatty/core` → `@m3-baseui/core`
  - `@otomatty/icons` → `@m3-baseui/icons`
  - `@otomatty/react-tailwind` → `@m3-baseui/react-tailwind`
  - `@otomatty/react-vanilla-extract` → `@m3-baseui/react-vanilla-extract`

  The legacy `@otomatty/*` packages will be deprecated on npm after the new scope is published.

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
