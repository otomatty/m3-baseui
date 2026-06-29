---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(display/motion): Carousel / Loading indicator / Toolbars を新規実装

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
