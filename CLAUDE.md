# CLAUDE.md — m3-baseui 開発ルール

Material Design 3 を Base UI 上に実装する React コンポーネントライブラリ。
vanilla-extract と Tailwind CSS v4 の両エンジンに対応する。**作業前にこのファイルの
規約を必ず守ること。**

## プロジェクト構成

4 レイヤー: **Behavior（Base UI）→ Token（CSS変数）→ Styling（エンジン別）→ Theme**。
Layer 2（`--md-sys-*` CSS 変数）がエンジン非依存の境界線。

| パッケージ | 役割 |
| --- | --- |
| `@m3/tokens` | トークン単一ソース → `tokens.css` / VE契約 / Tailwind `@theme` を生成 |
| `@m3/core` | `ThemeProvider`・動的配色・`Ripple`・`slot.tsx`・`create-*` ファクトリ（エンジン非依存ロジック） |
| `@m3/react-tailwind` | tailwind-variants でクラス解決 + Tailwind v4 プリセット |
| `@m3/react-vanilla-extract` | vanilla-extract recipe でクラス解決 |
| `@m3/icons` | Material Symbols ラッパー（任意） |
| `examples/playground` | Vite + Tailwind v4 デモ |

## コマンド

```bash
bun install
bun run gen:tokens     # トークン変更後に生成物を更新
bun run build          # 全パッケージを dist へビルド（tsup: ESM + .d.ts）
bun run typecheck      # 全パッケージ tsc --noEmit
bun run test           # bun 組込ランナー（happy-dom + testing-library）。`@m3/source` 解決のため `bun run` 経由で
bun run test:e2e       # Playwright（両エンジン: 相互作用 + axe a11y + ビジュアル回帰）
bun run test:e2e:update # ビジュアル回帰のベースライン更新（e2e/**-snapshots/）
bun run lint           # biome check .
bun run format         # biome format --write .
bun run changeset      # 変更セットを追加（公開フロー: changesets）
bun run storybook      # Storybook 開発サーバ（両エンジン切替 + a11y）
bun run build-storybook # Storybook を storybook-static/ へ静的ビルド
bun run --filter @m3/example-playground build
```

> **配布（issue #5）**: 各パッケージは tsup で `dist/`（ESM + `.d.ts` + sourcemap）にビルドする。
> `package.json` の `exports` は公開時に `dist` を指し（`default`）、リポジトリ内のツールは
> `@m3/source` 条件でソースに解決する（`tsconfig` の `customConditions` / Vite の
> `resolve.conditions` / `bun --conditions`）。そのため**テストは `bun run test`**（素の
> `bun test` ではなく）で実行する。`@m3/core` は配布物でも `'use client'` を保持し、VE 版は
> recipe を静的 CSS に事前コンパイルして出力する（`sideEffects: ["**/*.css"]`）。

> E2E（issue #4）は Chromium が必要。CI は `@playwright/test` でピン留めしたビルドを
> `bunx playwright install --with-deps chromium` で取得する。ローカル初回は同コマンドを実行。

> **ドキュメント（issue #6）**: `examples/storybook` に単一の Storybook（Vite ビルダー）。
> Tailwind / vanilla-extract の両プラグインを `viteFinal` で有効化し、両エンジンを同時に
> import する。ストーリーはコンポーネントを直接 import せず `src/engine.tsx` の `useM3()`
> から取得し、ツールバーの **Engine** グローバルで実エンジンを切替える（drop-in 互換の生確認）。
> シード/スキーム/コントラスト/モードは preview のグローバル args として **Controls** に露出し、
> デコレータが `ThemeProvider` へ配線する。a11y（axe）は `@storybook/addon-a11y` で有効。

## 中核ルール（不変条件）

1. **トークンは `packages/tokens/src/tokens.ts` が唯一の出典。** 生成物
   （`packages/tokens/styles/*.css`、`packages/tokens/src/generated/contract.css.ts`）を
   **手編集しない**。値を変えたら `bun run gen:tokens`。
