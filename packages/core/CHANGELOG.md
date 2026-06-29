# @m3-baseui/core

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

## 1.0.1

### Patch Changes

- Updated dependencies [10e244b]
  - @m3-baseui/tokens@1.0.1

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
