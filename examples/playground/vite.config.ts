import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Resolve workspace packages to their TS source in dev so no pre-build is
  // needed; published consumers fall through to the `dist` `default` export.
  resolve: { conditions: ['@m3/source'] },
});
