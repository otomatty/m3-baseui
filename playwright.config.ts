/**
 * Playwright config — E2E foundation for issue #4 (設計書 §9).
 *
 * The same shared playground (`examples/playground/src/App.tsx`) is served by
 * two Vite dev servers: the Tailwind build and the vanilla-extract build (whose
 * App re-export is alias-rewritten to `@m3/react-vanilla-extract`). Both emit
 * the same DOM and the same `data-*` contract (drop-in compatible), so one spec
 * suite runs against both via the `tailwind` and `vanilla-extract` projects.
 *
 * Specs are named `*.e2e.ts` so Bun's unit runner (`bun test`, which picks up
 * `*.test.ts` / `*.spec.ts`) never tries to import them.
 *
 * Screenshot baselines are tagged per project and platform (e.g.
 * `…-tailwind-linux.png`); CI runs on Linux with the pinned Chromium build, so
 * baselines generated on Linux match. Refresh with `bun run test:e2e:update`.
 */
import { defineConfig, devices } from '@playwright/test';

const TAILWIND_PORT = 5273;
const VE_PORT = 5274;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['github'], ['list'], ['html', { open: 'never' }]] : 'list',
  expect: {
    // Absorb sub-pixel antialiasing differences while still catching real
    // visual regressions.
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: 'disabled' },
  },
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'tailwind',
      use: { ...devices['Desktop Chrome'], baseURL: `http://127.0.0.1:${TAILWIND_PORT}` },
    },
    {
      name: 'vanilla-extract',
      use: { ...devices['Desktop Chrome'], baseURL: `http://127.0.0.1:${VE_PORT}` },
    },
  ],
  // Bind Vite to 127.0.0.1 explicitly so the dev server and the health-check URL
  // agree on the interface — without it Vite listens on `localhost`, which can
  // resolve to IPv6 `::1` on CI and never satisfy the `127.0.0.1` probe.
  webServer: [
    {
      command: `bunx vite --port ${TAILWIND_PORT} --strictPort --host 127.0.0.1`,
      cwd: 'examples/playground',
      url: `http://127.0.0.1:${TAILWIND_PORT}`,
      reuseExistingServer: !isCI,
      timeout: 180_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: `bunx vite --port ${VE_PORT} --strictPort --host 127.0.0.1`,
      cwd: 'examples/playground-ve',
      url: `http://127.0.0.1:${VE_PORT}`,
      reuseExistingServer: !isCI,
      timeout: 180_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});
