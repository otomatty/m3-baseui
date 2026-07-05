---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/core': major
---

SplitButton now follows the Material 3 Expressive spec (issue #118).

Aligned to Compose `SplitButtonSmallTokens` + `SplitButton.kt`. Both engines emit
identical DOM / `data-*` (drop-in).

**Breaking:**

- **The `text` variant is removed.** Per the M3 spec the split button has only
  `filled | tonal | outlined | elevated` (there is no text split button). The
  `variant` prop is now typed `SplitButtonVariant` (a split-button-specific type,
  so `Button`'s shared `ButtonVariant` keeps `text`). New exports:
  `SplitButtonVariant`, `SPLIT_BUTTON_VARIANTS`.
- **Seam corner `small` (8dp) → `extra-small` (4dp)** (`InnerCornerCornerSize`),
  and it **morphs to `medium` (12dp) on hover/press** (`InnerHovered/PressedCornerCornerSize`).
- **The trailing button morphs to a full circle while the menu is open**
  (`TrailingInnerSelectedCornerCornerSizePercent = 50%`), in addition to the
  existing chevron rotation.
- Padding: leading 24dp → **16dp outer / 12dp seam**; trailing 12dp → **13dp**.
  Trailing icon 18dp → **22dp** (`TrailingIconSize`).

**Motion:** shape morphs use the `spring-effects-default` easing; the chevron
rotation uses `spring-spatial-default`.

**Drop-in fix:** the popup close animation now matches between engines — both fade
**and** scale (0.95) on close (Tailwind previously faded only).
