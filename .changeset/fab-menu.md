---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(fab): FAB menu（拡張アクション）を新規実装

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
