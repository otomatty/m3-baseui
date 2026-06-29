---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(pickers): Search / Date pickers / Time pickers を新規実装

M3 の検索・日時系 3 コンポーネントを両エンジン drop-in 互換で追加。ロジックは core の
`create-*` ファクトリに一元化し、エンジンはクラス解決器のみ差し替える。

- **Search**（search bar + docked view）: Base UI Combobox を土台に、resting の検索バー
  （surface-container-high のピル）と docked のサジェスト一覧（elevation 3）を提供。
  サジェスト行は hover / `data-highlighted` / `data-selected` に連動する `::before`
  ステートレイヤーを持つ。
- **Date pickers**（calendar + docked + modal）: Base UI に暦プリミティブが無いため、
  月グリッドの headless `Calendar`（状態は `data-selected` / `data-today` / `data-disabled`）
  を `<table>` セマンティクスで実装。docked は Popover、modal は Dialog のサーフェスに載せる。
  年選択ビュー・min/max・ロケール対応を含む。
- **Time pickers**（dial + input）: 12 時間ダイアル（クロックフェイス + ハンド）と
  入力式の 2 レイアウト。AM/PM トグルを共有し、アクティブなフィールドは primary-container、
  選択中のダイアル数字は primary でフィル。

色はチャンネル三値 + `rgb()` ラップで `--md-sys-*` 経由、ステートレイヤーは `::before`、
両エンジンで同一 DOM・同一 `data-*` を出力する。ユニットは初期描画と単純クリックを検証し、
ポータル/位置計算/ダイアルのドラッグは E2E に委ねる。
