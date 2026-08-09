# @m3-baseui/react-vanilla-extract

## 7.0.0

### Major Changes

- c8f572e: Theme writes to `document.documentElement` by default (portal-safe).

  - Add `syncDocumentTheme`, `clearScheme`, and `ThemeProvider` `colors` / `resolveMode` / `target`
  - Theme is CSS variables on `:root` — not a separate consumer layer; Provider is optional sugar
  - Breaking: seed colors no longer apply only to the provider wrapper (`target="scope"` restores that)

### Minor Changes

- 8f5ef1a: TextField: add M3 text area (multiline) support and spec-fidelity fixes.

  - New `multiline` / `rows` props render a native `<textarea>` (via Base UI
    `Field.Control`), with a min-height that grows, top-aligned content/label and
    vertical resize. `TextFieldProps` is now a discriminated union on `multiline`,
    so the single-line path keeps `<input>` types and the multiline path gets
    `<textarea>` events and props (`rows` / `wrap` / `cols`).
  - Icon spacing follows M3 tokens (16dp icon-to-input, 12dp icon-side edge).
  - Outlined notch mask reads `--md-textfield-notch` (default `surface`) so a
    field on a non-surface background stays background-independent, and icon-side
    padding stays steady when the outline thickens on focus.

### Patch Changes

- Updated dependencies [8f5ef1a]
- Updated dependencies [c8f572e]
  - @m3-baseui/core@7.0.0

## 6.0.0

### Major Changes

