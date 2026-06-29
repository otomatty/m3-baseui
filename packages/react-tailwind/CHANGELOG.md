# @m3-baseui/react-tailwind

## 1.0.4

### Patch Changes

- 2935c46: Align container / notification components with the M3 spec and restore drop-in
  parity between the Tailwind and vanilla-extract engines:

  - **Progress (circular, indeterminate):** the VE recipe's spin period is now 1s
    to match the Tailwind build's built-in `animate-spin` (was 1.4s), restoring
    drop-in parity without relying on a preset-only keyframe.
  - **Card (interactive):** the Tailwind build adds `transition-shadow` so the
    elevated card's elevation lift/settle animates, matching the VE box-shadow
    transition (previously the elevation change snapped instantly).
  - **Snackbar (supporting text):** the `Description` slot now uses `body-medium`
    at full opacity in both engines (was `body-small` at 90% opacity), per the M3
    snackbar supporting-text spec.
  - **Divider (vertical inset):** the Tailwind build uses a logical
    `margin-block-start` for the vertical `inset` variant, matching the VE recipe's
    `marginBlockStart` (was a physical `mt-4`).

  All four keep identical DOM and `data-*` across engines (drop-in parity).

- 7fbb54c: Align TextField focus indicators with M3 / material-web. The focused active
  indicator now grows to the M3 3dp width in both variants (filled
  `focus-active-indicator-height: 3px`, outlined `focus-outline-width: 3px`)
  instead of 2dp, matching the existing Select trigger. The outlined focus padding
  compensates the extra 2px so content stays steady. Both engines keep identical
  DOM and `data-*` (drop-in parity).
- 35d30c1: Align the NavigationBar disabled state with the M3 spec and the per-token
  disabled convention already used by Tabs and NavigationDrawer, keeping drop-in
  parity between the Tailwind and vanilla-extract engines:

  - **NavigationBar (disabled):** a disabled destination no longer fades the whole
    item with a blanket `opacity: 0.38`. Instead the icon and label dim to
    `on-surface` at 38% (per-token), the active-indicator state layer is
    suppressed, and the destination keeps `pointer-events: none`. A destination
    that is disabled _and_ active stays dimmed (a combined `data-disabled` +
    `data-pressed` selector outranks the active color), matching how Tabs already
    handles disabled-active tabs.
  - **NavigationBar (icon size):** the icon slot now constrains a raw `<svg>` to
    24dp, matching the NavigationDrawer and Tabs icon slots so drop-in `<svg>`
    icons render at the M3 size.

  Both engines keep identical DOM and `data-*` (drop-in parity).

## 1.0.3

### Patch Changes

- e861999: Align Selection components with M3 / material-web: Slider now uses the dedicated
  dragged state-layer opacity (0.16) while dragging instead of the pressed value
  (0.10). Restore drop-in parity between engines — the vanilla-extract Checkbox now
  transitions `color` (so the pressed state-layer inversion animates like the
  Tailwind build) and the vanilla-extract Radio dot's opacity transition uses the
  standard easing token.

## 1.0.2

### Patch Changes

- b97952b: Align FAB and SegmentedButton with M3 / material-web: FAB disabled uses on-surface/12+38 tokens instead of blanket opacity; SegmentedButton adds 3px focus ring, disabled divider tokens, and fixes focus-ring clipping by moving pill end caps to first/last items.

## 1.0.1

### Patch Changes

- 10e244b: Fix Tailwind v4 dynamic color: emit `rgb(var(--md-sys-color-*))` instead of `rgb(var(--md-sys-color-*) / <alpha-value>)` in the generated `theme.css`. Tailwind v4's `@theme` block does not substitute the v3 `<alpha-value>` placeholder, which left every `--color-*` token as an invalid color and caused color utilities (`bg-primary`, `text-on-primary`, `border-outline`, …) to fall back to transparent / `currentColor`. v4 derives opacity modifiers via `color-mix()` off the bare value, so the placeholder is unnecessary.

  Also bumps `@m3-baseui/react-tailwind` so its vendored `theme.css` export (copied at build from `@m3-baseui/tokens`) is republished; otherwise consumers of `@m3-baseui/react-tailwind/theme.css` would keep the broken stylesheet on an already-published version.

- Updated dependencies [10e244b]
  - @m3-baseui/tokens@1.0.1
  - @m3-baseui/core@1.0.1

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

### Patch Changes

- Updated dependencies [b78bcd6]
  - @m3-baseui/tokens@1.0.0
  - @m3-baseui/core@1.0.0

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

### Patch Changes

- Updated dependencies [57ac796]
- Updated dependencies [a24103d]
  - @m3-baseui/tokens@0.1.0
  - @m3-baseui/core@0.1.0
