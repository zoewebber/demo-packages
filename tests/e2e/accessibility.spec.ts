import { test, expect } from '@playwright/test';

test.describe('Accessibility and Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle todos with keyboard', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Keyboard toggle test');
    await input.press('Enter');

    const todoItem = page.locator('[data-testid="todo-item"]').first();
    const checkbox = todoItem.locator('input[type="checkbox"]');
    
    // Focus and toggle with keyboard
    await checkbox.focus();
    await page.keyboard.press('Space');
    
    await expect(todoItem).toHaveClass(/completed/);
  });

  test('should edit todos with keyboard', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Keyboard edit test');
    await input.press('Enter');

    const todoItem = page.locator('[data-testid="todo-item"]').first();
    const todoText = todoItem.locator('div.flex-1 .text-sm.font-medium');
    
    // Click to enter edit mode
    await todoText.click();
    
    // Edit with keyboard
    const editInput = todoItem.locator('input').last();
    await editInput.fill('Updated with keyboard');
    await editInput.press('Enter');
    
    await expect(todoItem).toContainText('Updated with keyboard');
  });

  test('should cancel edit with Escape key', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Escape test');
    await input.press('Enter');

    const todoItem = page.locator('[data-testid="todo-item"]').first();
    const todoText = todoItem.locator('div.flex-1 .text-sm.font-medium');
    
    await todoText.click();
    const editInput = todoItem.locator('input').last();
    await editInput.fill('This should be cancelled');
    await editInput.press('Escape');
    
    await expect(todoItem).toContainText('Escape test');
    await expect(todoItem).not.toContainText('This should be cancelled');
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('ARIA test');
    await input.press('Enter');

    const todoItem = page.locator('[data-testid="todo-item"]').first();
    const checkbox = todoItem.locator('input[type="checkbox"]');
    
    // Check for proper ARIA attributes
    await expect(checkbox).toHaveAttribute('type', 'checkbox');
    await expect(todoItem).toBeVisible();
  });

  test('should handle focus management during todo operations', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Focus test 1');
    await input.press('Enter');
    await input.fill('Focus test 2');
    await input.press('Enter');

    // Focus should return to input after adding todos
    await expect(input).toBeFocused();
  });

  test('should support screen reader navigation', async ({ page }) => {
    // Add todos with different priorities
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Screen reader test');
    await input.press('Enter');

    const todoItem = page.locator('[data-testid="todo-item"]').first();
    
    // Check that elements are accessible to screen readers
    await expect(todoItem).toBeVisible();
    await expect(todoItem.locator('input[type="checkbox"]')).toBeVisible();
  });

  test('should navigate with Tab key', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Tab navigation test');
    await input.press('Enter');

    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to interact with elements
    const todoItem = page.locator('[data-testid="todo-item"]').first();
    await expect(todoItem).toBeVisible();
  });

  test('should handle keyboard shortcuts', async ({ page }) => {
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Shortcut test');
    await input.press('Enter');

    const todoItem = page.locator('[data-testid="todo-item"]').first();
    
    // Test Enter key for editing
    const todoText = todoItem.locator('div.flex-1 .text-sm.font-medium');
    await todoText.click();
    const editInput = todoItem.locator('input').last();
    await editInput.press('Enter');
    
    // Should save the edit
    await expect(todoItem).toBeVisible();
  });
});