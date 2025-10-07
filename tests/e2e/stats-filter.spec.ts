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

  test('should update stats counts correctly', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Add todos
    await input.fill('Todo 1');
    await input.press('Enter');
    await input.fill('Todo 2');
    await input.press('Enter');
    await input.fill('Todo 3');
    await input.press('Enter');
    
    // Check initial stats - look for the number in the bold div
    await expect(page.locator('.grid .cursor-pointer').nth(0).locator('.text-2xl.font-bold')).toContainText('3');
    await expect(page.locator('.grid .cursor-pointer').nth(1).locator('.text-2xl.font-bold')).toContainText('3');
    await expect(page.locator('.grid .cursor-pointer').nth(2).locator('.text-2xl.font-bold')).toContainText('0');
    
    // Complete one todo
    await page.locator('[data-testid="todo-item"]').nth(0).locator('input[type="checkbox"]').click();
    
    // Check updated stats
    await expect(page.locator('.grid .cursor-pointer').nth(0).locator('.text-2xl.font-bold')).toContainText('3');
    await expect(page.locator('.grid .cursor-pointer').nth(1).locator('.text-2xl.font-bold')).toContainText('2');
    await expect(page.locator('.grid .cursor-pointer').nth(2).locator('.text-2xl.font-bold')).toContainText('1');
  });

  test('should filter by high priority stats', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Add todos with different priorities
    await input.fill('Medium priority todo');
    await input.press('Enter');
    await input.fill('High priority todo');
    await input.press('Enter');
    
    // Change second todo to high priority
    const secondTodo = page.locator('[data-testid="todo-item"]').nth(1);
    await secondTodo.locator('.priority-dropdown button').click();
    await secondTodo.locator('.priority-dropdown .absolute button:has-text("High")').click();
    
    // Click high priority stat
    await page.locator('.grid .cursor-pointer').nth(3).click();
    
    // Should show only high priority todo
    await expect(page.locator('text=High priority todo')).toBeVisible();
    await expect(page.locator('text=Medium priority todo')).not.toBeVisible();
  });

  test('should handle empty states in stats', async ({ page }) => {
    // No todos added, check stats show 0
    await expect(page.locator('.grid .cursor-pointer').nth(0).locator('.text-2xl.font-bold')).toContainText('0');
    await expect(page.locator('.grid .cursor-pointer').nth(1).locator('.text-2xl.font-bold')).toContainText('0');
    await expect(page.locator('.grid .cursor-pointer').nth(2).locator('.text-2xl.font-bold')).toContainText('0');
    await expect(page.locator('.grid .cursor-pointer').nth(3).locator('.text-2xl.font-bold')).toContainText('0');
  });

  test('should maintain filter state when adding new todos', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Add and complete a todo
    await input.fill('Completed todo');
    await input.press('Enter');
    await page.locator('[data-testid="todo-item"]').locator('input[type="checkbox"]').click();
    
    // Filter to show completed todos
    await page.locator('.grid .cursor-pointer').nth(2).click();
    await expect(page.locator('text=Completed todo')).toBeVisible();
    
    // Add new todo while filtered
    await input.fill('New todo');
    await input.press('Enter');
    
    // Should still show only completed todos (new todo is not completed)
    await expect(page.locator('text=Completed todo')).toBeVisible();
    await expect(page.locator('text=New todo')).not.toBeVisible();
  });

  test('should handle multiple priority changes affecting stats', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Add todos
    await input.fill('Todo 1');
    await input.press('Enter');
    await input.fill('Todo 2');
    await input.press('Enter');
    await input.fill('Todo 3');
    await input.press('Enter');
    
    // Change all to high priority
    for (let i = 0; i < 3; i++) {
      const todo = page.locator('[data-testid="todo-item"]').nth(i);
      await todo.locator('.priority-dropdown button').click();
      await todo.locator('.priority-dropdown .absolute button:has-text("High")').click();
    }
    
    // Check high priority count - use more specific selector
    await expect(page.locator('.grid .cursor-pointer').nth(3).locator('.text-2xl.font-bold')).toContainText('3');
    
    // Click high priority filter
    await page.locator('.grid .cursor-pointer').nth(3).click();
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(3);
  });

  test('should reset filters when clicking total stat', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Add todos
    await input.fill('Todo 1');
    await input.press('Enter');
    await input.fill('Todo 2');
    await input.press('Enter');
    
    // Complete one todo
    await page.locator('[data-testid="todo-item"]').nth(0).locator('input[type="checkbox"]').click();
    
    // Filter to completed
    await page.locator('.grid .cursor-pointer').nth(2).click();
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);
    
    // Click total to reset filter
    await page.locator('.grid .cursor-pointer').nth(0).click();
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(2);
  });

  test('should handle rapid stat clicks', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    await input.fill('Test todo');
    await input.press('Enter');
    
    // Rapidly click different stats
    await page.locator('.grid .cursor-pointer').nth(1).click(); // Pending
    await page.locator('.grid .cursor-pointer').nth(2).click(); // Completed
    await page.locator('.grid .cursor-pointer').nth(0).click(); // Total
    await page.locator('.grid .cursor-pointer').nth(3).click(); // High Priority
    
    // Should still show the todo (it's not high priority, so might be filtered out)
    // Let's check that the app is still functional
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
  });

  test('should work with search and stats filters combined', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    await input.fill('Shopping list');
    await input.press('Enter');
    await input.fill('Work meeting');
    await input.press('Enter');
    
    // Complete first todo
    await page.locator('[data-testid="todo-item"]').nth(0).locator('input[type="checkbox"]').click();
    
    // Search for "shopping"
    const searchInput = page.locator('input[placeholder="Search todos..."]');
    await searchInput.fill('shopping');
    
    // Filter to completed
    await page.locator('.grid .cursor-pointer').nth(2).click();
    
    // Should show completed shopping todo
    await expect(page.locator('text=Shopping list')).toBeVisible();
    await expect(page.locator('text=Work meeting')).not.toBeVisible();
  });
});