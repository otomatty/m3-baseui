---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(dialog): full-screen バリアント / icon スロット / min-width 280dp / actions スロット（#62）

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
