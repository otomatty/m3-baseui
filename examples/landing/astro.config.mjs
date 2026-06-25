import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Used for canonical URLs, OGP and the sitemap. Defaults to the Cloudflare
// Pages preview domain; set `SITE_URL` (e.g. a custom domain) in the Pages
// project's environment variables to override without touching code.
const site = process.env.SITE_URL ?? 'https://m3-baseui.pages.dev';

// https://astro.build/config
export default defineConfig({
  // A purely static site (`output: "static"`), so no Cloudflare adapter is
  // needed — Pages serves the `dist/` output directly.
  site,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Resolve workspace packages to their TS source in dev/build so no
    // pre-build of the libraries is needed; published consumers fall through
    // to the `dist` `default` export. Mirrors examples/playground.
    //
    // Astro renders pages through Vite's SSR pipeline at build time, and Vite 6
    // resolves SSR imports with a separate condition list that does NOT inherit
    // `resolve.conditions` — so the custom condition must be set on both.
    resolve: { conditions: ['@m3/source'] },
    ssr: { resolve: { conditions: ['@m3/source'] } },
  },
});
