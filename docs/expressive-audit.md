# M3 Expressive 準拠監査（Phase 1: 高優先 12 コンポーネント）

Issue #105 のトラッキングに基づく監査結果。全 39 コンポーネントのうち、構造的変更が大きいと
仮説を立てた高優先 12 コンポーネントを 5 軸で棚卸しした（監査日: 2026-07-05）。

## 一次ソース

`m3.material.io` はプロキシ環境で参照不可のため、**Compose Material3 のトークンソースを一次ソース**とする
（FAB 追従 PR #104 と同じ経路）。補助として Compose の実装ソース（`Button.kt` / `Slider.kt` /
`NavigationItem.kt` 等）で MotionScheme の割当てとレイアウトロジックを確認した。

- `raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/*Tokens.kt`
- 各コンポーネント節に、実際に HTTP 200 で取得できたトークンファイルを記載する。
- `MotionSchemeTokens.kt` は存在しない（404）。spring の割当ては各実装ソースの
  `MotionSchemeKeyTokens.*` 参照から読み取った。

## 判定基準（5 軸）

| 軸 | 内容 |
| --- | --- |
| 1. サイズ体系 | Expressive の新サイズ（Button / IconButton の XS–XL 等）が入っているか |
| 2. シェイプ | コーナー値、押下/選択での shape morph（round↔square） |
| 3. タイポ | ラベルロールが `…Emphasized` companion に切替わっているか（仕様が要求する箇所） |
| 4. モーション | 旧 cubic-bezier ではなく `spring-spatial-*` / `spring-effects-*` を使っているか |
| 5. 配色/状態 | 非推奨ロール・新 active-indicator 等の反映 |

判定: **準拠** / **一部** / **未対応**

## サマリ

| コンポーネント | 総合判定 | 主要 gap | 破壊的変更の有無 |
| --- | --- | --- | --- |
| button | **未対応** | サイズ XS–XL・shape morph・toggle・outlined/text の配色改定がすべて欠落 | あり（outlined/text ラベル色、S パディング/アイコン） |
| icon-button | 一部 | shape 軸（square/押下/選択 morph）と toggle 配色改定が未対応（サイズ体系は完全一致） | あり（tonal toggle selected 色ほか） |
| button-group | 一部 | 押下時の近隣スクイーズ（+15%）・シーム morph・standard gap 8→12px | なし（視覚差のみ） |
| split-button | 一部 | シーム角 4dp 化・hover/押下 morph・開時 trailing 円形化・サイズ体系 | なし（text バリアント削除時のみ破壊的） |
| segmented-button | 一部（モーションのみ） | 選択遷移・チェックマークが `ease-standard` 150ms のまま（spring 未適用）。静的トークンはベースライン準拠、Expressive 版トークンは Compose に存在せず | なし |
| slider | **未対応** | M3 2021 レガシー版のまま（16dp トラック・バーハンドル・ギャップ・stop dots すべて未対応） | あり（視覚の全交換） |
| progress | 一部 | トラック色 SecondaryContainer 化・indeterminate の wavy 化・circular wavy 微調整 | あり（indeterminate の視覚） |
| loading-indicator | 一部 | 核心の 7 シェイプポリゴンモーフ・contained 配色 | あり（アニメーションの視覚） |
| navigation-rail | 一部 | collapsed 96dp / expanded 220–360dp の 2 モード構造・active ラベル色・spring | あり（幅・配色） |
| navigation-bar | 一部 | 高さ 80→64dp・indicator 幅 64→56dp・active ラベル色 secondary 化・spring | あり（高さ・配色） |
| toolbar | 一部 | docked バリアント不在・vibrant 内 selected 反転色・elevation 過剰・show/hide モーション | 軽微（elevation 変更時） |
| carousel | 一部 | アイテム radius 16→28px・multi-browse/hero の large+medium+small 体系・マスク遷移 | あり（radius） |

**トークン不足: なし。** 12 コンポーネントすべてで、gap 解消に必要なシステムトークン
（Emphasized タイポ / spring-spatial-* / spring-effects-* / shape スケール / カラーロール)は
`packages/tokens/src/tokens.ts` に既存。gap はすべてコンポーネント側スタイル/ロジックの問題であり、
`bun run gen:tokens` を要する変更は発生しない（任意候補は「トークンに関する備考」参照）。

---

## button

**総合判定: 未対応**（pre-Expressive 実装。S サイズ単体としてはほぼ正しいが、サイズ体系・shape morph・toggle・Expressive 配色改定がすべて欠落）

参照した Compose トークンファイル: `ButtonXSmallTokens.kt` / `ButtonSmallTokens.kt` / `ButtonMediumTokens.kt` / `ButtonLargeTokens.kt` / `ButtonXLargeTokens.kt`（いずれも v0_11_0）、`FilledButtonTokens.kt` / `ElevatedButtonTokens.kt` / `OutlinedButtonTokens.kt` / `TextButtonTokens.kt`（v0_11_0）、`FilledTonalButtonTokens.kt`（**v0_103 のまま = Compose 側も tonal は未改定**）、`ShapeTokens.kt`、`StateTokens.kt`、`MotionTokens.kt`、`ExpressiveMotionTokens.kt`、実装参照 `Button.kt`

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| サイズ | `size` prop | なし（40dp 固定 = S 相当） | XS 32 / S 40 / M 56 / L 96 / XL 136 dp | 非（追加） | `ButtonProps` に `size` がない。contract.ts の変更要 |
| サイズ | アイコンサイズ | 18px 固定 | XS 20 / S 20 / M 24 / L 32 / XL 40 dp | 見た目変更 | S でも 18→20dp に拡大（`IconSize = 20.0.dp`） |
| サイズ | 水平パディング | 24px（アイコン側のみ 16px、text は 12px） | Leading/TrailingSpace: XS 16 / S 16 / M 24 / L 48 / XL 64 dp（**アイコン有無で非対称にしない**） | 見た目変更 | S は両側 16dp に縮小。現行の `data-[with-start-icon]:pl-4` 非対称仕様は Expressive で廃止 |
| サイズ | アイコン-ラベル間隔 | 8px (gap-2) | IconLabelSpace: XS/S/M 8 / L 12 / XL 16 dp | 非 | S は一致 |
| シェイプ | round/square | `rounded-full` のみ | round=full / square: XS・S=medium(12px), M=large(16px), L・XL=extraLarge(28px)。`shape` prop 必要 | 非（追加） | `ContainerShapeRound` / `ContainerShapeSquare` |
| シェイプ | 押下時 shape morph | なし（常時 full） | `PressedContainerShape`: XS・S=small(8px), M=medium(12px), L・XL=large(16px) へ角丸が縮む | 見た目変更 | Compose は `shapeByInteraction` で押下時にアニメーション |
| シェイプ | 選択時 shape | なし | `SelectedContainerShapeRound`=full / `...Square`=square 値（toggle 用） | 非 | toggle 未実装のため現状対象外 |
| タイポ | ラベルロール | labelLarge 固定 | `Button.kt textStyleFor()`: XS・S=labelLarge / M=titleMedium / L=headlineSmall / XL=headlineLarge | 非（サイズ追加時のみ） | **Compose は Emphasized companion を使っていない**（labelLarge のまま）。S 単体は準拠 |
| モーション | shape/状態遷移 | `duration-200 ease-[--md-sys-motion-easing-standard]`、state layer 100ms | Compose は `MotionSchemeKeyTokens.DefaultEffects`（spring stiffness 1600 / damping 1.0 ≒ `springEffectsDefault`。「bounce させないため intentional」とコメント明記） | 非 | tokens.ts に `springEffectsDefault`(200ms / cubic-bezier(0.34,0,0.2,1)) が既にあるのに未使用。shape morph 実装時は spatial ではなく **effects** が正 |
| 配色 | filled disabled container | on-surface/**12** | `DisabledContainerOpacity = 0.1`（OnSurface @ 10%） | 見た目変更 | elevated / text も 0.1。tonal のみ v0_103 のため 0.12 のまま |
| 配色 | filled/elevated disabled label | on-surface/38 | `DisabledLabelTextColor = OnSurfaceVariant` @ 0.38 | 見た目変更 | OnSurface → **OnSurfaceVariant** に変更されている |
| 配色 | outlined ラベル | `text-primary` | `LabelTextColor = OnSurfaceVariant` | **視覚的に大** | Expressive の大きな改定点 |
| 配色 | outlined 枠線色 | `border-outline` | `OutlineColor = OutlineVariant`、disabled も `OutlineVariant`（現行 on-surface/12） | 見た目変更 | |
| 配色 | outlined 枠線幅 | 1px 固定 | `OutlinedOutlineWidth`: XS・S・M 1 / L 2 / XL 3 dp | 非（サイズ追加時） | |
| 配色 | text ラベル | `text-primary` | `LabelColor = OnSurfaceVariant`、disabled container = OnSurface @ 0.1 追加 | **視覚的に大** | |
| 配色 | toggle button | 未実装（`selected` prop なし） | 全 variant に Selected*/Unselected* トークン群（例: filled unselected container = **SurfaceContainer** + OnSurfaceVariant、elevated selected = Primary/OnPrimary） | 非（追加） | contract.ts への `selected` 追加が必要 |
| 状態 | state layer opacity | hover 0.08 / focus 0.10 / pressed 0.10 | `StateTokens`: 0.08 / 0.1 / 0.1 | — | **準拠 ✓** |
| 状態 | elevation 遷移 | filled/tonal rest0→hover1、elevated 1→2 | 各 variant トークンと一致 | — | **準拠 ✓** |

