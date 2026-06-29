---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(actions): Expressive ボタン（Button groups / Split button）を新規実装

M3 Expressive のボタン 2 コンポーネントを両エンジン drop-in 互換で追加。ロジックは core の
`createButtonGroup` / `createSplitButton` ファクトリに一元化し、両エンジンで同一 DOM・同一
`data-*` を出力する。

- **ButtonGroup**: 関連ボタンを横並びにする `role="group"` コンテナ。`standard` は 8dp の
  ギャップで配置、`connected` は 2dp に詰めて子の内側（シーム）コーナーを `small`（8dp）へ
  落とし、外側コーナーは full のまま 1 つの連結ユニットに見せる。子コーナーの上書きは
  Tailwind は子セレクタ、VE は `globalStyle`（連結クラスにスコープ）で実装。`render` で
  ホスト要素を差し替え可能。
- **SplitButton**: 主アクションボタンとメニューを開くトレーリングボタンを 2dp のシームで
  連結。トレーリングは Base UI `Menu.Trigger` で、`data-popup-open` でシェブロンが 180°
  回転し、ドロップダウンは M3 メニューサーフェスを再利用する。両パートは `ButtonVariant`
  （filled / tonal / outlined / elevated / text）でコンテナ色を共有し、向かい合うコーナーを
  互いに落として連結を表現。`Root`（`Menu.Root`）/ `Group` / `Leading` / `Trailing` /
  `Portal` / `Positioner` / `Popup` / `Item` の名前空間で公開。

色はチャンネル三値 + `rgb()` で `--md-sys-*` 経由、ステートレイヤーは `::before`
オーバーレイ、disabled はブランケット不透明度ではなくトークン別 dim。ユニットは初期描画と
トークン契約、ポータル/対話とビジュアル回帰は E2E（interactions / visual / a11y）でカバー。
