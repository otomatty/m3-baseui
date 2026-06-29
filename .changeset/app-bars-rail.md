---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(navigation): TopAppBar / BottomAppBar / NavigationRail を新規実装

M3 仕様に沿ってアプリバー / レールの 3 コンポーネントを両エンジン drop-in 互換で追加。

- **TopAppBar**: small / center / medium / large の 4 バリアント。small/center は 64dp
  単一行（title-large、左寄せ / 中央寄せ）、medium/large はアクション行の下に見出し行を
  追加（headline-small / headline-medium、112dp / 152dp）。コンテナは surface、
  `data-variant` を CSS フックに露出。
- **BottomAppBar**: 80dp の surface-container（`role="toolbar"`）。先頭にアクション
  アイコン、末尾に任意の FAB を内包。
- **NavigationRail**: NavigationBar の縦版（中型画面向け）。Base UI `ToggleGroup` /
  `Toggle` で単一選択、選択は `data-pressed` 経由で secondary-container のインジケータ
  ピル・アイコン / ラベル色を駆動。先頭に任意の header（メニュー / FAB）領域。disabled は
  トークン別 dim（on-surface 38%）でステートレイヤー抑止。

ロジックは core の create-* ファクトリに一元化し、両エンジンで同一 DOM・同一 data-* を出力。
