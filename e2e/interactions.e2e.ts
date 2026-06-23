/**
 * Interaction E2E — open/close, selection, and keyboard navigation, asserting
 * the Base UI `data-*` state contract that the unit tests deliberately defer to
 * here (portals + positioning). Runs against both engines (issue #4).
 */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'M3 on Base UI' })).toBeVisible();
});

test('Dialog opens, traps focus, and closes on Escape', async ({ page }) => {
  await page.getByRole('button', { name: 'ダイアログ' }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('変更を保存しますか？')).toBeVisible();

  const focusInDialog = () => dialog.evaluate((el) => el.contains(document.activeElement));

  // Focus is moved into the dialog. (poll: Base UI manages focus async.)
  await expect.poll(focusInDialog).toBe(true);

  // Tabbing past the last control wraps back inside instead of escaping to the
  // (now inert/aria-hidden) page behind it — i.e. focus is trapped. The poll
  // absorbs the transient focus-guard state mid-wrap.
  for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
  await expect.poll(focusInDialog).toBe(true);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('Menu opens (data-popup-open) and highlights items via keyboard', async ({ page }) => {
  // `exact` avoids also matching the "FAB メニュー" trigger.
  const trigger = page.getByRole('button', { name: 'メニュー', exact: true });
  await trigger.click();

  await expect(trigger).toHaveAttribute('data-popup-open', '');
  const menu = page.getByRole('menu').first();
  await expect(menu).toBeVisible();

  // ArrowDown highlights the first item (Base UI data-highlighted).
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: /プロフィール/ })).toHaveAttribute(
    'data-highlighted',
    '',
  );

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).not.toHaveAttribute('data-popup-open', '');
});

test('Select opens and commits a chosen option', async ({ page }) => {
  const trigger = page.getByRole('combobox').first();
  await expect(trigger).toHaveText(/apple/);
  await trigger.click();

  await expect(trigger).toHaveAttribute('data-popup-open', '');
  const option = page.getByRole('option', { name: /バナナ/ });
  await expect(option).toBeVisible();
  await option.click();

  await expect(trigger).toHaveText(/banana/);
  await expect(trigger).not.toHaveAttribute('data-popup-open', '');
});

test('Tooltip shows on hover', async ({ page }) => {
  await page.getByRole('button', { name: '情報' }).hover();
  await expect(page.getByText('説明的なツールチップ')).toBeVisible();
});

test('Tabs move the active tab via click and keyboard (data-active)', async ({ page }) => {
  const tablist = page.getByRole('tablist').first();
  const overview = tablist.getByRole('tab', { name: '概要' });
  const specs = tablist.getByRole('tab', { name: '仕様' });

  await expect(overview).toHaveAttribute('data-active', '');

  await specs.click();
  await expect(specs).toHaveAttribute('data-active', '');
  await expect(specs).toHaveAttribute('aria-selected', 'true');
  await expect(overview).not.toHaveAttribute('data-active', '');

  // ArrowRight moves the roving focus; Enter activates the focused tab.
  const reviews = tablist.getByRole('tab', { name: 'レビュー' });
  await specs.press('ArrowRight');
  await expect(reviews).toBeFocused();
  await reviews.press('Enter');
  await expect(reviews).toHaveAttribute('data-active', '');
});

test('Switch toggles data-checked on click', async ({ page }) => {
  // The second switch in the demo starts unchecked.
  const sw = page.getByRole('switch').nth(1);
  await expect(sw).not.toHaveAttribute('data-checked', '');
  await sw.click();
  await expect(sw).toHaveAttribute('data-checked', '');
  await expect(sw).toHaveAttribute('aria-checked', 'true');
});

test('SegmentedButton moves single selection (data-pressed / aria-pressed)', async ({ page }) => {
  // The first group (日/週/月) defaults to 週.
  const day = page.getByRole('button', { name: '日' });
  const week = page.getByRole('button', { name: '週' });

  await expect(week).toHaveAttribute('aria-pressed', 'true');
  await day.click();
  await expect(day).toHaveAttribute('data-pressed', '');
  await expect(day).toHaveAttribute('aria-pressed', 'true');
  await expect(week).toHaveAttribute('aria-pressed', 'false');
});
