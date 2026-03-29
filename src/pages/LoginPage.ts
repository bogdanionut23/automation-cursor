import { Page, expect } from '@playwright/test';
import { doStep } from '../utils/stepHelper';

/**
 * Very small and readable Page Object for the Sauce Demo login page.
 * Only includes what we need for these two tests.
 */
export class LoginPage {
  constructor(private readonly page: Page) {}

  username = this.page.locator('#user-name');
  password = this.page.locator('#password');
  loginButton = this.page.locator('#login-button');
  errorMessage = this.page.locator('[data-test="error"]');

  async goto() {
    await doStep(this.page, 'Open login page', async () => {
      await this.page.goto('/');
      await expect(this.username).toBeVisible();
    });
  }

  async fillUsername(value: string) {
    await doStep(this.page, 'Type username', async () => {
      await this.username.fill(value);
    });
  }

  async fillPassword(value: string) {
    await doStep(this.page, 'Type password', async () => {
      await this.password.fill(value);
    });
  }

  async clickLogin() {
    await doStep(this.page, 'Click Login', async () => {
      await this.loginButton.click();
    });
  }
}







