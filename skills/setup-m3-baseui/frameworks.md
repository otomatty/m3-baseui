# Framework-specific setup

Read this file when the consumer project is not plain Vite + React.

---

## Vite + React (Tailwind v4)

Reference: `examples/playground/` in the m3-baseui repo.

**vite.config.ts**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**src/main.tsx**

```tsx
import './styles.css';
```

**src/styles.css**

```css
@import '@m3-baseui/react-tailwind/preset.css';
@source "../node_modules/@m3-baseui/react-tailwind/dist";
@source "./";
```

---

## Vite + React (vanilla-extract)

Reference: `examples/playground-ve/`.

**vite.config.ts**

```ts
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [vanillaExtractPlugin(), react()],
});
```

**src/styles.css**

```css
@import '@m3-baseui/tokens/tokens.css';
```

If the demo also uses Tailwind for layout utilities, keep Tailwind v4 separately — component styles come from VE, not Tailwind classes on M3 components.

---

## Next.js App Router (Tailwind v4)

1. Install `@tailwindcss/postcss` instead of `@tailwindcss/vite`.
2. **postcss.config.mjs**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

3. Import global CSS from `app/layout.tsx`:

```tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

4. **app/globals.css**

```css
@import '@m3-baseui/react-tailwind/preset.css';
@source "../../node_modules/@m3-baseui/react-tailwind/dist";
@source "../app";
@source "../components";
```

Adjust `@source` paths relative to `globals.css` location.

5. Create **app/providers.tsx** (`'use client'`):

```tsx
'use client';

import { ThemeProvider } from '@m3-baseui/react-tailwind';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider seed="#6750A4" scheme="tonalSpot" mode="system">
      {children}
    </ThemeProvider>
  );
}
```

6. Wrap `{children}` in `layout.tsx` with `<Providers>`.

7. M3 interactive components in Server Components need `'use client'` on the file or a client wrapper.

---

## Next.js (vanilla-extract)

Use `@vanilla-extract/next-plugin` in `next.config.ts` instead of the Vite plugin. Import `@m3-baseui/tokens/tokens.css` in `globals.css`. Follow the same `ThemeProvider` client wrapper pattern as above.

---

## Astro + React (Tailwind v4)

Reference: `examples/landing/`.

1. `@astrojs/react` integration + `@tailwindcss/vite` in Astro's Vite config.

**astro.config.mjs**

```js
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

2. Import global CSS from a layout (not individual pages):

```astro
---
import '../styles/global.css';
---
```

3. **src/styles/global.css**

```css
@import '@m3-baseui/react-tailwind/preset.css';
@source "../../node_modules/@m3-baseui/react-tailwind/dist";
@source "../";
```

4. React components using M3 hooks or state need a client directive:

```astro
---
import { LiveDemo } from '../components/LiveDemo';
---
<LiveDemo client:visible />
```

5. Add Material Symbols font in layout `<head>` if using `@m3-baseui/icons`.

6. `ThemeProvider` lives inside the React island component, not the `.astro` layout.

---

## Monorepo / workspace consumers

When depending on a local checkout instead of npm:

- Use `"@m3-baseui/react-tailwind": "workspace:*"` (pnpm/bun) or `"file:../m3-baseui/packages/react-tailwind"`.
- `@source` can point at package `src/` during dev if resolving `@m3/source` condition; published npm consumers must use `dist/`.

---

## Package manager commands

| Manager | Install example |
| --- | --- |
| npm | `npm i @m3-baseui/react-tailwind @base-ui/react` |
| pnpm | `pnpm add @m3-baseui/react-tailwind @base-ui/react` |
| bun | `bun add @m3-baseui/react-tailwind @base-ui/react` |
| yarn | `yarn add @m3-baseui/react-tailwind @base-ui/react` |
