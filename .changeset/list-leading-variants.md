---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
'@m3-baseui/core': minor
---

feat(list,item): leading バリアント（avatar 40dp / image 56dp / video 100×56dp）を追加（#63）

コンテナ・通知系の M3 仕様照合（#38）で判明した残課題。これまで List/Item の leading は
**icon（24dp）のみ**実装され、contract の JSDoc が謳う avatar/image は未対応だった。

`List.Item` / `Item` に **`leadingVariant`**（`icon` | `avatar` | `image` | `video`、
既定 `icon`）を追加。M3 の leading 列幅に合わせ avatar=40dp（円形）・image=56dp・
video サムネイル=100×56dp とし、icon は従来どおり 24dp。サイズはファクトリが leading
スロットへ出力する **`data-leading`** 属性をフックに CSS 側で解決するため、両エンジンで
同一 DOM・同一 `data-*` を維持する（drop-in 互換）。`<img>` は列幅に合わせて
`object-fit: cover` で充填する。

a11y: 装飾アイコン（`leadingVariant="icon"`）のみ無条件 `aria-hidden` とし、情報を持つ
avatar/image/video は a11y ツリーに残す（呼び出し側が `<img alt>` 等でアクセシブル名を
付与する）。3 行レイアウトでは leading/trailing を従来どおり top 揃え（`items-start`）に
する。

新規エクスポート: `LIST_LEADING_VARIANTS` / `ListLeadingVariant` / `ITEM_LEADING_VARIANTS`
/ `ItemLeadingVariant`（両エンジン + core）。新規トークンは不要。
