import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 * 
 * Note: Only Chromium is configured for faster test execution.
 * Firefox and WebKit are excluded as they're not needed for this project.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Maximum time one test can run for - reduced for faster feedback */
  timeout: 10 * 1000, // 10 seconds instead of 30
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 1000, // 1 seconds instead of 5
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1, // Small retry for both local and CI
  /* Opt out of parallel tests on CI. */
  workers: undefined, // Let Playwright decide
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take - reduced for faster feedback */
    actionTimeout: 500, // 0.5 seconds instead of 0 (no limit)
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5174',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Run tests headless for all executions */
    headless: true,
  },

  /* Configure projects for major browsers - Chromium only */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  webServer: {
    /**
     * Use the dev server by default for faster feedback loop.
     * Use the preview server on CI for more realistic testing.
     * Playwright will re-use the local server if there is already a dev-server running.
     */
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: false, // Always fresh start
    timeout: 15 * 1000, // 15 seconds for server startup
  },
})