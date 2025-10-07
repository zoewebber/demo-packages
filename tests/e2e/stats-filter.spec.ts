import { test, expect } from '@playwright/test';

test.describe('Stats Filter Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should filter todos when clicking stats cards', async ({ page }) => {
    // Add some test todos with different states
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Add incomplete todo
    await input.fill('Incomplete todo');
    await input.press('Enter');
    
    // Add completed todo
    await input.fill('Completed todo');
    await input.press('Enter');
    await page.locator('[data-testid="todo-item"]').nth(1).locator('input[type="checkbox"]').click();

    // Wait for todos to appear (should be 2 actual todos)
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(2);

    // Test clicking "Pending" stat (shows incomplete todos, all priorities)
    await page.locator('.grid .cursor-pointer').nth(1).click();
    
    // Should show incomplete todos
    await expect(page.locator('text=Incomplete todo')).toBeVisible();
    await expect(page.locator('text=Completed todo')).not.toBeVisible();

    // Test clicking "Completed" stat
    await page.locator('.grid .cursor-pointer').nth(2).click();
    
    // Should show only completed todos
    await expect(page.locator('text=Completed todo')).toBeVisible();
    await expect(page.locator('text=Incomplete todo')).not.toBeVisible();

    // Test clicking "Total" stat
    await page.locator('.grid .cursor-pointer').nth(0).click();
    
    // Should show all todos
    await expect(page.locator('text=Incomplete todo')).toBeVisible();
    await expect(page.locator('text=Completed todo')).toBeVisible();
  });

  test('should show hover effects on stats cards', async ({ page }) => {
    // Check that cards have cursor pointer class
    const statsCards = page.locator('.grid .cursor-pointer');
    await expect(statsCards).toHaveCount(4);
    
    // Check each card has the cursor-pointer class
    for (let i = 0; i < 4; i++) {
      await expect(statsCards.nth(i)).toHaveClass(/cursor-pointer/);
    }
  });
});
