/**
 * Visual regression — full-page screenshots of the playground in light and dark
 * (issue #4). Baselines are tagged per engine + platform by Playwright, so the
 * `tailwind` and `vanilla-extract` projects each keep their own set.
 *
 * Determinism: the only networked asset is the Material Symbols webfont, whose
 * load state would otherwise vary between machines. We block it so icons render
 * as their (consistent) ligature text everywhere; body text falls back to the
 * locally installed sans-serif, which matches the CI Linux runner. Refresh
 * baselines with `bun run test:e2e:update`.
 *
 * `ThemeProvider mode="system"` follows `prefers-color-scheme`, so we drive the
 * mode with `emulateMedia` rather than clicking the toggle.
 */
import { test, expect, type Page } from '@playwright/test';

/** Block the Google Fonts webfont so rendering is identical across machines. */
async function blockWebfonts(page: Page) {
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
}

/** Navigate and settle font fallbacks before snapshotting. */
async function prepare(page: Page) {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'M3 on Base UI' })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

for (const scheme of ['light', 'dark'] as const) {
  test(`playground — ${scheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await blockWebfonts(page);
    await prepare(page);
    await expect(page).toHaveScreenshot(`playground-${scheme}.png`, {
      fullPage: true,
      // Indeterminate progress / circular spinners never settle; mask them out.
      mask: [page.getByLabel('読み込み中'), page.getByLabel('処理中')],
    });
  });
}
