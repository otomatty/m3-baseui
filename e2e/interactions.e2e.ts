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

test('FAB menu opens (data-popup-open) and navigates actions via keyboard', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'FAB メニュー' });
  await trigger.click();

  await expect(trigger).toHaveAttribute('data-popup-open', '');
  const menu = page.getByRole('menu').first();
  await expect(menu).toBeVisible();

  // ArrowDown highlights the first action (Base UI data-highlighted).
  await page.keyboard.press('ArrowDown');
  await expect(menu.getByRole('menuitem', { name: /ドキュメント/ })).toHaveAttribute(
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

test('Tooltip shows on hover/focus', async ({ page }) => {
  const trigger = page.getByRole('button', { name: '情報' });
  // Hover covers the pointer path; focus is the deterministic trigger (a single
  // teleporting hover() is unreliable in headless CI). Base UI opens on either.
  await trigger.hover();
  await trigger.focus();
  // Base UI's tooltip popup carries no role="tooltip"; assert on its text.
  await expect(page.getByText('説明的なツールチップ')).toBeVisible({ timeout: 10_000 });
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

test('Checkbox exposes a ≥48dp touch target centered on the 18dp box (M3 a11y)', async ({
  page,
}) => {
  // happy-dom has no layout engine, so the unit tests can only assert the inline
  // style; here we verify the real rendered geometry in a browser (both engines).
  const checkbox = page.getByRole('checkbox').first();
  const box = await checkbox.boundingBox();
  const touch = await checkbox.locator('[data-touch-target]').boundingBox();
  if (!box || !touch) throw new Error('missing bounding boxes');

  // The hit area is at least 48dp in both dimensions…
  expect(touch.width).toBeGreaterThanOrEqual(48);
  expect(touch.height).toBeGreaterThanOrEqual(48);
  // …and stays centered on the visual box (so it overflows symmetrically).
  const boxCenter = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  const touchCenter = { x: touch.x + touch.width / 2, y: touch.y + touch.height / 2 };
  expect(Math.abs(touchCenter.x - boxCenter.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(touchCenter.y - boxCenter.y)).toBeLessThanOrEqual(1);
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

test('SplitButton trailing trigger opens its menu (data-popup-open)', async ({ page }) => {
  // The demo renders one split button per variant; drive the first trailing trigger.
  const trigger = page.getByRole('button', { name: 'その他の保存オプション' }).first();
  await trigger.click();

  await expect(trigger).toHaveAttribute('data-popup-open', '');
  const menu = page.getByRole('menu').first();
  await expect(menu).toBeVisible();
  await expect(menu.getByRole('menuitem', { name: /下書き保存/ })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).not.toHaveAttribute('data-popup-open', '');
});

test('BottomSheet opens (data-swipe-direction=down), closes on Escape', async ({ page }) => {
  await page.getByRole('button', { name: 'ボトムシート' }).click();

  const sheet = page.getByRole('dialog');
  await expect(sheet).toBeVisible();
  await expect(sheet).toHaveAttribute('data-swipe-direction', 'down');
  await expect(sheet.getByText('共有先を選択')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
});

test('SideSheet opens (data-swipe-direction=right), closes via close button', async ({ page }) => {
  await page.getByRole('button', { name: 'サイドシート' }).click();

  const sheet = page.getByRole('dialog');
  await expect(sheet).toBeVisible();
  await expect(sheet).toHaveAttribute('data-swipe-direction', 'right');
  await expect(sheet.getByText('フィルター')).toBeVisible();

  await sheet.getByRole('button', { name: '閉じる' }).click();
  await expect(sheet).toBeHidden();
});
