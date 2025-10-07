import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the todo app', async ({ page }) => {
    // Check that the main todo input is visible
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
    
    // Check that stats cards are visible (use more specific selectors)
    await expect(page.locator('text=Total')).toBeVisible();
    await expect(page.locator('.grid .cursor-pointer').nth(1).locator('text=Pending')).toBeVisible();
    await expect(page.locator('.grid .cursor-pointer').nth(2).locator('text=Completed')).toBeVisible();
    await expect(page.locator('.grid .cursor-pointer').nth(3).locator('text=High Priority')).toBeVisible();
  });

  test('should add a new todo', async ({ page }) => {
    // Check initial state - no todos
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(0);
    
    // Add a new todo
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Test todo');
    await input.press('Enter');
    
    // Check that todo was added
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="todo-item"]')).toContainText('Test todo');
  });

  test('should not add todo with empty text', async ({ page }) => {
    // Try to add empty todo
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('');
    await input.press('Enter');
    
    // Check that no todo was added
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(0);
  });

  test('should toggle todo completion', async ({ page }) => {
    // Add a todo first
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Toggle test todo');
    await input.press('Enter');
    
    // Check initial state - not completed
    const todoItem = page.locator('[data-testid="todo-item"]').first();
    await expect(todoItem).not.toHaveClass(/completed/);
    
    // Click on the checkbox to toggle completion
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();
    
    // Check that it's now completed (has completed class)
    await expect(todoItem).toHaveClass(/completed/);
  });

  test('should delete a todo', async ({ page }) => {
    // Add a todo first
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Delete test todo');
    await input.press('Enter');
    
    // Check todo exists
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);
    
    // Hover over the todo item to show the delete button
    const todoItem = page.locator('[data-testid="todo-item"]').first();
    await todoItem.hover();
    
    // Click delete button
    const deleteButton = todoItem.locator('[data-testid="delete-button"]');
    await deleteButton.click();
    
    // Check todo was deleted
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(0);
  });

  test('should change todo priority', async ({ page }) => {
    // Add a todo first
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Priority test todo');
    await input.press('Enter');
    
    const todoItem = page.locator('[data-testid="todo-item"]').first();
    
    // Click on the priority dot to open dropdown
    const priorityButton = todoItem.locator('.priority-dropdown button');
    await priorityButton.click();
    
    // Click high priority option
    const highPriorityOption = todoItem.locator('.priority-dropdown .absolute button:has-text("High")');
    await highPriorityOption.click();
    
    // Check that priority changed (high priority has red dot)
    const priorityDot = todoItem.locator('.priority-dropdown button span');
    await expect(priorityDot).toHaveClass(/bg-red-500/);
  });

  test('should filter todos by priority', async ({ page }) => {
    // Add todos with different priorities
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    // Add first todo (default medium priority)
    await input.fill('Medium priority todo');
    await input.press('Enter');
    
    // Add second todo and change to high priority
    await input.fill('High priority todo');
    await input.press('Enter');
    
    // Change second todo to high priority
    const secondTodo = page.locator('[data-testid="todo-item"]').nth(1);
    const priorityButton = secondTodo.locator('.priority-dropdown button');
    await priorityButton.click();
    const highPriorityOption = secondTodo.locator('.priority-dropdown .absolute button:has-text("High")');
    await highPriorityOption.click();
    
    // Filter by high priority using the filter dropdown
    const priorityFilter = page.locator('select').first(); // First select is priority filter
    await priorityFilter.selectOption('high');
    
    // Check only high priority todo is visible
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="todo-item"]')).toContainText('High priority todo');
  });

  test('should search todos', async ({ page }) => {
    // Add multiple todos
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    await input.fill('Shopping list');
    await input.press('Enter');
    
    await input.fill('Work meeting');
    await input.press('Enter');
    
    // Search for "shopping"
    const searchInput = page.locator('input[placeholder="Search todos..."]');
    await searchInput.fill('shopping');
    
    // Check only matching todo is visible
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="todo-item"]')).toContainText('Shopping list');
  });

  test('should edit todo text', async ({ page }) => {
    // Add a todo first
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill('Original text');
    await input.press('Enter');
    
    const todoItem = page.locator('[data-testid="todo-item"]').first();
    
    // Click on the todo text to edit (use more specific selector)
    const todoText = todoItem.locator('div.flex-1 .text-sm.font-medium');
    await todoText.click();
    
    // Wait for edit mode to activate
    await page.waitForTimeout(100);
    
    // Edit the text (use the edit input that appears)
    const editInput = todoItem.locator('input').last(); // Last input is the edit input
    await editInput.fill('Updated text');
    await editInput.press('Enter');
    
    // Check that text was updated
    await expect(todoItem).toContainText('Updated text');
    await expect(todoItem).not.toContainText('Original text');
  });
});
