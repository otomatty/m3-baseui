# m3-baseui

Material Design 3 component library built on **Base UI**, with **vanilla-extract** and **Tailwind CSS v4** as interchangeable styling engines. React-only, TypeScript-native.

This repository implements the architecture in [`m3-baseui-design.md`](./m3-baseui-design.md): Base UI provides behavior/a11y, a single token source drives every styling engine through CSS custom properties, and component logic lives once in a headless factory that each engine specializes only by its class resolver.

## Layers

```
Layer 4  Theme / Dynamic Color   ThemeProvider, seed → scheme, light/dark/contrast   (@m3/core)
Layer 3  Styling (engine)        VE recipes / Tailwind variants                      (@m3/react-*)
Layer 2  Token (engine-neutral)  --md-ref-* / --md-sys-* CSS variables               (@m3/tokens)
Layer 1  Behavior (Base UI)      a11y / focus / keyboard / data-* state              (@base-ui-components/react)
```

Layer 2 (CSS variables) is the engine-neutral boundary. Everything above it is engine-specific; everything below is fully shared.

## Packages

| Package | Role |
| --- | --- |
| `@m3/tokens` | Single TS token source → generates `tokens.css`, the VE contract, and the Tailwind v4 `@theme` preset |
| `@m3/core` | `ThemeProvider`, dynamic color, `Ripple`, state-layer model, and the headless component factories |
| `@m3/react-vanilla-extract` | Button implemented with vanilla-extract recipes |
| `@m3/react-tailwind` | Button implemented with tailwind-variants + the Tailwind v4 preset |
| `@m3/icons` | Material Symbols wrapper (optional) |
| `@m3/example-playground` | Runnable Vite + Tailwind v4 demo |

Pick **one** engine package — both emit identical DOM and `data-*` state, so they are drop-in compatible.

## Requirements

- [Bun](https://bun.sh) ≥ 1.1 (workspace manager)
- React 18+ and `@base-ui-components/react` v1 as peer deps in your app

## Getting started

```bash
bun install
bun run gen:tokens     # generate CSS vars / VE contract / Tailwind preset from src/tokens.ts
bun run --filter @m3/example-playground dev
```

## Usage (Tailwind v4)

In your app's CSS, in this order:

```css
@import '@m3/tokens/tokens.css';   /* runtime --md-sys-* variables */
@import 'tailwindcss';
@import '@m3/tokens/theme.css';    /* maps tokens onto Tailwind's @theme */
```

```tsx
import { Button, ThemeProvider } from '@m3/react-tailwind';

export default function App() {
  return (
    <ThemeProvider seed="#6750A4" scheme="tonalSpot" mode="system" contrast="standard">
      <Button variant="filled">送信</Button>
      <Button variant="outlined">キャンセル</Button>
    </ThemeProvider>
  );
}
```

## Usage (vanilla-extract)

Add `@vanilla-extract/vite-plugin` to your build, import `'@m3/tokens/tokens.css'` once, then:

```tsx
import { Button, ThemeProvider } from '@m3/react-vanilla-extract';
```

The component API is identical across engines.

## Design decisions

- **Channel-triple colors** (`103 80 164`) so opacity modifiers (`bg-primary/12`), `color-mix`, and state layers compose cleanly.
- **Single token source** in `packages/tokens/src/tokens.ts`; never hand-edit generated files — change the source and re-run `bun run gen:tokens`.
- **Factory injection** keeps React logic in `@m3/core`; each engine only supplies a class resolver.
- **State layer** is a `::before` overlay tinted with `currentColor`, switched by Base UI `data-*` attributes.
- **Ripple** is a `@m3/core` primitive (Base UI ships none) and honors `prefers-reduced-motion`.

## Roadmap

Per the design doc: simple components next (IconButton / Switch / Checkbox / Radio / Chip), then Base UI-dependent (Select / Menu / Dialog / Tooltip / Tabs / Slider), then composites (TextField / NavigationBar / FAB / Snackbar) — each shipped in both engines with drop-in parity.

## License

MIT. Bundles concepts from Base UI (MIT) and `@material/material-color-utilities` (Apache-2.0).
