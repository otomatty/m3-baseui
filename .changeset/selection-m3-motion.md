---
'@m3-baseui/react-vanilla-extract': minor
'@m3-baseui/react-tailwind': minor
---

feat(motion): Selection コンポーネントを M3 のモーション（非対称イージング / spatial）へ整備 (#55)

Selection 検証（#36）で、Checkbox / Radio / Switch のモーションが全コンポーネント共通の
house style（`duration-150/200 ease-standard`）で実装され、M3 が規定する **state 別の
非対称イージング/デュレーション**と乖離していた点を是正した。両エンジンで同一の見え方
（drop-in 互換）を保ち、デュレーションは `--md-sys-motion-duration-*` トークン参照へ統一した。

- **Checkbox**: 選択インジケータの opacity 遷移を**非対称**化。unselected-exit は
  `emphasized-accelerate` × `short3`(150ms)、selected/indeterminate-enter は
  `emphasized-decelerate` × `medium3`(350ms)。material-web `_checkbox.scss` に倣う。
- **Radio**: inner dot を width/height アニメから **`transform: scale()`** へ変更し、
  `emphasized-decelerate` × `medium2`(300ms) の inner-circle-grow に。dot は常に 10dp で
  中心からスケールする（静止時の見えは不変）。
- **Switch**: handle の spatial モーションを `ease-standard`(200ms) から **`emphasized`** ×
  `medium2`(300ms) へ。emphasized はオーバーシュートしないため、handle の color 遷移へ
  spring を適用した場合の flicker を避けつつ spatial を強調できる（spring-spatial は
  per-property easing が必要なため将来課題）。

静止状態の見えは 3 コンポーネントとも不変のため、ビジュアル回帰ベースラインは変化なし。
ユニット（Tailwind 代表）で各 state のイージング/デュレーション断片を検証。
