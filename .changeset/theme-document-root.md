---
'@m3-baseui/core': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/react-vanilla-extract': major
---

Theme writes to `document.documentElement` by default (portal-safe).

- Add `syncDocumentTheme`, `clearScheme`, and `ThemeProvider` `colors` / `resolveMode` / `target`
- Theme is CSS variables on `:root` — not a separate consumer layer; Provider is optional sugar
- Breaking: seed colors no longer apply only to the provider wrapper (`target="scope"` restores that)
