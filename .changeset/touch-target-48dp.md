---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(a11y): 48dp 最小タッチ領域を全インタラクティブコンポーネントへ付与 (#51)

M3 が a11y 要件として規定する **48dp の最小タッチ領域**を、視覚に影響を与えずヒット領域のみ
拡張する形で付与した。material-web の touch-target パターン（絶対配置の透明オーバーレイ）に
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
