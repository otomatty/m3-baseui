---
"@m3-baseui/core": minor
"@m3-baseui/react-tailwind": minor
"@m3-baseui/react-vanilla-extract": minor
---

TextField: add M3 text area (multiline) support and spec-fidelity fixes.

- New `multiline` / `rows` props render a native `<textarea>` (via Base UI
  `Field.Control`), with a min-height that grows, top-aligned content/label and
  vertical resize. `TextFieldProps` is now a discriminated union on `multiline`,
  so the single-line path keeps `<input>` types and the multiline path gets
  `<textarea>` events and props (`rows` / `wrap` / `cols`).
- Icon spacing follows M3 tokens (16dp icon-to-input, 12dp icon-side edge).
- Outlined notch mask reads `--md-textfield-notch` (default `surface`) so a
  field on a non-surface background stays background-independent, and icon-side
  padding stays steady when the outline thickens on focus.