両エンジン一致確認: **一致。** tailwind 版（h-10 / px-6 / pl-4·pr-4 / text-label-large / rounded-full / 18px icon）と VE 版（40px / 24px / 16px / labelLarge / shape.full / 18px）は全値同値。DOM・`data-*` 契約（`data-pressed` / `data-disabled` / `data-with-start-icon` / `data-with-end-icon` / `data-slot="button-icon"`）は core factory 共通で同一。transition duration も 200ms（VE は `duration.short4` 参照）で同値。

補足: `FilledTonalButtonTokens.kt` だけ v0_103（旧世代）のまま。tonal の配色改定は Compose 上流でも未着手であり、現行実装（secondaryContainer / disabled 0.12）は tonal に限り「準拠」と言える。

---

## icon-button

**総合判定: 一部**（サイズ体系 XS–XL × narrow/default/wide は Compose 値と完全一致。shape 軸と toggle 配色の Expressive 改定が未対応）

参照した Compose トークンファイル: `XSmallIconButtonTokens.kt` / `SmallIconButtonTokens.kt` / `MediumIconButtonTokens.kt` / `LargeIconButtonTokens.kt` / `XLargeIconButtonTokens.kt`（※ 命名はサイズが接頭辞。`IconButtonSmallTokens` 等は 404）、`IconButtonTokens.kt`（中身は `StandardIconButtonTokens`）、`FilledIconButtonTokens.kt` / `FilledTonalIconButtonTokens.kt` / `OutlinedIconButtonTokens.kt`（14_1_0）、実装参照 `IconButton.kt` / `IconButtonDefaults.kt`

