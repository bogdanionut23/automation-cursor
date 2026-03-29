import { Page, expect } from '@playwright/test';
import { doStep } from '../utils/stepHelper';

/**
 * Small helper for the inventory (products) page.
 * Lets us add items to cart and navigate to the cart.
 */
export class InventoryPage {
  constructor(private readonly page: Page) {}

  inventoryContainer = this.page.locator('.inventory_container');
  cartLink = this.page.locator('.shopping_cart_link');

  async verifyOnInventoryPage() {
    await doStep(this.page, 'Confirm inventory page is visible', async () => {
      await expect(this.page).toHaveURL(/.*inventory\.html/);
      await expect(this.inventoryContainer).toBeVisible();
    });
  }

  async addItemByName(name: string) {
    await doStep(this.page, `Add item: ${name}`, async () => {
      // Find card containing the item name, then click its Add to cart button.
      const itemCard = this.page.locator('.inventory_item').filter({ hasText: name });
      await expect(itemCard).toBeVisible();
      await itemCard.locator('button:has-text("Add to cart")').click();
    });
  }

  async openCart() {
    await doStep(this.page, 'Open cart page', async () => {
      await this.cartLink.click();
    });
  }
}



