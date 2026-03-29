import { defineConfig, devices } from '@playwright/test';
import base from './playwright.config';

/**
 * Multi-browser projects for Sauce Labs (saucectl). Local development keeps using playwright.config.ts (Chromium only).
 */
export default defineConfig({
  ...base,
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