準拠している点（監査済み・OK）:
- 高さ 32/40/56/96/136、アイコン 20/24/24/32/40 — トークンと完全一致
- 幅 15 通り: Compose は幅を「IconSize + Leading + Trailing」で定義しており、全組合せで一致を検算済み（例: XS default = 20+6+6=32、L wide = 32+48+48=128、XL wide = 40+72+72=184）
- standard variant の配色（unselected=onSurfaceVariant / selected=primary / disabled=onSurface/38）
- outlined selected = inverseSurface/inverseOnSurface
- state layer opacity

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| シェイプ | round/square | `rounded-full` のみ | square: XS・S=medium(12px), M=large(16px), L・XL=extraLarge(28px)。`shape` prop なし | 非（追加） | |
| シェイプ | 押下時 morph | なし | `PressedContainerShape`: XS・S=small(8px), M=medium(12px), L・XL=large(16px) | 見た目変更 | |
| シェイプ | **選択時 morph** | なし（selected は色のみ） | round コンテナ選択時: XS・S=medium(12px), M=large(16px), L・XL=extraLarge(28px) / square コンテナ選択時=**full**（round↔square が反転する） | 見た目変更 | `SelectedContainerShapeRound/Square`。Expressive の目玉挙動 |
| シェイプ | outlined 枠線幅 | 1px 固定 | XS・S・M 1 / L 2 / XL 3 dp | 非（軽微） | L/XL で不足 |
| 配色 | filled toggle unselected container | `bg-surface-container-highest` | `UnselectedContainerColor = SurfaceContainer` | 見た目変更 | |
| 配色 | filled toggle unselected icon | `text-primary` | `UnselectedColor = OnSurfaceVariant` | 見た目変更 | |
| 配色 | tonal toggle unselected | `bg-surface-container-highest` + `text-on-surface-variant` | `SecondaryContainer` + `OnSecondaryContainer`（= 非 toggle と同色） | 見た目変更 | |
| 配色 | tonal toggle **selected** | secondaryContainer + onSecondaryContainer（variant 既定のまま） | `SelectedContainerColor = Secondary` + `OnSecondary` | **視覚的に大** | 選択が視認できない現状バグ相当 |
| 配色 | outlined 枠線 | `border-outline` / disabled on-surface/12 | `OutlineColor = OutlineVariant` / `DisabledOutlineColor = OutlineVariant` | 見た目変更 | |
| 配色 | filled/tonal disabled container | on-surface/**12** | `DisabledContainerOpacity = 0.1`（outlined selected disabled も 0.1） | 見た目変更 | |
| モーション | 遷移 | `ease-standard` 200ms | `MotionSchemeKeyTokens.DefaultEffects`（spring、bounce なし ≒ `springEffectsDefault`） | 非 | Button と同じ |
| タイポ | — | ラベルなしコンポーネント | 対象外 | — | |

両エンジン一致確認: **一致。** tailwind 版の `WIDTHS` テーブル・`h-8`〜`h-[136px]`・svg サイズと VE 版の px 値は全 15 組合せ＋5 高さで同値。variant/selected の compoundVariants も色まで同一。`data-selected` / `aria-pressed` / `data-pressed` / `data-disabled` は core の `create.tsx` 共通実装のため DOM 契約も同一。差異なし。

---

## button-group

**総合判定: 一部**（connected のシーム角・2dp ギャップなど静的な Expressive 値は反映済み。状態駆動の shape morph とスプリングモーションが未実装）

参照した Compose トークンファイル: `ButtonGroupSmallTokens.kt`（v0_11_0）、`ConnectedButtonGroupSmallTokens.kt`（14_1_0）、`MotionTokens.kt`、実装参照 `ButtonGroup.kt` / `MotionScheme.kt`。**Button group / Connected button group は Small のみトークンが存在**（他サイズは子ボタン側のサイズ体系に従う。`ButtonGroupTokens` / `ButtonGroup{XSmall,Medium,Large,XLarge}Tokens` 等は 404）

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
| --- | --- | --- | --- | --- | --- |
| サイズ | standard の間隔 | `gap-2` / `gap: 8px` | `ButtonGroupSmallTokens.BetweenSpace = 12dp` | 非破壊 | 視覚差のみ |
| サイズ | connected の間隔 | `gap-0.5` / `2px` | `ConnectedButtonGroupSmallTokens.BetweenSpace = 2dp` | — | **一致** |
| サイズ | 高さ体系 | 高さ指定なし（子 Button に依存、子は 40dp 固定のみ） | ContainerHeight = 40dp（Small のみ定義。XS–XL は子ボタンのサイズ体系で決まるが、ローカル Button に size prop 自体がない） | 追加的 | グループ単体では Small 準拠。サイズ展開は Button 側の課題 |
| シェイプ | connected シーム角（静止時） | `rounded-small` / `vars.sys.shape.small`（8px） | `InnerCornerCornerSize = CornerValueSmall`（8dp）、外側 CornerFull | — | **一致**（first/last/中間・単独子ガードの実装も正しい） |
| シェイプ | connected **押下時**のシーム角 morph | なし | `PressedInnerCornerCornerSize = CornerValueExtraSmall`（**4dp** へ縮小） | 非破壊 | `:active` / `data-pressed` フックで実装可能 |
| シェイプ | connected **選択時**の角 morph | なし | `SelectedInnerCornerCornerSizePercent = 50%`（選択された子は full 丸に） | 非破壊 | 子が toggle の場合。`ButtonGroup.kt` の `connectedButtonCheckedShape = ShapeTokens.CornerFull` |
| モーション | 押下時の近隣スクイーズ | なし | `ButtonGroupDefaults.ExpandedRatio = 0.15f`（押下子が幅 +15% 拡張、隣接子が圧縮）、`MotionSchemeKeyTokens.FastSpatial` スプリング | 非破壊 | Expressive の目玉挙動。CSS では `flex-grow` + `--md-sys-motion-easing-spring-spatial-fast`/`duration-spring-spatial-fast` で近似実装が必要 |
| モーション | 使用イージング | （トランジションなし） | FastSpatial spring | 非破壊 | tokens.ts に `springSpatialFast`（cubic-bezier(0.42,1.67,0.21,0.9) / 350ms）既存・未使用 |
| タイポ | — | 子ボタンに委譲 | 同（グループ固有トークンなし） | — | 該当なし |
| 配色/状態 | — | 子ボタンに委譲 | 同 | — | 非推奨ロール使用なし |

両エンジン一致確認: **一致。** standard 8px / connected 2px / シーム `small`、`:not(:first-child)` 等のガードロジックまで TW・VE で同値。DOM は共通ファクトリ（`role="group"`）で同一。

---

## split-button

**総合判定: 一部**（骨格・配色は概ね正。シーム角の正値化と hover/押下/開時の shape morph、サイズ体系が未対応）

参照した Compose トークンファイル: `SplitButtonXSmallTokens.kt` / `SplitButtonSmallTokens.kt` / `SplitButtonMediumTokens.kt` / `SplitButtonLargeTokens.kt` / `SplitButtonXLargeTokens.kt`（すべて 18_0_18）、実装参照 `SplitButton.kt`

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
| --- | --- | --- | --- | --- | --- |
| サイズ | サイズ体系 | **単一サイズ（h-10 = 40dp）のみ、size prop なし** | XS=32 / S=40 / M=56 / L=96 / XL=136dp の 5 段階 | 追加的（prop 追加） | 現行値は Small 相当で正 |
| サイズ | leading ボタンの水平パディング | `px-6`（24px 両側） | S: Leading 16dp / Trailing(シーム側) 12dp（XS: 12/10、M: 24/24、L: 48/48、XL: 64/64） | 非破壊 | **Small 基準では過大**（24/24 は Medium の値） |
| サイズ | trailing ボタンのパディング | `px-3`（12px） | S: 13dp / 13dp（M: 15、L: 29、XL: 43） | 非破壊 | 1px 差 |
| サイズ | trailing アイコン | chevron 18px 固定 | S: `TrailingIconSize = 22dp`（XS: 22、M: 26、L: 38、XL: 50） | 非破壊 | |
| サイズ | シーム間隔 | `gap-0.5` / 2px | `BetweenSpace = 2dp`（全サイズ共通） | — | **一致** |
| シェイプ | シーム角（静止時） | `shape.small`（**8px**） | S: `InnerCornerCornerSize = CornerValueExtraSmall`（**4dp**）（XS: 4、M: 4、L: 8、XL: 12） | 非破壊 | Small なら 4dp が正。外側は full で一致（`OuterCornerCornerSizePercent = 50%`） |
| シェイプ | hover/押下時のシーム morph | なし（角は静的） | S: `InnerHovered/PressedCornerCornerSize = CornerValueMedium`（**12dp** へ拡大）（XS: 8、L/XL: LargeIncreased 20dp） | 非破壊 | Expressive の要求。`:hover` / `data-pressed` で実装可 |
| シェイプ | メニュー開時の trailing morph | chevron 180° 回転のみ（`data-popup-open`） | `TrailingInnerSelectedCornerCornerSizePercent = 50%` → trailing が**完全な円形**へ morph（`TrailingCheckedShape = CircleShape`）+ アイコン回転 | 非破壊 | `data-popup-open` フックは既にあるので borderRadius 追加のみ |
| タイポ | ラベルロール | labelLarge | `Typography.labelLarge`（SplitButton.kt 既定。Emphasized 要求なし） | — | **一致** |
| モーション | 角 morph・chevron 回転 | `duration-200 ease-standard`（旧 cubic-bezier(0.2,0,0,1)） | shape morph はスプリング（SplitButton.kt は `MotionSchemeKeyTokens.DefaultEffects`、空間系は Spatial） | 非破壊 | `springSpatialDefault` / `springEffectsDefault` へ置換すべき |
| 配色/状態 | バリアント | filled / tonal / outlined / elevated / **text** | Compose は Filled / Tonal / Outlined / Elevated の 4 種（**text は仕様外**） | 削除なら破壊的 | 色ロール自体（primary / secondaryContainer / onSurface12・38 等）は正しく非推奨ロールなし |

両エンジン一致確認: ほぼ一致（DOM・`data-*` は共通ファクトリで同一）。**1 点差異あり**: popup の閉アニメーションで、TW 版は `data-[ending-style]:opacity-0` のみ（scale なし）、VE 版は `[data-ending-style]` に `opacity: 0` + `transform: scale(0.95)` の両方を適用。閉じる際の縮小挙動が異なる（drop-in 契約違反として要修正）。

---

## segmented-button

**総合判定: 一部**（静的トークンはベースライン M3 に準拠。モーション軸のみ spring 未適用 → #122。Compose に Expressive 版セグメンテッドボタントークンは**存在しない** — `OutlinedSegmentedButtonTokens.kt` は 2023 年 v0_162 のまま。Expressive デザインではこの役割は **connected button group** に置き換わる方向）

参照した Compose トークンファイル: `OutlinedSegmentedButtonTokens.kt`（v0_162）

| 軸 | 項目 | 現行値 | 値 (Compose `OutlinedSegmentedButtonTokens`) | 破壊的か | 備考 |
| --- | --- | --- | --- | --- | --- |
| サイズ | 高さ | h-10 / 40px | ContainerHeight = 40dp | — | 一致 |
| サイズ | アイコン | 18px | IconSize = 18dp | — | 一致 |
| シェイプ | 外形 | `rounded-full` / `shape.full` | Shape = CornerFull | — | 一致。shape morph の要求なし |
| シェイプ | アウトライン | 1px `outline` | OutlineWidth = 1dp / OutlineColor = Outline | — | 一致 |
| タイポ | ラベル | labelLarge | LabelTextFont = LabelLarge（Emphasized ではない） | — | 一致 |
| モーション | 選択遷移・チェックマーク | 150ms `ease-standard`（TW `segmented-button.ts:21,36` / VE `segmented-button.css.ts:40,90`） | Compose 実装は motionScheme スプリングで駆動（トークンファイル上の要求はなし） | 非破壊 | 色遷移は `spring-effects-fast`、チェックマーク幅（空間変化）は `spring-spatial-fast` へ置換（→ #122） |
| 配色/状態 | 選択色 | `secondary-container` / `on-secondary-container` | SelectedContainerColor = SecondaryContainer 等 | — | 一致。disabled ラベル onSurface/38・仕切り onSurface/12 も一致 |
| 配色/状態 | disabled 時の外周アウトライン | root の `border-outline` は disabled 変化なし（item の仕切りのみ減光） | DisabledOutlineColor = OnSurface/12 | 非破壊 | グループ全体 disabled 時のみの微細な乖離 |

両エンジン一致確認: **一致。** root 40px/full/outline、item の first/last 角・仕切り線・`data-pressed` 駆動のチェックマーク表示（w 0→18px）とアイコン非表示、min-width 48px まで TW・VE 同値。

---

## slider

**総合判定: 未対応**（M3 2021 レガシー版のまま。Expressive の新形状体系に全面的に未追随）

参照した Compose トークンファイル: `SliderTokens.kt`（v2_3_5）、実装参照 `Slider.kt`

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| サイズ | トラック高さ | 4px（TW `h-1` / VE `height: 4px`） | **16dp**（`InactiveTrackHeight` / `ActiveTrackHeight` = 16.0dp） | **破壊的**（見た目が大きく変わる） | XS–XL のサイズ体系は Web 仕様（XS16/S24/M40/L56/XL96dp）にあるが、Compose トークンは単一サイズ 16dp のみ収載。まず 16dp 化が最小要件 |
| サイズ | コントロール高さ | 40px（`h-10`） | 44dp 以上（`HandleHeight` 44dp がタッチ領域を規定） | 非破壊 | ハンドル 44dp を収める必要あり |
| シェイプ | ハンドル | 20dp **円形** thumb + 40dp 円形ステートレイヤー（`::before`、hover/focus/dragged 不透明度） | **4×44dp の縦長バーハンドル**（`HandleWidth` 4dp / `HandleHeight` 44dp、`HandleShape` CornerFull）。ステートレイヤーは廃止され、**pressed/focus で幅 2dp に縮む**（`PressedHandleWidth` / `FocusHandleWidth` = 2dp、hover は 4dp のまま） | **破壊的**（DOM 上は同じ thumb 要素だが視覚・状態表現が全交換） | `--md-sys-state-dragged` ベースの `::before` オーバーレイは Expressive slider では不要になる |
| シェイプ | トラックコーナー | 両端 `rounded-full` のみ | 外側 CornerFull（`ActiveTrackShape`/`InactiveTrackShape`）+ **ハンドル側の内側コーナー 2dp**（`Slider.kt`: `TrackInsideCornerSize = 2.dp`） | 破壊的 | ギャップ導入とセット |
| 配色/状態 | トラックギャップ | **なし**（indicator と track が連続） | **ハンドル両側に 6dp のギャップ**（`ActiveHandleLeadingSpace`/`ActiveHandleTrailingSpace` = 6.0dp、`Slider.kt`: `ThumbTrackGapSize = ActiveHandleLeadingSpace`） | **破壊的** | progress で実装済みの `--m3-progress` + ギャップ方式を流用可能 |
| 配色 | inactive トラック色 | `surface-container-highest` | **`SecondaryContainer`**（`InactiveTrackColor`） | 非破壊（色のみ） | focus/pressed 時も SecondaryContainer |
| 配色/状態 | stop indicator（tick） | inactive 側: `on-surface-variant` / active 側: `on-primary/0.38`、4px 円 | サイズ 4dp（`StopIndicatorSize`、一致）・CornerFull（一致）。色は **inactive トラック上: Primary（ActiveTrackColor）/ active トラック上: SecondaryContainer（InactiveTrackColor）**（`Slider.kt` で相互反転）。`StopIndicatorTrailingSpace` = 6dp、disabled は `OnSurface` | 非破壊（色差し替え） | 現行色は 2021 版 tick 仕様 |
| タイポ/配色 | value indicator（ラベル） | `bg-primary` / `text-on-primary`、corner 4px（extraSmall / TW `rounded`）、bottom margin 8px、labelLarge | container **`InverseSurface`** / text **`InverseOnSurface`**（`ValueIndicatorContainerColor` / `ValueIndicatorLabelTextColor`）、font labelLarge（一致）、`ValueIndicatorActiveBottomSpace` = **12dp** | 非破壊 | 旧 `LabelContainerColor = Primary` トークンも残存するが Expressive の実描画は InverseSurface 系 |
| モーション | ハンドル状態遷移 | opacity 100ms（TW はデフォルト ease、VE は `easing.standard`） | ハンドル幅変化（4→2dp）等は MotionScheme スプリング（fast-spatial 相当） | 非破壊 | tokens.ts の `springSpatialFast` 等が既存だが **未使用** |
| 状態 | disabled | inactive track `on-surface/0.12`・active track / handle `on-surface/0.38` | 同値（`DisabledInactiveTrackOpacity` 0.12 / `DisabledActiveTrackOpacity`・`DisabledHandleOpacity` 0.38、`DisabledHandleWidth` 4dp） | — | **準拠済み**（ただしバーハンドル前提の幅 4dp） |

両エンジン一致確認: DOM・`data-*`（`data-dragging` / `data-disabled` / `data-tick` / `data-active` / `data-visible`）・寸法は一致。唯一の微差: thumb ステートレイヤーの transition イージング（TW: 指定なし＝Tailwind デフォルト、VE: `vars.sys.motion.easing.standard`）。実害は軽微だが厳密には不一致。

---

## progress

**総合判定: 一部**（PR #101/#90 で寸法・ギャップ・stop・wavy は概ね照合済み。残 gap はトラック色・indeterminate モーション・circular wavy 詳細）

参照した Compose トークンファイル: `ProgressIndicatorTokens.kt`（v0_4_0）、`LinearProgressIndicatorTokens.kt`（v0_7_0）、`CircularProgressIndicatorTokens.kt`（v0_7_0）

準拠済みの確認項目（Compose 値と一致）:
- Linear: 太さ 4dp デフォルト（`ActiveThickness`/`TrackThickness` = 4dp、`thickness` prop で 8dp 厚型可）/ ギャップ `TrackActiveSpace` 4dp / stop dot `StopSize` 4dp・`StopTrailingSpace` 0dp（`after:end-0`）/ wavy: amplitude 3dp（`ActiveWaveAmplitude`）・波長 40px（`ActiveWaveWavelength`）・波高 10dp（`WaveHeight` = 4+2×3）
- Circular: 直径 40dp（`Size`）・stroke 4dp（`ActiveThickness`）・ギャップ 4dp（`TrackActiveSpace`）・両端 round cap
- stop 色 Primary（`ProgressIndicatorTokens.StopColor`）、active 色 Primary（`ActiveIndicatorColor`）

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| 配色 | トラック色（linear + circular） | `surface-container-highest` | **`SecondaryContainer`**（`ProgressIndicatorTokens.TrackColor`） | 非破壊（色のみ） | slider と共通の変更。両エンジン 4 箇所（linear track / circular track） |
| モーション | linear indeterminate | M2 風 disjoint 2 バー（`m3-linear-primary`/`-secondary` 2s linear） | Expressive は**波形の indeterminate**（`IndeterminateActiveWaveWavelength` = 20dp トークンが存在。振幅アニメーション + 波長 20dp） | 破壊的（視覚アイデンティティが変わる） | 現行は `wavy` を determinate 限定にしている（`wave = wavy && clampedValue != null`） |
| モーション | circular indeterminate | rotate 1.4s + dash grow/shrink（M2 風 advance） | Expressive の indeterminate も wavy 対応（`CircularProgressIndicatorTokens.ActiveWaveWavelength` 15dp / amplitude 1.6dp） | 破壊的 | 同上 |
| シェイプ | circular wavy の振幅・波長 | amplitude デフォルト **2px**、波数 `round(2πr/12)`（波長 ~12px 相当） | amplitude **1.6dp**、波長 **15dp**（`ActiveWaveAmplitude` 1.6 / `ActiveWaveWavelength` 15） | 非破壊（微調整） | |
| サイズ | circular wavy の外形 | 40dp のまま波を内側に押し込む（`waveRadius = radius - amp`） | **`WaveSize` = 48dp**（wavy 時は外形が 48dp に拡大、リング 40dp 維持） | 非破壊〜軽微 | レイアウト上は 8px 差 |
| モーション | 遷移イージング | `easing.standard` 200ms（linear width）/ 300ms（circular dash） | MotionScheme スプリング（effects/spatial） | 非破壊 | `springEffectsDefault` 等の既存トークン未使用 |

両エンジン一致確認: DOM・`data-indeterminate`/`data-wavy`・keyframe 周期（2s / 1s / 1.4s）・reduced-motion フォールバックまで完全一致。差異なし。

---

## loading-indicator

**総合判定: 一部**（寸法・uncontained 配色は準拠。核心の「7 シェイプのポリゴンモーフ」と contained 配色が未対応）

参照した Compose トークンファイル: `LoadingIndicatorTokens.kt`（v0_7_0）、実装参照 `LoadingIndicator.kt`

準拠済み:
- アクティブ形状 38dp（`ActiveSize` 38dp、SVG `size-[38px]`）・コンテナ 48dp（`ContainerWidth`/`ContainerHeight` 48dp、`size-12`）・コンテナ形状 CornerFull ✓
- uncontained のインジケータ色 Primary（`ActiveIndicatorColor`）✓
- `role="progressbar"`、indeterminate 専用 ✓

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| モーション/シェイプ | 形状アニメーション | **固定の 7 花弁パス 1 枚**を rotate(360°)+scale(0.85) 1.2s ease-in-out で回すだけ（モーフなし） | **7 つの MaterialShapes を順にモーフ**: SoftBurst → Cookie9Sided → Pentagon → Pill → Sunny → Cookie4Sided → Oval（`LoadingIndicator.kt`）。モーフは spring(dampingRatio 0.6, stiffness 200) を **650ms 間隔**（`MorphIntervalMillis`）で発火し、モーフ毎に +90° 回転。加えて全体が **4666ms/周 linear**（`GlobalRotationDurationMillis`）で連続回転 | 破壊的（視覚アイデンティティの核心） | CSS 実装なら `d` 属性の path モーフ（`@keyframes` + `d: path(...)`）や Web Animations で近似可能。現行の `m3-loading` keyframe（scale パルス）は仕様に存在しないモーション |
| 配色 | contained 変種 | container: `secondary-container`、indicator: `primary`（uncontained と同色） | container: **`PrimaryContainer`**（`ContainedContainerColor`）、indicator: **`OnPrimaryContainer`**（`ContainedActiveColor`） | 非破壊（色のみ） | 両エンジンとも誤り（TW `bg-secondary-container` / VE `secondaryContainer`） |
| サイズ | contained 時のシェイプスケール | 38dp 固定 | `ActiveIndicatorScale` = IndicatorSize/48（回転時のはみ出しを考慮した縮小係数を掛ける） | 軽微 | 現行は回転中も外形が変わらない単一パスなので実害小。モーフ導入時に要考慮 |
| 機能 | determinate モード | なし（props は `contained` のみ） | Compose には determinate `LoadingIndicator` があり Circle（20°回転）↔ SoftBurst を progress 連動でモーフ | 追加機能 | M3 最小要件に含めるかは要判断（pull-to-refresh 用途） |

両エンジン一致確認: DOM・`data-contained`・38/48dp 寸法・アニメーション周期（1.2s ease-in-out）とも一致。差異なし。

---

## navigation-rail

**総合判定: 一部**（旧 M3 の 80dp レール仕様がベース。単体アイテムのインジケータ寸法・シェイプ・配色の大半は一致するが、Expressive の中核である collapsed 96dp / expanded 220–360dp の 2 モード構造・spring モーション・active ラベル色が未対応）

参照した Compose トークンファイル: `NavigationRailCollapsedTokens.kt` / `NavigationRailExpandedTokens.kt` / `NavigationRailBaselineItemTokens.kt` / `NavigationRailVerticalItemTokens.kt` / `NavigationRailHorizontalItemTokens.kt` / `NavigationRailColorTokens.kt` / `MotionTokens.kt`、実装参照 `WideNavigationRail.kt` / `NavigationItem.kt`

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| サイズ | コンテナ幅（collapsed） | 80px 固定（TW `w-20` / VE `width:'80px'`） | **96dp**（`NavigationRailCollapsedTokens.ContainerWidth`。80dp は `NarrowContainerWidth` として残存） | ビジュアル回帰 | 現行は旧仕様 80dp レール相当 |
| サイズ | expanded モード | **なし**（contract/create に `expanded` の概念なし） | min **220dp** / max **360dp**（`NavigationRailExpandedTokens.ContainerWidthMinimum/Maximum`）+ modal 変種（elevation Level2 / shape CornerLarge=16dp / surfaceContainer） | 追加は非破壊（props 追加） | Compose は `WideNavigationRail(state)` で collapse⇄expand をアニメーション |
| サイズ | 上部スペース | `py-5`（20px） | **TopSpace 44dp**（collapsed / expanded 共通） | ビジュアル回帰 | |
| サイズ | アイテム間隔 | `gap-3`（12px） | **ItemVerticalSpace 4dp**（collapsed 時） + アイテム自体 `ContainerHeight 64dp` | ビジュアル回帰 | 現行はアイテムがコンテンツ寸法（`py-1`）で 64dp に満たない |
| サイズ | 水平アイテム（expanded 用） | なし | icon 左置き・indicator 高さ **56dp**・LeadingSpace 16dp・IconLabelSpace 8dp（`NavigationRailHorizontalItemTokens`） | 追加は非破壊 | expanded モードとセット |
| シェイプ | active indicator（vertical） | 56×32px + `rounded-full` | **56×32dp + CornerFull** ✔ 一致 | — | `NavigationRailVerticalItemTokens.ActiveIndicatorWidth/Height` |
| シェイプ | コンテナ | 角丸なし ✔ | `ContainerShape = CornerNone` ✔（modal のみ CornerLarge） | — | |
| タイポ | ラベル（vertical） | `labelMedium` + active 時 `font-bold`(700) 直書き | `LabelTextFont = LabelMedium`。Expressive の強調は **`labelMediumEmphasized`**（weight 700）トークンで表すべき | 非破壊（700 で同値） | tokens.ts に `labelMediumEmphasized` 既存。`font-bold` 直書きをトークン参照に置換可能 |
| タイポ | ラベル（horizontal/expanded） | なし | `LabelTextFont = LabelLarge`（`NavigationRailHorizontalItemTokens`） | 追加は非破壊 | |
| モーション | indicator 遷移 | `transition-colors 150ms ease-standard`（色のみ） | indicator は **幅 0→100% を DefaultSpatial spring** でアニメーション（`NavigationItem.kt`）、色は **DefaultEffects** | 非破壊 | repo 対応トークン: `--md-sys-motion-easing-spring-spatial-default`(500ms) / `spring-effects-default`(200ms) — 既存 |
| モーション | expand/collapse | なし | 幅: **DefaultSpatial**、modal: **FastSpatial**、フェード: **DefaultEffects**（`WideNavigationRail.kt`） | 追加は非破壊 | |
| 配色 | active ラベル色 | `on-surface`（TW `group-data-[pressed]:text-on-surface`） | **`secondary`**（`NavigationRailColorTokens.ItemActiveLabelText = Secondary`） | ビジュアル回帰 | Expressive での変更点。active アイコン `onSecondaryContainer` ✔・indicator `secondaryContainer` ✔・inactive `onSurfaceVariant` ✔ は一致 |
| 配色 | state layer 色 | `currentColor`（indicator 要素の継承色 ≒ ルート文字色） | active/inactive とも **`onSecondaryContainer`**（`ItemActive/InactiveHovered\|Focused\|PressedStateLayer`） | 軽微 | inactive 時も onSecondaryContainer が正。現行の currentColor は意図した色に解決されない可能性 |
| 配色/構造 | header（メニュー/FAB）スロット | `header` prop あり ✔（menu button / FAB を想定） | `HeaderSpaceMinimum 40dp`（baseline item tokens） | — | スロット自体は存在。40dp 最小スペースは未強制 |

両エンジン一致確認: **一致。** DOM は共通ファクトリ `packages/core/src/components/navigation-rail/create.tsx`（ToggleGroup/Toggle、`data-pressed`/`data-disabled` 契約）で単一実装。寸法も TW `w-20/gap-3/py-5/w-14 h-8` = VE `80px/12px/20px/56×32px`、active/disabled 色・0.38 減光も両者同値。軽微なコード差: TW 版 rail は `../../tv` から `tv` を import、bar は `tailwind-variants` 直 import。DOM への影響なし。

---

## navigation-bar

**総合判定: 一部**（配色・indicator 形状はほぼ一致だが、コンテナ高さが旧 80dp のまま、active ラベル色・indicator 幅・spring モーション・horizontal アイテム配置が未対応）

参照した Compose トークンファイル: `NavigationBarTokens.kt` / `NavigationBarVerticalItemTokens.kt` / `NavigationBarHorizontalItemTokens.kt` / `MotionTokens.kt`、実装参照 `ShortNavigationBar.kt` / `NavigationBar.kt` / `NavigationItem.kt`（`NavigationBarColorTokens.kt` / `NavigationBarBaselineItemTokens.kt` は 404。色は `NavigationBarTokens.kt` に統合）

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| サイズ | コンテナ高さ | 80px（TW `h-20` / VE `80px`） | **64dp**（`NavigationBarTokens.ContainerHeight`。80dp は `TallContainerHeight` として TODO 扱い） | ビジュアル回帰 | Expressive の「short navigation bar」は 64dp が既定 |
| サイズ | indicator 幅（vertical item） | **64×32px**（iconWrap: TW `w-16 h-8` / VE `64px/32px`） | **56×32dp**（`NavigationBarVerticalItemTokens.ActiveIndicatorWidth/Height`） | ビジュアル回帰 | rail は 56px で正しいのに bar だけ 64px。IconSize 24dp ✔ |
| サイズ | horizontal item 配置 | なし（vertical のみ） | iconPosition Start: indicator 高さ **40dp**、Leading/TrailingSpace 16dp（`NavigationBarHorizontalItemTokens`）。medium 画面では **Centered arrangement** 推奨 | 追加は非破壊 | `ShortNavigationBarArrangement.EqualWeight / Centered` |
| サイズ | indicator–label 間隔 | `gap-1`（4px） ✔ | `ItemActiveIndicatorIconLabelSpace = 4dp` ✔ | — | ただし現行は item padding `pt-3 pb-4`（12/16px）が 64dp 化の際に要調整（Compose: `ContainerBetweenSpace 6dp`） |
| シェイプ | active indicator | `rounded-full` ✔ | `ItemActiveIndicatorShape = CornerFull` ✔ | — | |
| シェイプ | コンテナ | 角丸なし ✔ | `NavShape = CornerNone` ✔ | — | |
| タイポ | ラベル | `labelMedium` + active 時 `font-bold` 直書き | `LabelTextFont = LabelMedium`、強調は **`labelMediumEmphasized`** トークンで | 非破壊（同 700） | tokens.ts の `labelMediumEmphasized`（700/12px/16px/0.5px）に置換を推奨 |
| モーション | indicator 出現 | `transition-colors 150ms ease-standard`（色のみ） | indicator サイズ: **FastSpatial**（`NavigationBar.kt`）/ `NavigationItem` は DefaultSpatial、色: **DefaultEffects** | 非破壊 | repo 対応: `spring-spatial-fast`(350ms, cubic-bezier(0.42,1.67,0.21,0.9)) / `spring-effects-default`(200ms) — 既存 |
| 配色 | コンテナ | `surface-container` ✔ | `ContainerColor = SurfaceContainer` ✔（Elevation Level2） | — | box-shadow(Level2) は未適用だが web では慣例的に省略可 |
| 配色 | active ラベル色 | `on-surface` | **`secondary`**（`ItemActiveLabelTextColor = Secondary`） | ビジュアル回帰 | active アイコン `onSecondaryContainer` ✔ / indicator `secondaryContainer` ✔ / inactive `onSurfaceVariant` ✔ |
| 配色 | state layer | `currentColor` 継承 | rail と同様 onSecondaryContainer 系が正（bar のトークンファイルには state layer 明記なし、rail 準拠） | 軽微 | |

両エンジン一致確認: **一致。** 共通ファクトリ `packages/core/src/components/navigation-bar/create.tsx` により DOM・`data-pressed`/`data-disabled` 契約は同一。TW `h-20/w-16 h-8/gap-1/pt-3 pb-4` = VE `80px/64×32px/4px/12px・16px`、色・disabled 0.38・state layer も同値で差異なし。

---

## toolbar

**総合判定: 一部**（floating toolbar の静的コンテナ仕様はほぼ完全準拠。docked バリアントとモーション挙動が未対応）

参照した Compose トークンファイル: `FloatingToolbarTokens.kt`（12_0_0）、`DockedToolbarTokens.kt`（14_0_0）、`MotionTokens.kt`、実装参照 `FloatingToolbar.kt`（`ToolbarTokens.kt` は 404）

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| サイズ | floating コンテナ高さ/幅 | h-16 / w-16 (64px) | `FloatingToolbarTokens.ContainerHeight = 64dp` | — | **一致** |
| サイズ | floating 内側パディング | px-2 / py-2 (8px) | `ContainerLeadingSpace = 8dp` / `ContainerTrailingSpace = 8dp` | — | **一致** |
| サイズ | アクション間隔 | gap-1 (4px) | `ContainerBetweenSpace = 4dp` | — | **一致** |
| サイズ | 画面端オフセット | 未提供（利用側任せ） | `ContainerExternalPadding = 16dp`（`ScreenOffset`） | いいえ | 配置は利用側責務なので許容。ドキュメント推奨値として案内可 |
| サイズ | **docked toolbar バリアント** | **存在しない**（variant は standard/vibrant のみ） | `DockedToolbarTokens`: 高さ 64dp、shape None、surface-container、leading/trailing 16dp、spacing min 4dp / max 32dp | いいえ（追加） | Expressive の Toolbar は floating と docked の 2 形態。現行は floating pill のみ。`type: 'floating' \| 'docked'` 等の追加が必要 |
| シェイプ | floating コーナー | rounded-full / `vars.sys.shape.full` | `ContainerShape = CornerFull` | — | **一致** |
| タイポ | テキストロール | なし（アイコン中心、消費者供給） | トークン上の要求なし（FloatingToolbarTokens にタイポトークンなし） | — | Emphasized companion の要求なし。問題なし |
| モーション | expand/collapse(show/hide)遷移 | **なし**（静的コンテナ） | `FloatingToolbarDefaults.animationSpec() = MotionSchemeKeyTokens.FastSpatial`（= `spring-spatial-fast`）、scroll 連動 snap は `DefaultEffects` | いいえ（追加） | ローカルトークンに `springSpatialFast (350ms / cubic-bezier(0.42,1.67,0.21,0.9))` が既にあり、`data-expanded` 等のフック追加で対応可能 |
| 配色 | standard コンテナ | bg-surface-container | `StandardContainerColor = SurfaceContainer` | — | **一致** |
| 配色 | standard コンテンツ | text-on-surface-variant | `contentColorFor(SurfaceContainer)` = **OnSurface** | 軽微 | Compose は OnSurface。ただし内包 IconButton の standard 既定が on-surface-variant のため実質差は小さい。厳密には on-surface へ |
| 配色 | vibrant コンテナ/コンテンツ | bg-primary-container + on-primary-container（子 button/a へ強制） | `VibrantContainerColor = PrimaryContainer`、Unselected Icon/Text = OnPrimaryContainer | — | **一致** |
| 配色 | vibrant 内の selected アクション | 未対応 | `VibrantButtonSelectedContainerColor = SurfaceContainer` / SelectedIcon・Text = OnSurface | いいえ（追加） | vibrant 上でトグル選択されたアイコンボタンは surface-container/on-surface に反転する仕様。現状は子コンポーネント任せ |
| 配色/状態 | エレベーション | shadow-level3 / `elevation.level3` | `ContainerExpandedElevation = Level0`（FAB 同伴時のみ expanded Level1）※ Compose 側に「TODO read from token」注記 | 軽微（視覚変化） | Compose 既定はシャドウなし（Level0）。level3 は過剰の可能性。Compose 側もトークン未確定（b/520069108）のため要判断 |
| 付随 | FAB 同伴レイアウト | 未対応 | toolbar–FAB 間 gap 8dp、FAB サイズ範囲 Baseline〜Medium、vibrant FAB = tertiary-container | いいえ（追加） | `HorizontalFloatingToolbar(floatingActionButton=...)` 相当。スコープ外とする判断も可 |

両エンジン一致確認: **一致。** DOM は `role="toolbar"` + `data-variant` + `data-orientation`（+ vertical 時 `aria-orientation`）で共通（core の `createToolbar` が生成）。数値も 64px / 8px / 4px / full / level3 / svg 24px まで両者同一。唯一の実装差: vibrant の子要素色強制で、Tailwind 版は全 button/a に適用し disabled 側の高特異度ルールで上書きさせるのに対し、VE 版は `:not(:disabled):not([data-disabled])` で明示除外。計算結果は同じ想定だが、メカニズムが異なるため消費者のカスタム disabled 実装では差が出うる（軽微）。

---

## carousel

**総合判定: 一部**（4 レイアウトの骨格・A11y・キーボード操作は対応済み。アイテム shape が誤り、multi-browse/hero の「large+medium+small」動的サイズ体系とマスク遷移が未対応）

参照した一次ソース: Compose にトークンファイルは存在せず（`CarouselTokens.kt` は 404）、実装 `carousel/Carousel.kt` / `Keylines.kt` / `Strategy.kt` / `Arrangement.kt` / `KeylineSnapPosition.kt` / `CarouselState.kt` / `CarouselItemScope.kt`、`samples/CarouselSamples.kt` を一次ソースとした。

| 軸 | 項目 | 現行値 | Expressive 値 (Compose) | 破壊的か | 備考 |
|---|---|---|---|---|---|
| シェイプ | **アイテム コーナー** | `rounded-large` / `vars.sys.shape.large` = **16px** | `MaterialTheme.shapes.extraLarge` = **28dp**（全公式サンプルが `maskClip(shapes.extraLarge)`） | **はい（視覚）** | 最重要 gap。`extraLarge`（28px、tokens.ts に既存）へ変更すべき |
| サイズ | multi-browse アイテム構成 | 全アイテム一律 160×224px | 動的 keyline: large + medium + small。small は **40dp〜56dp** にクランプ（`CarouselDefaults.MinSmallItemSize = 40.dp` / `MaxSmallItemSize = 56.dp`）、`targetSmallSize = largeSize/3`、`mediumSize = (large+small)/2`。サンプル `preferredItemWidth = 186dp` | いいえ（視覚は変わるが DOM 互換） | CSS scroll-snap 実装では完全な keyline 追随は不可能だが、`flex-basis` 差配や `:last-child` 縮小等で large/small の静的近似は可能。現状は「uncontained と同型の一律グリッド」で multi-browse の見た目要件を満たさない |
| サイズ | hero レイアウト | 一律 288×224px、`snap-center` | `HorizontalCenteredHeroCarousel`: 中央 large + 両脇 small（40–56dp）ピーク。keyline は small/2 → medium/2 → large → medium/2 → small/2 の対称配置 | いいえ | 中央スナップは一致。小アイテムのピークが未表現 |
| サイズ | uncontained | 一律 224×224px、端を越えてフロー | `HorizontalUncontainedCarousel`: 一律 `itemWidth`（消費者指定）+ 右端 anchor 10dp | いいえ | 構造は準拠。固定 224px は既定値としては妥当（Compose は消費者指定必須） |
| サイズ | full-screen | 縦積み 100%×100%、`snap-y` + `snap-center`、gap 0 | Compose 未実装（material.io 仕様: 1 アイテム全画面・縦スクロール） | — | Compose に対応物なし。material.io 仕様準拠の実装で問題なし |
| サイズ | アイテム間隔 | gap-2 (8px) | サンプル既定 `itemSpacing = 8.dp` | — | **一致** |
| シェイプ | **マスク遷移（スクロール中の動的クリップ）** | なし（静的 border-radius） | keyline 間を `lerp` してアイテム毎に maskRect を連続更新（`CarouselItemDrawInfo` + `clipShape`）、切り出しに伴うパララックス | いいえ（追加・段階的強化） | CSS のみでは再現困難。scroll-driven animations での近似は将来課題として明記推奨 |
| タイポ | テキストロール | なし（コンテンツは消費者供給） | 要求なし | — | Emphasized companion 該当なし |
| モーション | スナップアニメーション | CSS `scroll-behavior: smooth`（UA 既定イージング）、reduced-motion で auto | `snapAnimationSpec = spring(stiffness = Spring.StiffnessMediumLow)`（≒ `spring-spatial-default`）。singleAdvance / multiBrowse / noSnap の 3 種 fling | いいえ | CSS scroll-snap はイージング指定不可のためトークン適用は構造的に不可能。JS スクロールドライバ導入時に `springSpatialDefault (500ms)` を使うこと、と注記するに留めるのが現実的 |
| 配色/状態 | フォーカスリング | 3px secondary、offset 2px（focus-visible、両エンジン一致） | Compose は web 的フォーカスリング概念なし（M3 focus indicator 仕様: 3dp secondary / offset 2dp） | — | **M3 web 仕様に準拠** |
| 配色/状態 | インジケータ | なし | Compose Carousel にインジケータなし（M3 carousel 仕様にもページインジケータは含まれない） | — | gap ではない |
| A11y | ロール/キーボード | `role="group"` + `aria-roledescription="carousel"` + `tabIndex=0` + 軸方向矢印キー（PR #107） | （Compose は talkback 側で処理） | — | WAI-ARIA carousel パターン準拠。対応済み |

両エンジン一致確認: **一致。** DOM/`data-*` は core の `createCarousel` が単一生成（role=group / aria-roledescription / tabIndex / data-variant）。スタイル値も全変種で同値: multi-browse 160×224、uncontained 224×224、hero 288×224 + center、full-screen 100%×100% + center、root gap 8px→full-screen 0、snap-x/y mandatory、scrollbar 非表示、focus ring 3px secondary offset 2px、reduced-motion 対応、item radius = large（両方とも同じく 16px で「揃って仕様から外れている」状態）。差異なし。

---

## トークンに関する備考

必須追加はゼロ。任意で検討できる項目のみ:

- `shape.extraExtraLarge`（48px、Compose `CornerExtraExtraLarge`）— 今回の 12 コンポーネントには不要だが Expressive シェイプスケールの完全化用
- disabled container opacity **0.1**（Expressive で 0.12→0.1 に変更されたコンポーネントトークン値）— sys トークンではないため tokens.ts 追加は必須ではないが、`state.disabledContainer: 0.10` として整理する余地あり
- button-group の `ExpandedRatio = 0.15` — Compose 側も `ButtonGroupDefaults` の定数のため、実装するなら component 定数（または `--md-comp-button-group-expanded-ratio` 的な CSS 変数）として持つのが妥当
- slider / loading-indicator のコンポーネント定数（track 16dp / handle 4×44dp / gap 6dp / モーフ周期 650ms・4666ms 等）は、progress の 4dp gap 等と同じく CSS リテラルで持つ現行の流儀に従いトークン化不要

## Phase 2 対応 issue の候補（破壊的・影響の大きい順）

1. **slider** — Expressive 全面改修（トラック 16dp・4×44dp バーハンドル・6dp ギャップ・内側コーナー 2dp・stop dots 色反転・value indicator InverseSurface 化・SecondaryContainer 化）。一括で行う必要あり
2. **button** — サイズ XS–XL・shape/round-square prop・押下 morph・toggle（selected）・outlined/text の onSurfaceVariant 化・disabled 0.1 化。contract.ts 変更を伴う最大タスク
3. **icon-button** — shape prop・押下/選択 morph（round↔square 反転）・toggle 配色改定（tonal selected = Secondary/OnSecondary は実質バグ修正）・outlined 枠線 OutlineVariant 化
4. **navigation-bar / navigation-rail** — active ラベル `secondary` 化・bar 64dp 化・bar indicator 56px 化・`labelMediumEmphasized` 置換・spring 適用（bar/rail 同一 PR でも可）。rail の expanded モードは別 issue に分割推奨
5. **loading-indicator** — 7 シェイプポリゴンモーフ（650ms 間隔 + 4666ms 全体回転）・contained 配色修正（後者は即対応可能な小変更として先行分離可）
6. **carousel** — アイテム radius extraLarge(28px) 化（小）・multi-browse/hero の large+small 静的近似（中）
7. **progress** — トラック SecondaryContainer 化（小）・indeterminate の wavy 化（中）・circular wavy 微調整
8. **split-button** — シーム角 4dp 化 + hover/押下 12dp morph + 開時 trailing 円形化 + spring 適用 + TW/VE の popup 閉アニメーション差異修正
9. **button-group** — connected 押下シーム morph（→4dp）・選択 50% full・standard gap 12px 化・近隣スクイーズ（ExpandedRatio 0.15 + FastSpatial）
10. **toolbar** — docked バリアント追加・vibrant selected 反転色・standard コンテンツ on-surface 化・elevation level0 化の要否判断
11. **navigation-rail（expanded）** — collapsed 96dp / expanded 220–360dp / horizontal item / modal 変種（中規模、4 から分割）
12. **segmented-button** — 選択遷移・チェックマークの spring 化のみ（小タスク。静的トークンはベースライン準拠のため構造変更は不要）

## 横断的な所見

- **spring モーショントークンは 12 コンポーネント全てで未使用。** tokens.ts に `spring-spatial-*` / `spring-effects-*` が揃っているにもかかわらず、全コンポーネントが旧 `easing.standard` + 固定 duration のまま。shape morph・indicator 遷移など「空間的な変化」は spatial、色・不透明度など「効果的な変化」は effects という使い分けが Compose 実装から読み取れる（ボタン系の shape morph は例外的に **DefaultEffects**）。
- **Emphasized タイポの要求は限定的。** Compose トークン上で Emphasized companion を要求するのはナビゲーション系ラベルの active 強調（現行 `font-bold` 直書きの置換先）程度で、ボタン系ラベルは非 Emphasized のまま。issue の初期仮説より適用範囲は狭い。
- **`surface-container-highest` → `SecondaryContainer` への置換**が slider / progress / icon-button（toggle unselected）で共通して発生する Expressive の配色改定パターン。
- **drop-in 契約の既存違反が 2 件**: split-button popup の閉アニメーション（TW: opacity のみ / VE: opacity+scale）、slider thumb の transition イージング（TW: 未指定 / VE: standard）。Expressive 対応と独立に修正可能。
