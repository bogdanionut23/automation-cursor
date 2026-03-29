import { Page, expect } from '@playwright/test';
import { doStep } from '../utils/stepHelper';

/**
 * Minimal cart page helper used to check items were added.
 */
export class CartPage {
  constructor(private readonly page: Page) {}

  cartContainer = this.page.locator('.cart_list');
  cartItems = this.cartContainer.locator('.cart_item');

  async verifyItemsPresent(names: string[]) {
    await doStep(this.page, 'Verify cart page and items', async () => {
      await expect(this.page).toHaveURL(/.*cart\.html/);
      await expect(this.cartContainer).toBeVisible();
      for (const name of names) {
        const item = this.cartItems.filter({ hasText: name });
        await expect(item, `Expected to find item "${name}" in cart`).toBeVisible();
      }
    });
  }
}


