---
name: setup-m3-baseui
description: >-
  Integrates @m3-baseui/* (Material Design 3 on Base UI) into React apps.
  Supports Tailwind v4 and vanilla-extract engines, migration from @otomatty/*,
  ThemeProvider wiring, and framework-specific setup (Vite, Next.js, Astro).
  Use when adding m3-baseui, @m3-baseui/react-tailwind, @m3-baseui/react-vanilla-extract,
  or migrating from @otomatty/*.
---

# Setup @m3-baseui

Integrate [m3-baseui](https://github.com/otomatty/m3-baseui) into a consumer React project.

## Workflow checklist

Copy and track progress:

```
- [ ] Step 1: Detect project context
- [ ] Step 2: Choose styling engine (one only)
- [ ] Step 3: Install packages
- [ ] Step 4: Wire CSS / build config
- [ ] Step 5: Wrap app with ThemeProvider
- [ ] Step 6: (Optional) Add icons
- [ ] Step 7: Verify
```

Run verification when done:

```bash
bash skills/setup-m3-baseui/scripts/verify-setup.sh
# Or, after installing via npx skills add:
bash ~/.agents/skills/setup-m3-baseui/scripts/verify-setup.sh
```

---

## Step 1: Detect project context

Inspect before changing anything:

| Signal | How to detect |
| --- | --- |
| Package manager | `package-lock.json` → npm, `pnpm-lock.yaml` → pnpm, `bun.lock` → bun |
| Framework | `vite.config.*` → Vite, `next.config.*` → Next.js, `astro.config.*` → Astro |
| Existing Tailwind | `tailwindcss` ^4 in deps + `@tailwindcss/vite` or `@tailwindcss/postcss` |
| Existing VE | `@vanilla-extract/css` + build plugin in vite/next config |
| Legacy scope | imports or deps containing `@otomatty/` → migrate (see below) |

**Requirements:** React 18+ or 19+, `@base-ui/react` ^1.6 as peer dependency.

---

## Step 2: Choose engine (pick ONE)

| Engine | Install | When to use |
| --- | --- | --- |
| **Tailwind v4** | `@m3-baseui/react-tailwind` | App already uses or will use Tailwind v4 |
| **vanilla-extract** | `@m3-baseui/react-vanilla-extract` | App uses VE recipes; no Tailwind component classes |

Both engines emit **identical DOM and `data-*` attributes** — drop-in compatible.

Do **not** install both engine packages unless migrating (replace imports, then remove the old one).

---

## Step 3: Install packages

### Tailwind v4 engine

```bash
npm i @m3-baseui/react-tailwind @base-ui/react react react-dom
npm i -D tailwindcss@^4 @tailwindcss/vite
```

For Next.js use `@tailwindcss/postcss` instead of `@tailwindcss/vite`. See [frameworks.md](frameworks.md).

`@m3-baseui/core` and `@m3-baseui/tokens` are pulled in automatically for the Tailwind engine. For vanilla-extract, add `@m3-baseui/tokens` directly (see above).

### vanilla-extract engine

```bash
npm i @m3-baseui/react-vanilla-extract @m3-baseui/tokens @base-ui/react react react-dom
npm i -D @vanilla-extract/css @vanilla-extract/recipes @vanilla-extract/vite-plugin
```

Install `@m3-baseui/tokens` directly — the app CSS imports `@m3-baseui/tokens/tokens.css`, and strict package managers (pnpm) do not expose transitive dependencies to the app.

### Optional icons

```bash
npm i @m3-baseui/icons
```

Add Material Symbols font in HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>
```

---

## Step 4: Wire CSS and build

### Tailwind v4 (default path)

**Vite** — add Tailwind plugin:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Main CSS** — import order matters. Prefer the one-line preset:

```css
@import '@m3-baseui/react-tailwind/preset.css';

/* Required: scan published component classes (omit = unstyled components) */
@source "../node_modules/@m3-baseui/react-tailwind/dist";
@source "./";
```

Equivalent manual setup:

```css
@import '@m3-baseui/tokens/tokens.css';
@import 'tailwindcss';
@import '@m3-baseui/tokens/theme.css';
@source "../node_modules/@m3-baseui/react-tailwind/dist";
@source "./";
```

Import the CSS from the app entry (`main.tsx`, root layout, or Astro layout).

**Critical:** `@source` pointing at `node_modules/@m3-baseui/react-tailwind/dist` is required for Tailwind v4 to generate component utility classes. Forgetting this is the most common integration failure.

### vanilla-extract engine

Add `vanillaExtractPlugin()` to Vite (before React plugin). Import tokens once:

```css
@import '@m3-baseui/tokens/tokens.css';
```

Component styles are pre-compiled in the VE package — no `@source` needed.

### Framework specifics

See [frameworks.md](frameworks.md) for Next.js App Router, Astro islands, and SSR notes.

---

## Step 5: Wrap app with ThemeProvider

All interactive components must render inside `ThemeProvider`:

```tsx
import { Button, ThemeProvider } from '@m3-baseui/react-tailwind';
// VE: '@m3-baseui/react-vanilla-extract'

