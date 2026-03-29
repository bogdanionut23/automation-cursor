import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { dismissCookiesIfPresent, doStep } from '../src/utils/stepHelper';
import users from '../data/users.json';

const WRONG_PASSWORD = 'wrong_password';

/** Same set as `valid-login.spec.ts`: accounts that reach inventory with correct credentials. */
const validUsers = users.filter((u) => u.canLogin);

type JsonInvalidUser = (typeof users)[number] & {
  canLogin: false;
  expectedInvalidError: 'locked_out' | 'credentials_mismatch';
};

const jsonInvalidUsers = users.filter(
  (u): u is JsonInvalidUser =>
    u.canLogin === false && 'expectedInvalidError' in u && u.expectedInvalidError !== undefined
);

async function expectCredentialsMismatch(login: LoginPage) {
  await expect(login.errorMessage).toBeVisible();
  await expect(login.errorMessage).toContainText(
    /Epic sadface|Username and password do not match/i
  );
}

for (const user of validUsers) {
  test(`Should reject wrong password for: ${user.description}`, async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await dismissCookiesIfPresent(page);

    await login.fillUsername(user.username);
    await login.fillPassword(WRONG_PASSWORD);
    await login.clickLogin();

    await doStep(page, 'Check error message', async () => {
      await expectCredentialsMismatch(login);
    });
  });
}

for (const user of jsonInvalidUsers) {
  test(`Should show an error for: ${user.description}`, async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await dismissCookiesIfPresent(page);

    await login.fillUsername(user.username);
    await login.fillPassword(user.password);
    await login.clickLogin();

    await doStep(page, 'Check error message', async () => {
      await expect(login.errorMessage).toBeVisible();
      if (user.expectedInvalidError === 'locked_out') {
        await expect(login.errorMessage).toContainText(/locked out/i);
      } else {
        await expectCredentialsMismatch(login);
      }
    });
  });
}
