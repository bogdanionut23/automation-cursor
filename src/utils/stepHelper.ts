import { Page, test } from '@playwright/test';

/**
 * A tiny helper that wraps a named step and captures a screenshot after it.
 * This keeps tests simple and ensures the HTML report shows screenshots for each step.
 *
 * Example:
 *   await doStep(page, 'Fill username', async () => {
 *     await page.getByTestId('username').fill('standard_user');
 *   });
 */
export async function doStep(page: Page, name: string, action: () => Promise<void>) {
  await test.step(name, async () => {
    await action();
    const image = await page.screenshot({ fullPage: true });
    await test.info().attach(`screenshot: ${name}`, {
      body: image,
      contentType: 'image/png',
    });
  });
}

/**
 * If a cookie popup appears, try to dismiss it gracefully.
 * This is optional and safe if nothing is found.
 */
export async function dismissCookiesIfPresent(page: Page) {
  const possibleButtons = [
    'button:has-text("Accept")',
    'button:has-text("I agree")',
    'button:has-text("Got it")',
    'text=Accept all',
    'text=Accept',
  ];
  for (const selector of possibleButtons) {
    const el = page.locator(selector);
    if (await el.first().isVisible().catch(() => false)) {
      await doStep(page, 'Dismiss cookies popup', async () => {
        await el.first().click();
      });
      break;
    }
  }
}







