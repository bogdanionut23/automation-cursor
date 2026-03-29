import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
// Why: Importing our external data allows us to scale without changing code
import users from '../data/users.json';

const validUsers = users.filter((u) => u.canLogin);

// Why: The 'for' loop creates a unique test for every entry in your JSON
for (const user of validUsers) {
  test(`Login validation for: ${user.description}`, async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();

    await login.fillUsername(user.username);
    await login.fillPassword(user.password);
    await login.clickLogin();

    await expect(page).toHaveURL(/inventory.html/);
  });
}