export default function App() {
  return (
    <ThemeProvider seed="#6750A4" scheme="tonalSpot" mode="system" contrast="standard">
      <Button variant="filled">Submit</Button>
    </ThemeProvider>
  );
}
```

| Prop | Default | Notes |
| --- | --- | --- |
| `seed` | — | Hex color; enables dynamic color via material-color-utilities |
| `scheme` | `tonalSpot` | M3 scheme variant |
| `mode` | `system` | `light` \| `dark` \| `system` |
| `contrast` | `standard` | Contrast level |

For Next.js App Router, mark the provider wrapper `'use client'` or place it in a dedicated client component.

Compound components use namespace API: `Menu.Root`, `Dialog.Trigger`, `Select.Item`, etc.

### Tree-shaking (subpath imports)

```tsx
import { Button } from '@m3-baseui/react-tailwind/button';
import { Dialog } from '@m3-baseui/react-tailwind/dialog';
```

---

## Step 6: Migrate from `@otomatty/*`

If the project used the legacy scope, replace all imports:

| Legacy | New |
| --- | --- |
| `@otomatty/tokens` | `@m3-baseui/tokens` |
| `@otomatty/core` | `@m3-baseui/core` (usually transitive; rarely imported directly) |
| `@otomatty/icons` | `@m3-baseui/icons` |
| `@otomatty/react-tailwind` | `@m3-baseui/react-tailwind` |
| `@otomatty/react-vanilla-extract` | `@m3-baseui/react-vanilla-extract` |

Update CSS `@import` paths and `@source` paths accordingly. Remove old `@otomatty/*` from `package.json`.

---

## Step 7: Verify

1. Run `bash scripts/verify-setup.sh` (or the skill's bundled copy).
2. Start dev server; confirm a `Button variant="filled"` renders with M3 colors and ripple.
3. Run the project's typecheck (`tsc --noEmit`, `npm run typecheck`, etc.).
4. Toggle light/dark via `ThemeProvider` / `useTheme()` if dynamic color is used.

### Common failures

| Symptom | Fix |
| --- | --- |
| Components render but no M3 styling | Add `@source` for `react-tailwind/dist`; check CSS import order |
| `useTheme must be used within ThemeProvider` | Wrap route/layout with `ThemeProvider` |
| Tailwind layout utilities missing | Ensure `@import 'tailwindcss'` is present (via preset) |
| Icons show blank squares | Add Material Symbols font link |
| VE build error | Add `vanillaExtractPlugin()`; import `tokens.css` once |

---

## Reference

- npm: https://www.npmjs.com/org/m3-baseui
- Repo: https://github.com/otomatty/m3-baseui
- Live demo patterns: `examples/playground` (Vite + Tailwind), `examples/landing` (Astro + Tailwind)
