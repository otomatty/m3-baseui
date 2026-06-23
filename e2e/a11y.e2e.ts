/**
 * Accessibility regression — axe-core scans of the playground. Behaviour is
 * delegated to Base UI, so these guard against regressions (bad contrast,
 * missing names, broken roles) rather than re-testing the library (issue #4).
 *
 * Runs against both engines. Scans the initial page plus a couple of open
 * overlay states (Dialog, Menu) which mount their content in portals.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'M3 on Base UI' })).toBeVisible();
});

test('initial page has no serious/critical a11y violations', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  const blocking = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});

test('open Dialog has no serious/critical a11y violations', async ({ page }) => {
  await page.getByRole('button', { name: 'ダイアログ' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  const blocking = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});

test('open Menu has no serious/critical a11y violations', async ({ page }) => {
  await page.getByRole('button', { name: 'メニュー', exact: true }).click();
  await expect(page.getByRole('menu').first()).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  const blocking = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});
