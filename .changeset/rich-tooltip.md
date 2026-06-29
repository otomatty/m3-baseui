---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(tooltip): Rich tooltip バリアントを追加（#61）

コンテナ・通知系の M3 仕様照合（#38）で判明した残課題。これまで Tooltip は **Plain
tooltip のみ**実装され、M3 が定義するもう一方の **Rich tooltip** が未実装だった。Plain と
同じ Base UI Tooltip primitive（hoverable popup）を再利用し、Rich 用のスロットを同一名前
空間に追加した。両エンジンで同一 DOM・同一 `data-*` を出力する（drop-in 互換）。

- **container**: `surface-container` / `elevation level2` / 角丸 `medium`(12dp) /
  max-width 320dp、`RichPopup` として `Popup` を別クラスでラップ。
- **subhead（任意）**: `title-small` / `on-surface`（`Subhead`）。
- **supporting text**: `body-medium` / `on-surface-variant`（`SupportingText`）。
- **action buttons（任意）**: text button を並べる末尾行（`Actions`）。

新規トークンは不要（既存の `surfaceContainer` / `titleSmall` / `bodyMedium` /
`onSurfaceVariant` / `shape.medium` / `elevation.level2` で充足）。ポータル/位置計算系の
ため対話は E2E（Playwright、両エンジン）で検証し、ユニット（Tailwind 代表）は
トークン契約の断片一致に限定した。
