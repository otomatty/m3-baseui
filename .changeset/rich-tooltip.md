---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(tooltip): Rich tooltip バリアントを追加（#61）

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
- **action buttons（任意）**: text button を並べる末尾行（`RichTooltip.Actions`）。
  `RichTooltip.Close` でアクション押下時にポップアップを閉じられる。

新規トークンは不要（既存の `surfaceContainer` / `titleSmall` / `bodyMedium` /
`onSurfaceVariant` / `shape.medium` / `elevation.level2` で充足）。ポータル/位置計算系の
ため対話は E2E（Playwright、両エンジン: クリックで開く / アクションがキーボード操作可能）で
検証し、ユニット（Tailwind 代表）はトークン契約の断片一致に限定した。