- c73e8cb: ButtonGroup now follows the Material 3 Expressive spec (issue #119).

  Aligned to Compose `ButtonGroupSmallTokens` / `ConnectedButtonGroupSmallTokens` +
  `ButtonGroup.kt`. Both engines emit identical DOM / `data-*` (drop-in).

  **Breaking (visual — no API/DOM changes):**

  - **`standard` gap 8dp → 12dp** (`ButtonGroupSmallTokens.BetweenSpace`).
  - **`connected` children are now equal-width flexible segments** so the press
    squeeze can redistribute width (the M3 connected/segmented layout).
  - **Press squeeze (`ButtonGroupDefaults.ExpandedRatio = 0.15`):** pressing a
    connected child grows it by ~15% while its neighbours compress, animated with
    the fast spatial spring (`flex-grow` + `spring-spatial-fast`). The ratio is kept
    as the `--md-comp-button-group-expanded-ratio` custom property.
  - **Connected seam morphs to `extra-small` (4dp) on press**
    (`PressedInnerCornerCornerSize`).
  - **A selected/toggled connected child rounds fully**
    (`SelectedInnerCornerCornerSizePercent = 50%`).

- c73e8cb: Carousel items now use the Material 3 Expressive `extra-large` (28dp) corner
  (issue #116).

  Aligned to Compose `carousel/Carousel.kt` + samples, where every layout masks
  items with `MaterialTheme.shapes.extraLarge` (28dp). Previously items used
  `large` (16dp). Both engines emit identical DOM / `data-*` (drop-in).

  **Breaking (visual — no API/DOM changes):** item corner radius 16dp → 28dp.

  Note: M3's dynamic keylines (multi-browse large+medium+small, hero side peeks)
  and the scroll-driven mask/parallax with a spring snap depend on a
  scroll-position→size mapping that CSS scroll-snap cannot express. The static item
  sizes approximate the layout (multi-browse/hero already show a trailing/adjacent
  peek via snap alignment); the dynamic keyline and mask transition are documented
  as a future enhancement (a JS scroll driver using `spring-spatial-default`).

- c73e8cb: LoadingIndicator now follows the Material 3 Expressive spec (issue #115).

  Aligned to Compose `LoadingIndicatorTokens` + `LoadingIndicator.kt`. Both engines
  emit identical DOM / `data-*` (drop-in).

  **Breaking (visual — no API/DOM changes):**

  - **Seven-shape morph.** The active indicator now continuously morphs through the
    M3 shape sequence — SoftBurst → Cookie9Sided → Pentagon → Pill → Sunny →
    Cookie4Sided → Oval — each shape held ~650ms (`MorphIntervalMillis`), layered
    under a steady global rotation (`GlobalRotationDurationMillis` ≈ 4666ms). This
    replaces the previous single flower path spun with a rotate + scale pulse. The
    shapes are sampled to a uniform point count and interpolated via the Web
    Animations API in the core factory (engine-agnostic), so both builds behave
    identically and the morph disables under `prefers-reduced-motion`.
  - **Contained config colors fixed.** The contained variant is now a
    `primary-container` pill with an `on-primary-container` shape
    (`ContainedContainerColor` / `ContainedActiveColor`); it was wrongly
    `secondary-container` / `primary` in both engines.

  Also adds a `prefers-reduced-motion` guard to the rotation (previously always ran).

- c73e8cb: NavigationBar and NavigationRail now follow the Material 3 Expressive spec (issue #114).

  Aligned to Compose `NavigationBarTokens` / `NavigationBarVerticalItemTokens` /
  `NavigationRailCollapsedTokens` / `NavigationRailColorTokens`. Both engines emit
  identical DOM / `data-*` (drop-in).

  **Breaking (visual — no API/DOM changes):**

  - **Active label color `on-surface` → `secondary`** (bar + rail;
    `ItemActiveLabelTextColor = Secondary`) — the clearest Expressive change.
  - **NavigationBar height 80dp → 64dp** (`NavigationBarTokens.ContainerHeight`)
    with symmetric item padding for the shorter bar.
  - **NavigationBar active indicator 64×32 → 56×32** (`NavigationBarVerticalItemTokens`;
    the rail was already 56, only the bar was wrong).
  - **NavigationRail collapsed width 80dp → 96dp**, top space 20 → 44dp, item gap
    12 → 4dp, item height fixed at 64dp (`NavigationRailCollapsedTokens`).
  - The active label emphasis is now the `labelMediumEmphasized` typescale (weight 700) instead of a raw `font-bold` (visually equivalent).
  - The active-indicator **state layer is explicitly `on-secondary-container`**
    (was `currentColor`), matching `NavigationRailColorTokens` for active + inactive.

  **Motion:**

  - Indicator / icon / label color transitions now use the `spring-effects-default`
    easing (M3 `DefaultEffects`) instead of `ease-standard` 150ms.

  Also: the Tailwind `tv` wrapper now teaches tailwind-merge the `…-emphasized`
  typescale roles so an active `text-<color>` and `text-<role>-emphasized` no longer
  collide.

- c73e8cb: Progress (Linear + Circular) now follows the Material 3 Expressive spec (issue #117).

  Aligned to Compose `ProgressIndicatorTokens` / `LinearProgressIndicatorTokens` /
  `CircularProgressIndicatorTokens`. Both engines emit identical DOM / `data-*` (drop-in).

  **Breaking (visual — no API/DOM changes):**

  - **Inactive track color `surface-container-highest` → `secondary-container`**
    (`ProgressIndicatorTokens.TrackColor`), linear + circular.
  - **Wavy now applies to indeterminate too** (was determinate-only). Setting
    `wavy` on an indeterminate indicator renders the Expressive wave:
    - Linear: a full-width flowing wave at the 20dp
      `IndeterminateActiveWaveWavelength` (the disjoint two-bar motion is retained
      as the non-wavy default).
    - Circular: a single sine-modulated arc spun by the ring rotation.
  - **Circular wavy refinements:** amplitude 2 → **1.6dp** (`ActiveWaveAmplitude`),
    wavelength ~12 → **15dp** (`ActiveWaveWavelength`), and the wavy ring's outer box
    grows to **48dp** (`WaveSize`) while the 40dp ring stays put.

  **Motion:** determinate value transitions now use the `spring-effects-default`
  easing instead of `ease-standard`.

- c73e8cb: SplitButton now follows the Material 3 Expressive spec (issue #118).

  Aligned to Compose `SplitButtonSmallTokens` + `SplitButton.kt`. Both engines emit
  identical DOM / `data-*` (drop-in).

  **Breaking:**

  - **The `text` variant is removed.** Per the M3 spec the split button has only
    `filled | tonal | outlined | elevated` (there is no text split button). The
    `variant` prop is now typed `SplitButtonVariant` (a split-button-specific type,
    so `Button`'s shared `ButtonVariant` keeps `text`). New exports:
    `SplitButtonVariant`, `SPLIT_BUTTON_VARIANTS`.
  - **Seam corner `small` (8dp) → `extra-small` (4dp)** (`InnerCornerCornerSize`),
    and it **morphs to `medium` (12dp) on hover/press** (`InnerHovered/PressedCornerCornerSize`).
  - **The trailing button morphs to a full circle while the menu is open**
    (`TrailingInnerSelectedCornerCornerSizePercent = 50%`), in addition to the
    existing chevron rotation.
  - Padding: leading 24dp → **16dp outer / 12dp seam**; trailing 12dp → **13dp**.
    Trailing icon 18dp → **22dp** (`TrailingIconSize`).

  **Motion:** shape morphs use the `spring-effects-default` easing; the chevron
  rotation uses `spring-spatial-default`.

  **Drop-in fix:** the popup close animation now matches between engines — both fade
  **and** scale (0.95) on close (Tailwind previously faded only).

- c73e8cb: Toolbar now follows the Material 3 Expressive spec more closely (issue #120).

  Aligned to Compose `FloatingToolbarTokens` / `DockedToolbarTokens` +
  `FloatingToolbar.kt`. Both engines emit identical DOM / `data-*` (drop-in).

  **New prop:**

  - `type` (`floating` | `docked`, default `floating`). `docked` is a
    square-cornered, full-width `surface-container` bar (`DockedToolbarTokens`:
    64dp height, 16dp leading/trailing, 4–32dp spacing) mirrored onto `data-type`.

  **Breaking (visual — no API/DOM changes):**

  - **Floating elevation `level3` → `level0`** (no shadow) — Compose `FloatingToolbar`
    defaults to Level0.
  - **Standard content color `on-surface-variant` → `on-surface`**
    (`contentColorFor(SurfaceContainer)`). (Interactive children paint their own
    color, so this only affects direct text content.)

  **Motion:** a `data-expanded="false"` hook collapses the bar (scale + fade) with
  the fast spatial spring, for consumer-driven show/hide.

  Deferred: the vibrant toggle-_selected_ inversion (a selected action flipping to
  surface-container / on-surface) and full unification of the vibrant child-color
  mechanism are left for a follow-up — both require overriding IconButton's own
  colors, which cannot be done drop-in via CSS specificity alone (it would need
  `!important`, which vanilla-extract does not support).

### Minor Changes

- c73e8cb: NavigationRail gains the Material 3 Expressive expanded mode (issue #121).

  Aligned to Compose `NavigationRailExpandedTokens` /
  `NavigationRailHorizontalItemTokens` + `WideNavigationRail.kt`. Additive and
  drop-in — both engines emit identical DOM / `data-*`.

  **New props (on `NavigationRail.Root`):**

  - `expanded`: widens the rail to 220–360dp (`ContainerWidthMinimum/Maximum`) and
    lays its items out horizontally — icon left, label right (`labelLarge`), with a
    56dp-tall active indicator, 16dp leading space and 8dp icon–label gap. The width
    animates with the default spatial spring.
  - `modal`: renders the expanded rail as an elevated `surface-container` sheet
    (elevation Level2, 16dp corner). Implies `expanded`.

  Both are surfaced via `data-expanded` / `data-modal` on the root, so the layout
  switches purely in CSS without any DOM change. The collapsed vertical rail and the
  existing `header` slot are unchanged.

### Patch Changes

- c73e8cb: SegmentedButton selection motion now uses the M3 Expressive springs (issue #122).

  Compose drives the selection transition with the motion scheme (the
  `OutlinedSegmentedButtonTokens` file carries no motion tokens). Matching that:
  the selection color transition now rides the fast **effects** spring
  (`spring-effects-fast`) and the checkmark's width — a spatial change (0→18dp) —
  the fast **spatial** spring (`spring-spatial-fast`), both replacing the previous
  `ease-standard` 150ms. Both engines emit identical values (drop-in); no DOM or
  static-render change (visual baselines are unaffected).

- Updated dependencies [c73e8cb]
- Updated dependencies [c73e8cb]
- Updated dependencies [c73e8cb]
- Updated dependencies [c73e8cb]
- Updated dependencies [c73e8cb]
- Updated dependencies [c73e8cb]
  - @m3-baseui/core@6.0.0

## 5.0.0

### Major Changes

- df50106: feat(icon-button): M3 Expressive shape morph (round↔square) and toggle color revisions

  Bring Icon Button up to M3 Expressive parity (Compose `{XSmall..XLarge}IconButtonTokens`
  / `FilledIconButtonTokens` / `FilledTonalIconButtonTokens` / `OutlinedIconButtonTokens`
  14_1_0, issue #113). Both engines emit identical DOM/`data-*` (drop-in). The
  XS–XL size and narrow/default/wide width systems are unchanged.

  **New prop**

  - `shape` (`round` | `square`, default `round`): square corners are
    XS·S 12 / M 16 / L·XL 28 dp. The corner morphs smaller on press
    (`PressedContainerShape`: XS·S 8 / M 12 / L·XL 16 dp). Toggle selection swaps
    to the opposite shape — a selected `round` container morphs to the square
    corner, a selected `square` container morphs to `full` (round↔square
    inversion, Expressive's signature toggle behavior).

  **Breaking changes (visual)**

  - **tonal toggle selected** now uses `secondary` + `on-secondary` (was the
    variant default `secondary-container`, which left selection visually
    indistinguishable — a bug fix).
  - **filled toggle unselected** moves from `surface-container-highest` + `primary`
    to `surface-container` + `on-surface-variant`; **tonal toggle unselected** is
    the variant default `secondary-container` + `on-secondary-container`.
  - **outlined outline** moves from `outline` to `outline-variant` (disabled
    included), with L 2dp / XL 3dp border widths.
  - **filled/tonal disabled** container opacity 0.12 → 0.1 (outlined selected
    disabled container too).
  - Motion now uses the `spring-effects-default` easing (critically damped, no
    bounce) per Compose `DefaultEffects`.

  Refresh any visual-regression baselines.

### Patch Changes

- Updated dependencies [df50106]
  - @m3-baseui/core@5.0.0

## 4.0.0

### Major Changes

- 890e72d: feat(button): M3 Expressive size system, shape morph, toggle, and color revisions

  Bring Button up to M3 Expressive parity (Compose `Button{XSmall..XLarge}Tokens`
  v0_11_0 + `Button.kt`). Both engines emit identical DOM/`data-*` (drop-in).

  **New props**

  - `size` (`xs` | `s` | `m` | `l` | `xl`, default `s`): heights 32/40/56/96/136dp,
    icons 20/20/24/32/40dp, symmetric horizontal padding 12/16/24/48/64dp,
    icon–label gap 4/8/8/12/16dp (XS is special-cased in Compose `Button.kt` to
    12dp/4dp; S–XL use their `Button{Size}Tokens` values), and size-linked typescale
    (XS·S labelLarge / M titleMedium / L headlineSmall / XL headlineLarge —
    Compose does **not** use the Emphasized companions).
  - `shape` (`round` | `square`, default `round`): square corners are
    XS·S 12 / M 16 / L·XL 28 dp. The corner morphs smaller on press
    (`PressedContainerShape`: XS·S 8 / M 12 / L·XL 16 dp).
  - `selected` (toggle): adds `aria-pressed` + `data-selected`, applies the
    Selected/Unselected color set (e.g. filled unselected =
    `surface-container` + `on-surface-variant`), and swaps to the opposite shape
    while selected.

  **Breaking changes**

  - Outlined/text label color moves from `primary` to `on-surface-variant`;
    the outlined border moves from `outline` to `outline-variant` (disabled too),
    with L 2dp / XL 3dp border widths.
  - Disabled container opacity 0.12 → 0.1 and filled/elevated disabled label
    `on-surface` → `on-surface-variant` (@0.38). **tonal is unchanged** upstream
    (`FilledTonalButtonTokens` v0_103) and keeps 0.12 / `on-surface`.
  - The S size gains a 20dp icon (was 18dp) and symmetric 16dp padding; the
    pre-Expressive asymmetric with-icon padding is removed.
  - Motion now uses the `spring-effects-default` easing (critically damped, no
    bounce) per Compose `DefaultEffects`.

- 191b5a4: Slider now follows the Material 3 Expressive spec (issue #111).

  **Breaking (visual — no API/DOM changes):** the slider is a full visual swap from
  the M3 2021 form to the Expressive shape system. Same components, props, and
  `data-*` contract; refresh any visual-regression baselines.

  - **16dp track** (was 4dp) and a **44dp control** height to hold the handle.
  - **4×44dp bar handle** (`CornerFull`) replaces the 20dp circular thumb + 40dp
    state layer. The state layer is gone; the handle shrinks **4→2dp on
    pressed/focus** (hover stays 4dp) via the fast-spatial spring. Disabled keeps
    the 4dp width.
  - **6dp track gap** on each side of the handle with a **2dp inside corner**. The
    active fill (indicator) and the inactive rail (drawn on the track pseudos) are
    offset by the gap; the factory publishes the active-region fraction as
    `--m3-slider-start` / `--m3-slider-end` and flags `data-range` on the root.
  - **Inactive track → `secondary-container`** (was `surface-container-highest`).
  - **Stop dots reverse**: `primary` on the inactive track, `secondary-container`
    on the active track, `on-surface` when disabled.
  - **Value indicator → `inverse-surface` / `inverse-on-surface`** (was
    `primary` / `on-primary`) with a **12dp** bottom space (was 8dp).
  - Drop-in fix: the handle's width transition now shares the fast-spatial spring
    easing across both engines (previously the Tailwind build left it unspecified
    while vanilla-extract used `easing.standard`).

  Disabled per-token opacities are unchanged (inactive 0.12 / active + handle 0.38
  on `on-surface`).

### Patch Changes

- Updated dependencies [890e72d]
- Updated dependencies [191b5a4]
  - @m3-baseui/core@4.0.0

## 3.0.0

### Major Changes

- b078bd8: Select no longer exposes `Select.ScrollUpArrow` / `Select.ScrollDownArrow`.

  M3 Menus have no sticky chevron scroll affordance — the menu surface scrolls
  via plain `overflow` (matching Material 3 Compose's `ScrollState` + `Column`
  pattern). The sticky arrows were a Base UI Select carry-over that diverged from
  the spec and interfered with the `:first-child` / `:last-child` item corner
  shapes (issue #98).

  **Breaking (Select):**

  - The `ScrollUpArrow` and `ScrollDownArrow` parts are removed from the Select
    namespace in both engines, along with the `scrollUpArrow` / `scrollDownArrow`
    slots on `SelectClasses`.

  Migration: delete `<Select.ScrollUpArrow />` / `<Select.ScrollDownArrow />` from
  your `Select.Popup`. The popup already scrolls on overflow, so no replacement is
  needed. Custom class overrides for the `scrollUpArrow` / `scrollDownArrow` slots
  can be dropped.

### Minor Changes

- a402a41: Carousel: keyboard scrolling + M3 four-layout parity (issue #78)

  - The focusable scroller now advances one item at a time with the arrow keys
    along its scroll axis (←/→ horizontally, ↑/↓ for `full-screen`). Navigation
    lives in `@m3-baseui/core`, so both engines share the behavior, DOM, and
    `data-*` contract. A caller `onKeyDown` still runs and can opt out via
    `preventDefault()`.
  - Added a keyboard-only focus ring (3px secondary, WCAG 2.4.7) and
    `prefers-reduced-motion` handling for the scroll animation in both engines.
  - Added the missing M3 `uncontained` layout, completing the four variants
    (`multi-browse` / `uncontained` / `hero` / `full-screen`).

### Patch Changes

- Updated dependencies [a402a41]
- Updated dependencies [b078bd8]
  - @m3-baseui/core@3.0.0

## 2.0.0

### Major Changes

- ea3c7b9: FAB / Extended FAB / FAB Menu now follow the Material 3 Expressive spec.

  **Breaking (FAB / FabMenu):**

  - `size` is now `'small' | 'medium' | 'large'` mapping to **56 / 80 / 96 dp** (was `small` 40dp / `regular` 56dp / `large` 96dp). The pre-Expressive 40dp FAB is removed.
  - The extended FAB is no longer a `size` value. Use the new `variant="extended"` prop, which combines with `size` — extended small/medium/large are 56/80/96 dp with title-medium / title-large / headline-small labels.
  - The `surface` container color is removed (deprecated by M3). Colors are `primary | secondary | tertiary`; the default FAB color is now `primary`.
  - Large FAB icon is 32dp (was 36dp); FAB Menu items use a title-medium label with 24dp leading/trailing padding.

  **Tokens:** added the Expressive shape steps `largeIncreased` (20dp) and `extraLargeIncreased` (32dp), surfaced as `rounded-large-increased` / `rounded-extra-large-increased` (Tailwind) and `vars.sys.shape.largeIncreased` / `extraLargeIncreased` (vanilla-extract).

  Migration: `size="regular"` → `size="small"`; old `size="small"` (40dp) → nearest is `size="small"` (56dp); `size="extended"` → `variant="extended"`; `color="surface"` → `color="primary"`.

### Minor Changes

- ab93138: Align the Progress indicators with the current Material 3 spec.

  - **Circular**: default to the 40dp outer diameter (was 48dp) and add `size`
    (spec range 24–240dp) and `thickness` (4dp default, 8dp thick) props; draw the
    active arc and inactive track with a 4dp gap and rounded caps; replace the
    static spinning arc with the M3 "advance" motion (the ring rotates while the
    arc grows and shrinks).
  - **Linear**: add a `thickness` prop (4dp default, 8dp thick) and replace the
    single sliding bar with M3's disjoint two-segment indeterminate motion.
  - **Wavy (M3 Expressive)**: add a `wavy` prop and `amplitude` to both
    indicators for the determinate wavy active shape.
  - Respect `prefers-reduced-motion` with static fallbacks in both engines.

  Both engines keep emitting identical DOM and `data-*` state (drop-in parity).

### Patch Changes

- Updated dependencies [ea3c7b9]
- Updated dependencies [ab93138]
  - @m3-baseui/core@2.0.0
  - @m3-baseui/tokens@1.1.0

## 1.4.0

### Minor Changes

- eebc0a7: feat(dialog): full-screen バリアント / icon スロット / min-width 280dp / actions スロット（#62）

  コンテナ・通知系の M3 仕様照合（#38）で判明した残課題。これまで Dialog は **basic
  dialog のみ**で、M3 アナトミーの一部要素が欠けていた。M3 Dialog のアナトミーに沿って
  以下を補う。両エンジンで同一 DOM・同一 `data-*` を出力する（drop-in 互換）。

  - **full-screen バリアント**: `<Dialog.Popup fullscreen>` が edge-to-edge の `surface`
    を描画（`data-fullscreen` を付与）。`Dialog.Header`（先頭 close + title + 末尾 action）
    と `Dialog.Divider`（`outline-variant` の区切り線）レイアウトスロットを追加。
  - **icon スロット（任意）**: 24dp・水平中央・`secondary` 色の `Dialog.Icon`。提示時は
    `:has([data-slot="dialog-icon"])` で headline / supporting text を中央寄せ。
  - **min-width 280dp**: basic dialog に min-width を付与（従来は max-width のみ）。
  - **actions スロット**: end-aligned・ボタン間 8dp・supporting text から 24dp 上方間隔の
    `Dialog.Actions`。

  ロジックは core の `create-dialog` ファクトリに一元化。新規トークンは不要（既存の
  `secondary` / `outline-variant` / shape / elevation で充足）。ポータル系のため対話は
  E2E（Playwright + axe）で検証し、ユニット（Tailwind 代表）はトークン契約の断片一致に
  限定した。

- 5771401: feat(list,item): leading バリアント（avatar 40dp / image 56dp / video 100×56dp）を追加（#63）

  コンテナ・通知系の M3 仕様照合（#38）で判明した残課題。これまで List/Item の leading は
  **icon（24dp）のみ**実装され、contract の JSDoc が謳う avatar/image は未対応だった。

  `List.Item` / `Item` に **`leadingVariant`**（`icon` | `avatar` | `image` | `video`、
  既定 `icon`）を追加。M3 の leading 列幅に合わせ avatar=40dp（円形）・image=56dp・
  video サムネイル=100×56dp とし、icon は従来どおり 24dp。サイズはファクトリが leading
  スロットへ出力する **`data-leading`** 属性をフックに CSS 側で解決するため、両エンジンで
  同一 DOM・同一 `data-*` を維持する（drop-in 互換）。`<img>` は列幅に合わせて
  `object-fit: cover` で充填する。

  a11y: 装飾アイコン（`leadingVariant="icon"`）のみ無条件 `aria-hidden` とし、情報を持つ
  avatar/image/video は a11y ツリーに残す（呼び出し側が `<img alt>` 等でアクセシブル名を
  付与する）。3 行レイアウトでは leading/trailing を従来どおり top 揃え（`items-start`）に
  する。

  新規エクスポート: `LIST_LEADING_VARIANTS` / `ListLeadingVariant` / `ITEM_LEADING_VARIANTS`
  / `ItemLeadingVariant`（両エンジン + core）。新規トークンは不要。

- 5fab09e: feat(tooltip): Rich tooltip バリアントを追加（#61）

  コンテナ・通知系の M3 仕様照合（#38）で判明した残課題。これまで Tooltip は **Plain
  tooltip のみ**実装され、M3 が定義するもう一方の **Rich tooltip** が未実装だった。

  Rich tooltip は action buttons（操作可能なコントロール）を内包するため、視覚専用で
  hover/focus 駆動・タッチ無効の Base UI Tooltip ではなく、**Base UI Popover**（クリック/
  キーボードで開きフォーカス管理を行う）の上に実装した。これにより action がキーボード/
  タッチ利用者からも到達可能になる（Plain tooltip は従来どおり Tooltip primitive のまま）。
  新規エクスポートは `RichTooltip`（両エンジン）。両エンジンで同一 DOM・同一 `data-*` を
  出力する（drop-in 互換）。

  - **container**: `surface-container` / `elevation level2` / 角丸 `medium`(12dp) /
    max-width 320dp（`RichTooltip.Popup`）。
  - **subhead（任意）**: `title-small` / `on-surface`。Popover の Title を用いてポップアップの
    アクセシブル名も配線（`RichTooltip.Subhead`）。
  - **supporting text**: `body-medium` / `on-surface-variant`。Popover の Description で
    アクセシブル説明も配線（`RichTooltip.SupportingText`）。
  - **action buttons（任意）**: コンテナ下部に **先頭（左）寄せ**で並ぶ text button の行
    （`RichTooltip.Actions`）。M3 はリッチツールチップのアクションを bottom-left に配置する
    （dialog の末尾寄せとは異なる）。`RichTooltip.Close` でアクション押下時にポップアップを
    閉じられる。

  新規トークンは不要（既存の `surfaceContainer` / `titleSmall` / `bodyMedium` /
  `onSurfaceVariant` / `shape.medium` / `elevation.level2` で充足）。ポータル/位置計算系の
  ため対話は E2E（Playwright、両エンジン: クリックで開く / アクションがキーボード操作可能）で
  検証し、ユニット（Tailwind 代表）はトークン契約の断片一致に限定した。

### Patch Changes

- Updated dependencies [eebc0a7]
- Updated dependencies [5771401]
- Updated dependencies [5fab09e]
  - @m3-baseui/core@1.3.0

## 1.3.0

### Minor Changes

- fd8cc42: feat(motion): Selection コンポーネントを M3 のモーション（非対称イージング / spatial）へ整備 (#55)

  Selection 検証（#36）で、Checkbox / Radio / Switch のモーションが全コンポーネント共通の
  house style（`duration-150/200 ease-standard`）で実装され、M3 が規定する **state 別の
  非対称イージング/デュレーション**と乖離していた点を是正した。両エンジンで同一の見え方
  （drop-in 互換）を保ち、デュレーションは `--md-sys-motion-duration-*` トークン参照へ統一した。

  - **Checkbox**: 選択インジケータの opacity 遷移を**非対称**化。unselected-exit は
    `emphasized-accelerate` × `short3`(150ms)、selected/indeterminate-enter は
    `emphasized-decelerate` × `medium3`(350ms)。material-web `_checkbox.scss` に倣う。
  - **Radio**: inner dot を width/height アニメから **`transform: scale()`** へ変更し、
    `emphasized-decelerate` × `medium2`(300ms) の inner-circle-grow に。dot は常に 10dp で
    中心からスケールする（静止時の見えは不変）。
  - **Switch**: handle の spatial モーションを `ease-standard`(200ms) から **`emphasized`** ×
    `medium2`(300ms) へ。emphasized はオーバーシュートしないため、handle の color 遷移へ
    spring を適用した場合の flicker を避けつつ spatial を強調できる（spring-spatial は
    per-property easing が必要なため将来課題）。

  静止状態の見えは 3 コンポーネントとも不変のため、ビジュアル回帰ベースラインは変化なし。
  ユニット（Tailwind 代表）で各 state のイージング/デュレーション断片を検証。

## 1.2.0

### Minor Changes

- caad12d: feat(display/motion): Carousel / Loading indicator / Toolbars を新規実装

  表示・モーション系の 3 コンポーネントを両エンジン drop-in 互換で追加。ロジックは core の
  `createCarousel` / `createLoadingIndicator` / `createToolbar` ファクトリに一元化し、両エンジンで
  同一 DOM・同一 `data-*` を出力する。

  - **Carousel**: CSS scroll-snap のスクローラー。`Carousel.Root`（`role="group"` +
    `aria-roledescription="carousel"`）が `variant` を解決して context で `Carousel.Item` に配り、
    `data-variant` を出力する。`multi-browse`（大中小アイテム）/ `hero`（ピーク付きの大アイテム、
    center-snap）/ `full-screen`（縦スクロールで 1 画面 1 アイテム）の 3 レイアウト。アイテムは
    `large` 角丸の snap セル。スクロールバーは非表示。
  - **LoadingIndicator**: M3 Expressive のローディングインジケーター（Progress とは別物）。
    `role="progressbar"` の不確定インジケーターで、7 ローブのソフト形状（中点スムージングで
    生成、両エンジン同一ジオメトリ）が回転＋モーフ（rotate + scale）し続ける。`contained` で
    `secondary-container` のピル状コンテナに載せる。
  - **Toolbar**: M3 Expressive の浮遊ツールバー。`role="toolbar"` の full 角丸・elevation level3 の
    ピルで、`standard`（surface-container）/ `vibrant`（primary-container）の 2 配色と
    `horizontal` / `vertical` の 2 方向。`variant` / `orientation` を `data-*` に反映し、縦方向では
    `aria-orientation="vertical"` を付与。

  色はチャンネル三値 + `rgb()` で `--md-sys-*` 経由、形状・elevation・モーションはトークン経由。
  ユニットは初期描画とトークン契約をカバー（co-located `*.test.tsx`）。

- 7aa1f7b: feat(actions): Expressive ボタン（Button groups / Split button）を新規実装

  M3 Expressive のボタン 2 コンポーネントを両エンジン drop-in 互換で追加。ロジックは core の
  `createButtonGroup` / `createSplitButton` ファクトリに一元化し、両エンジンで同一 DOM・同一
  `data-*` を出力する。

  - **ButtonGroup**: 関連ボタンを横並びにする `role="group"` コンテナ。`standard` は 8dp の
    ギャップで配置、`connected` は 2dp に詰めて子の内側（シーム）コーナーを `small`（8dp）へ
    落とし、外側コーナーは full のまま 1 つの連結ユニットに見せる。子コーナーの上書きは
    Tailwind は子セレクタ、VE は `globalStyle`（連結クラスにスコープ）で実装。`render` で
    ホスト要素を差し替え可能。
  - **SplitButton**: 主アクションボタンとメニューを開くトレーリングボタンを 2dp のシームで
    連結。トレーリングは Base UI `Menu.Trigger` で、`data-popup-open` でシェブロンが 180°
    回転し、ドロップダウンは M3 メニューサーフェスを再利用する。両パートは `ButtonVariant`
    （filled / tonal / outlined / elevated / text）でコンテナ色を共有し、向かい合うコーナーを
    互いに落として連結を表現。`Root`（`Menu.Root`）/ `Group` / `Leading` / `Trailing` /
    `Portal` / `Positioner` / `Popup` / `Item` の名前空間で公開。

  色はチャンネル三値 + `rgb()` で `--md-sys-*` 経由、ステートレイヤーは `::before`
  オーバーレイ、disabled はブランケット不透明度ではなくトークン別 dim。ユニットは初期描画と
  トークン契約、ポータル/対話とビジュアル回帰は E2E（interactions / visual / a11y）でカバー。

- bc19357: feat(pickers): Search / Date pickers / Time pickers を新規実装

  M3 の検索・日時系 3 コンポーネントを両エンジン drop-in 互換で追加。ロジックは core の
  `create-*` ファクトリに一元化し、エンジンはクラス解決器のみ差し替える。

  - **Search**（search bar + docked view）: Base UI Combobox を土台に、resting の検索バー
    （surface-container-high のピル）と docked のサジェスト一覧（elevation 3）を提供。
    サジェスト行は hover / `data-highlighted` / `data-selected` に連動する `::before`
    ステートレイヤーを持つ。
  - **Date pickers**（calendar + docked + modal）: Base UI に暦プリミティブが無いため、
    月グリッドの headless `Calendar`（状態は `data-selected` / `data-today` / `data-disabled`）
    を `<table>` セマンティクスで実装。docked は Popover、modal は Dialog のサーフェスに載せる。
    年選択ビュー・min/max・ロケール対応を含む。
  - **Time pickers**（dial + input）: 12 時間ダイアル（クロックフェイス + ハンド）と
    入力式の 2 レイアウト。AM/PM トグルを共有し、アクティブなフィールドは primary-container、
    選択中のダイアル数字は primary でフィル。

  色はチャンネル三値 + `rgb()` ラップで `--md-sys-*` 経由、ステートレイヤーは `::before`、
  両エンジンで同一 DOM・同一 `data-*` を出力する。ユニットは初期描画と単純クリックを検証し、
  ポータル/位置計算/ダイアルのドラッグは E2E に委ねる。

- 40a6b39: feat(a11y): 48dp 最小タッチ領域を Checkbox / Radio / Switch / Chip / IconButton へ付与 (#51)

  M3 が a11y 要件として規定する **48dp の最小タッチ領域**を、視覚に影響を与えずヒット領域のみ
  拡張する形で、小型インタラクティブコンポーネント（Checkbox / Radio / Switch / Chip /
  IconButton）へ付与した。material-web の touch-target パターン（絶対配置の透明オーバーレイ）に
  倣い、`@m3-baseui/core` の `TouchTarget`（`Ripple` と同様にジオメトリを core に一元化）として
  実装し、各ファクトリが描画する。両エンジンで同一 DOM・同一 `data-*`（drop-in 互換）。

  - **TouchTarget**: `position: absolute` で中央寄せの透明 `span[data-touch-target]`（`aria-hidden`）。
    `width/height: 100%` + `min-width/min-height: 48px`（＝ `max(48px, 100%)` 相当）で、48dp 未満の
    コントロールは 48dp まで拡張し、すでに 48dp 以上なら縮めない。`pointer-events` は指定せず、
    有効時は親から `auto` を、`disabled` 時は `none` を継承するため、拡張領域も適切に不活性化する。
  - 適用: **Checkbox**（18dp）/ **Radio**（20dp）/ **Switch**（52×32dp）/ **Chip**（32dp の
    assist・suggestion・filter）/ **IconButton**（小型サイズ）。
  - **Chip / IconButton** はルートの `overflow: hidden` がオーバーレイを切り落とすため、ステート
    レイヤー（`::before`）を `border-radius: inherit` で丸めてコーナークリップを担わせ、ルートの
    `overflow: hidden` を撤去した（ripple は自前でクリップ）。視覚出力は不変。

  透明・レイアウト非破壊のためビジュアル回帰スナップショットは変化なし。ユニットでオーバーレイの
  存在と寸法を、E2E（interactions）で実ブラウザ上の 48dp ジオメトリ（両エンジン）を検証。

### Patch Changes

- Updated dependencies [caad12d]
- Updated dependencies [7aa1f7b]
- Updated dependencies [bc19357]
- Updated dependencies [40a6b39]
  - @m3-baseui/core@1.2.0

## 1.1.0

### Minor Changes

- 9f5fb8b: feat(navigation): TopAppBar / BottomAppBar / NavigationRail を新規実装

  M3 仕様に沿ってアプリバー / レールの 3 コンポーネントを両エンジン drop-in 互換で追加。

  - **TopAppBar**: small / center / medium / large の 4 バリアント。small/center は 64dp
    単一行（title-large、左寄せ / 中央寄せ）、medium/large はアクション行の下に見出し行を
    追加（headline-small / headline-medium、112dp / 152dp）。コンテナは surface、
    `data-variant` を CSS フックに露出。
  - **BottomAppBar**: 80dp の surface-container（`role="toolbar"`）。先頭にアクション
    アイコン、末尾に任意の FAB を内包。
  - **NavigationRail**: NavigationBar の縦版（中型画面向け）。Base UI `ToggleGroup` /
    `Toggle` で単一選択、選択は `data-pressed` 経由で secondary-container のインジケータ
    ピル・アイコン / ラベル色を駆動。先頭に任意の header（メニュー / FAB）領域。disabled は
    トークン別 dim（on-surface 38%）でステートレイヤー抑止。

  ロジックは core の `create-*` ファクトリに一元化し、両エンジンで同一 DOM・同一 `data-*` を出力。

- 1cd3a42: feat(fab): FAB menu（拡張アクション）を新規実装

  M3 仕様の FAB menu を両エンジン drop-in 互換で追加（issue #42）。既存の Extended FAB
  （`<Fab size="extended">`）はラベル対応バリアントとして継続。

  - **FAB menu**: Base UI Menu を土台にした専用ネームスペース（`FabMenu.Root` /
    `Trigger` / `Portal` / `Positioner` / `Popup` / `Item`）。Trigger は FAB のクラス
    解決器を再利用した FAB そのもの、Popup はアクションを列で重ねるコンテナ、Item は
    56dp の full-corner ピル（先頭アイコン 24dp + label-large）。
  - 色は `surface` / `primary` / `secondary` / `tertiary` のコンテナ三値 + `rgb()` ラップ。
    ステートレイヤーは `currentColor` + `--md-sys-state-*` の `::before` オーバーレイで、
    hover / `data-highlighted` / pressed に追従。disabled はブランケット不透明度ではなく
    トークン別（`on-surface` 12% / 38%）。
  - role / ARIA / キーボード操作（矢印・Escape）と `data-popup-open` 契約は Base UI Menu
    に委譲。ユニットはトークン契約 + Trigger 描画、ポータル対話は E2E（Playwright + axe）で検証。

- 0d5c0a4: feat(sheets): Bottom sheets / Side sheets を新規実装

  M3 仕様に沿ってシートの 2 コンポーネントを両エンジン drop-in 互換で追加。Base UI の
  `drawer` プリミティブ（スワイプで dismiss）をベースにし、`data-swipe-direction` /
  `data-starting-style` / `data-ending-style` / `data-swiping` を CSS フックに露出する。

  - **BottomSheet**: 下端にドッキングする surface-container-low のサーフェス。上端コーナーは
    extra-large（28dp）、elevation 1、32×4dp のドラッグハンドル（on-surface-variant 40%）。
    `variant` が `modal`（スクリム + フォーカストラップ + スクロールロック）/ `standard`
    （ページと共存）を切替える。`--drawer-swipe-movement-y` でスワイプに追従。
  - **SideSheet**: 端に固定する全高 320dp の surface-container-low サーフェス（補足コンテンツ用）。
    `side`（left / right）で固定辺を、`variant` で modal（スクリム + elevation 1 + 先頭辺を
    large=16dp で丸める）/ standard（フラット）を切替える。固定辺は popup の
    `data-swipe-direction` から CSS で解決し、左右を 1 リゾルバで賄う。

  ロジックは core の `createBottomSheet` / `createSideSheet` ファクトリに一元化し、両エンジンで
  同一 DOM・同一 `data-*` を出力。ポータル/対話は E2E（interactions / a11y）でカバー。

### Patch Changes

- Updated dependencies [9f5fb8b]
- Updated dependencies [1cd3a42]
- Updated dependencies [0d5c0a4]
  - @m3-baseui/core@1.1.0

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
