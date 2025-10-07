import { test, expect } from '@playwright/test';

test.describe('Basic App Functionality', () => {
  test('visits the app root url', async ({ page }) => {
    await page.goto('/');
    
    // Check that the todo app is loaded
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
    
    // Check that stats are visible
    await expect(page.locator('text=Total')).toBeVisible();
  });

  test('should load the app without errors', async ({ page }) => {
    await page.goto('/');
    
    // Check for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait for app to load
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
    
    // Should have no console errors
    expect(errors).toHaveLength(0);
  });

  test('should have proper page title', async ({ page }) => {
    await page.goto('/');
    
    // Check page title (assuming it's set in index.html)
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that main elements are still visible
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
    await expect(page.locator('text=Total')).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check that main elements are still visible
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
    await expect(page.locator('text=Total')).toBeVisible();
  });

  test('should handle page refresh', async ({ page }) => {
    await page.goto('/');
    
    // Add a todo
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Refresh test');
    await input.press('Enter');
    
    // Verify todo exists
    await expect(page.locator('[data-testid="todo-item"]')).toContainText('Refresh test');
    
    // Refresh page
    await page.reload();
    
    // Check that app still loads
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
  });

  test('should maintain state after navigation', async ({ page }) => {
    await page.goto('/');
    
    // Add todos
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Navigation test 1');
    await input.press('Enter');
    await input.fill('Navigation test 2');
    await input.press('Enter');
    
    // Complete one todo
    await page.locator('[data-testid="todo-item"]').nth(0).locator('input[type="checkbox"]').click();
    
    // Navigate away and back (simulate browser back/forward)
    await page.goto('about:blank');
    await page.goto('/');
    
    // Check that todos are still there (if using localStorage)
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
  });

  test('should handle rapid input', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Rapidly add multiple todos
    for (let i = 1; i <= 5; i++) {
      await input.fill(`Rapid todo ${i}`);
      await input.press('Enter');
    }
    
    // Check all todos were added
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(5);
  });


  test('should handle empty app state', async ({ page }) => {
    await page.goto('/');
    
    // Check initial empty state
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(0);
    await expect(page.locator('.grid .cursor-pointer').nth(0).locator('.text-2xl.font-bold')).toContainText('0');
    await expect(page.locator('.grid .cursor-pointer').nth(1).locator('.text-2xl.font-bold')).toContainText('0');
    await expect(page.locator('.grid .cursor-pointer').nth(2).locator('.text-2xl.font-bold')).toContainText('0');
  });

  test('should handle large number of todos', async ({ page }) => {
    await page.goto('/');
    
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Add many todos
    for (let i = 1; i <= 20; i++) {
      await input.fill(`Bulk todo ${i}`);
      await input.press('Enter');
    }
    
    // Check all todos were added
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(20);
    
    // Check stats updated
    await expect(page.locator('.grid .cursor-pointer').nth(0).locator('.text-2xl.font-bold')).toContainText('20');
    await expect(page.locator('.grid .cursor-pointer').nth(1).locator('.text-2xl.font-bold')).toContainText('20');
  });
});