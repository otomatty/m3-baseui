---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
---

ButtonGroup now follows the Material 3 Expressive spec (issue #119).

Aligned to Compose `ButtonGroupSmallTokens` / `ConnectedButtonGroupSmallTokens` +
`ButtonGroup.kt`. Both engines emit identical DOM / `data-*` (drop-in).

**Breaking (visual — no API/DOM changes):**

- **`standard` gap 8dp → 12dp** (`ButtonGroupSmallTokens.BetweenSpace`).
- **`connected` children are now equal-width flexible segments** so the press
  squeeze can redistribute width (the M3 connected/segmented layout).
- **Press squeeze (`ButtonGroupDefaults.ExpandedRatio = 0.15`):** pressing a
  connected child grows it by ~15% while its neighbours compress, animated with
  the fast spatial spring (`flex-grow` + `spring-spatial-fast`). The ratio is kept
  as the `--md-comp-button-group-expanded-ratio` custom property.
- **Connected seam morphs to `extra-small` (4dp) on press**
  (`PressedInnerCornerCornerSize`).
- **A selected/toggled connected child rounds fully**
  (`SelectedInnerCornerCornerSizePercent = 50%`).
