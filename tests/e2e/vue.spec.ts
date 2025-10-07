import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  
  // Check that the todo app is loaded
  await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
  
  // Check that stats are visible
  await expect(page.locator('text=Total')).toBeVisible();
})
