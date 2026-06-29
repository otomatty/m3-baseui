---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(sheets): Bottom sheets / Side sheets を新規実装

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
