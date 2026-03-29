import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  // Run tests one by one by default to keep things clear for beginners
  workers: 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'off',
    screenshot: 'only-on-failure', // we attach our own step screenshots manually
    video: 'off',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});







