import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { dismissCookiesIfPresent } from '../src/utils/stepHelper';

test.describe('End-to-End Cart Flow', () => {
  test('Logs in, adds two items, and sees them in the cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await dismissCookiesIfPresent(page);

    await login.fillUsername('standard_user');
    await login.fillPassword('secret_sauce');
    await login.clickLogin();

    await inventory.verifyOnInventoryPage();
    await inventory.addItemByName('Sauce Labs Backpack');
    await inventory.addItemByName('Sauce Labs Bike Light');
    await inventory.openCart();

    await cart.verifyItemsPresent(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });
});




