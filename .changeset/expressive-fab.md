---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/core': major
'@m3-baseui/tokens': minor
---

FAB / Extended FAB / FAB Menu now follow the Material 3 Expressive spec.

**Breaking (FAB / FabMenu):**

- `size` is now `'small' | 'medium' | 'large'` mapping to **56 / 80 / 96 dp** (was `small` 40dp / `regular` 56dp / `large` 96dp). The pre-Expressive 40dp FAB is removed.
- The extended FAB is no longer a `size` value. Use the new `variant="extended"` prop, which combines with `size` — extended small/medium/large are 56/80/96 dp with title-medium / title-large / headline-small labels.
- The `surface` container color is removed (deprecated by M3). Colors are `primary | secondary | tertiary`; the default FAB color is now `primary`.
- Large FAB icon is 32dp (was 36dp); FAB Menu items use a title-medium label with 24dp leading/trailing padding.

**Tokens:** added the Expressive shape steps `largeIncreased` (20dp) and `extraLargeIncreased` (32dp), surfaced as `rounded-large-increased` / `rounded-extra-large-increased` (Tailwind) and `vars.sys.shape.largeIncreased` / `extraLargeIncreased` (vanilla-extract).

Migration: `size="regular"` → `size="small"`; old `size="small"` (40dp) → nearest is `size="small"` (56dp); `size="extended"` → `variant="extended"`; `color="surface"` → `color="primary"`.
