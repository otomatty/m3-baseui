---
"@m3-baseui/react-tailwind": patch
"@m3-baseui/react-vanilla-extract": patch
---

Fix published `dependencies["@m3-baseui/core"]`: `bun pm pack` was reading a stale `bun.lock` workspace version (`3.0.0`) after the 7.0.0 bump, so npm consumers of `@m3-baseui/react-tailwind@7.0.0` / `react-vanilla-extract@7.0.0` installed `core@3.0.0` instead of `7.0.0`. Refresh the lockfile on version bumps and assert packed workspace deps match `package.json` before publish.
