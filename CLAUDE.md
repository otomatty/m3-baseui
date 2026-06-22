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
bun run typecheck      # 全パッケージ tsc --noEmit
bun test               # bun 組込ランナー（happy-dom + testing-library）
bun run lint           # biome check .
bun run format         # biome format --write .
bun run --filter @m3/example-playground build
```

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
- ポータル/位置計算を伴う複雑系（Menu/Select/Tooltip/Dialog）の対話は E2E（将来の
  Playwright, issue #4）に委ね、ユニットでは初期描画・単純クリックに限定する。
- jest-dom マッチャの型は `packages/react-tailwind/src/jest-dom.d.ts` で `bun:test` を拡張済み。
  **テストを持つパッケージを増やす場合**は、その tsconfig の `types` に `"bun"` を足し、
  この `jest-dom.d.ts` を複製すること。

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
