---
"@m3-baseui/react-tailwind": patch
"@m3-baseui/react-vanilla-extract": patch
---

Align container / notification components with the M3 spec and restore drop-in
parity between the Tailwind and vanilla-extract engines:

- **Progress (circular, indeterminate):** the Tailwind build span now rotates via
  a dedicated `m3-circular-indeterminate` keyframe at 1.4s instead of Tailwind's
  built-in `animate-spin` (1s), matching the VE recipe's spin period.
- **Card (interactive):** the Tailwind build adds `transition-shadow` so the
  elevated card's elevation lift/settle animates, matching the VE box-shadow
  transition (previously the elevation change snapped instantly).
- **Snackbar (supporting text):** the `Description` slot now uses `body-medium`
  at full opacity in both engines (was `body-small` at 90% opacity), per the M3
  snackbar supporting-text spec.
- **Divider (vertical inset):** the Tailwind build uses a logical
  `margin-block-start` for the vertical `inset` variant, matching the VE recipe's
  `marginBlockStart` (was a physical `mt-4`).

All four keep identical DOM and `data-*` across engines (drop-in parity).
