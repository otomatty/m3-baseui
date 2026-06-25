import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, OGP and sitemap. Override with the real domain
  // when the site is deployed.
  site: 'https://otomatty.github.io',
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
