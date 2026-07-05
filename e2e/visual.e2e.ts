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

// ---- issue #77: per-variant component visual regression ----
// Element-scoped screenshots isolate each M3 layout so a regression points at the
// exact variant. Snapshots run in light mode (deterministic default) with the
// morphing loading indicator frozen by the config's `animations: 'disabled'`.
test.describe('component visual regression (issue #77)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await blockWebfonts(page);
    await prepare(page);
  });

  const CAROUSELS = [
    ['ギャラリー', 'carousel-multi-browse'],
    ['ヒーロー カルーセル', 'carousel-hero'],
    ['全画面 カルーセル', 'carousel-full-screen'],
  ] as const;
  for (const [label, name] of CAROUSELS) {
    test(name, async ({ page }) => {
      await expect(page.getByRole('group', { name: label, exact: true })).toHaveScreenshot(
        `${name}.png`,
      );
    });
  }

  const INDICATORS = [
    ['読み込み中インジケーター', 'loading-uncontained'],
    ['読み込み中インジケーター（contained）', 'loading-contained'],
  ] as const;
  for (const [label, name] of INDICATORS) {
    test(name, async ({ page }) => {
      await expect(page.getByRole('progressbar', { name: label, exact: true })).toHaveScreenshot(
        `${name}.png`,
      );
    });
  }

  const TOOLBARS = [
    ['標準ツールバー', 'toolbar-standard-horizontal'],
    ['ビビッドなツールバー', 'toolbar-vibrant-horizontal'],
    ['標準ツールバー（縦）', 'toolbar-standard-vertical'],
    ['ビビッドなツールバー（縦）', 'toolbar-vibrant-vertical'],
    ['ドックツールバー', 'toolbar-docked-horizontal'],
  ] as const;
  for (const [label, name] of TOOLBARS) {
    test(name, async ({ page }) => {
      await expect(page.getByRole('toolbar', { name: label, exact: true })).toHaveScreenshot(
        `${name}.png`,
      );
    });
  }
});
