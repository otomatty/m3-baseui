# @m3-baseui/core

## 1.3.0

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