2. **スタイルは Base UI の `data-*` 属性をフックに CSS 側へ寄せる**
   （`data-checked` / `data-disabled` / `data-highlighted` / `data-pressed` / `data-popup-open`
   / `data-starting-style` 等）。色は**チャンネル三値**で保持し `rgb(${...})` で包む。
3. **React ロジックは `@m3/core` に一元化**する。単一要素系は `create-<name>.tsx`
   ファクトリ、複合系は Base UI part を `slot.tsx` の `createSlot` / `mergeClassName` で
   ラップした名前空間を返す。**エンジン側はクラス解決器だけを差し替える。**
4. **VE 版と Tailwind 版は同一 DOM・同一 `data-*` を出力（drop-in 互換）。** 既存の
   `cx`・`Ripple`・`slot.tsx`・トークンを再利用し、二重実装しない。
5. ステートレイヤーは `::before` オーバーレイ（`currentColor` + `--md-sys-state-*`）。
   選択コントロールは 40dp 円形にするため `::before` を拡張する。

## TDD ワークフロー（必須）

新機能・修正は**テストファースト**で、**最小要件でコンパクトに**進める。

1. **失敗するテストを先に書く。** 期待挙動を role / ARIA / `data-*` /（必要時）クラス断片で表現。
2. テストが**赤**になることを `bun test` で確認。
3. **最小限の実装**を書く（過剰な props・抽象化・巨大コンポーネントを避け、既存
   ファクトリ・`slot.tsx`・`cx`・トークンを再利用）。
4. `bun test` で**緑**、`bun run typecheck` で**型 0 エラー**、`bun run lint` を確認。
5. drop-in 互換と `data-*` 契約を壊さない範囲で整理（リファクタ）。

### テスト規約
- テストは原則 `@m3/react-tailwind` に対して書く（DOM は両エンジン共通のため代表とする）。
- co-located の `*.test.tsx`（`packages/react-tailwind/src/<name>.test.tsx`）。
- アサートは role/ARIA と `data-*` を優先。クラスは断片一致に留める。
- ポータル/位置計算を伴う複雑系（Menu/Select/Tooltip/Dialog）の対話は **E2E**
  （`e2e/*.e2e.ts`、Playwright）に委ね、ユニットでは初期描画・単純クリックに限定する。
- jest-dom マッチャの型は `packages/react-tailwind/src/jest-dom.d.ts` で `bun:test` を拡張済み。
  **テストを持つパッケージを増やす場合**は、その tsconfig の `types` に `"bun"` を足し、
  この `jest-dom.d.ts` を複製すること。

### E2E 規約（`e2e/`）
- ファイル名は `*.e2e.ts`（`*.test.ts`/`*.spec.ts` は `bun test` が拾うため避ける）。
- 同一の共有 Playground を Tailwind / vanilla-extract の 2 プロジェクトで実行（drop-in 互換の検証）。
- アサートは role/ARIA と `data-*` を優先。ビジュアル回帰は webフォントを遮断して決定論化し、
  ベースラインは `e2e/**-snapshots/` にエンジン×プラットフォーム別でコミットする。
- 動的配色は `generateScheme` のスナップショットで回帰検知
  （`packages/react-tailwind/src/dynamic-color.test.ts`）。

## コンポーネント追加の手順（7 ステップ）

1. `packages/core/src/<name>.contract.ts` — バリアント型・props・スロット/解決器型
2. `packages/core/src/create-<name>.tsx` — ファクトリ（`'use client'`、ロジック一元化）
3. `packages/react-tailwind/src/<name>.ts` — `tv()` 解決器
4. `packages/react-vanilla-extract/src/<name>.css.ts` + `<name>.ts` — recipe + 配線
5. 両エンジンの `src/index.ts` に export 追加
6. 両エンジンの `package.json` `exports` にサブパス追加
7. `examples/playground/src/App.tsx` にデモ節を追加（+ 上記 TDD のテスト）

## やらないこと
- 生成物（tokens の CSS / 契約）の手編集
- 安易な依存追加（まず既存ユーティリティを探す）
- 巨大・多機能コンポーネント化（M3 の最小要件に絞る）
- 一方のエンジンだけ実装して drop-in 互換を崩すこと
