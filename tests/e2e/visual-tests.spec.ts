import { test as base, expect } from "@playwright/test";
import withVisualTestPluginFixture from "@buddy-works/visual-tests-playwright";

// Add fixture with plugin
const test = withVisualTestPluginFixture(base);

// Static test data for consistent screenshots
const testTodos = [
  { text: "Buy groceries", priority: "high", completed: false },
  { text: "Walk the dog", priority: "medium", completed: true },
  { text: "Read a book", priority: "low", completed: false },
  { text: "Call mom", priority: "high", completed: false },
  { text: "Finish project", priority: "medium", completed: true }
];

const longTextTodo = "This is a very long todo item that should test how the application handles longer text content and whether it displays properly without breaking the layout or causing any issues with the user interface";

const specialCharsTodo = "Todo with special chars: !@#$%^&*()_+-=[]{}|;:,.<>? and emojis 🚀 ✅ 🎉 💻";

test.describe('Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('home-welcome-empty', async ({ page, visualTestPlugin }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await visualTestPlugin.takeSnap(page, "home-welcome-empty");
    
    // Verify functionality - check for todo app elements
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
  });

  test('about-page', async ({ page, visualTestPlugin }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await visualTestPlugin.takeSnap(page, "about-page");
    
    // Verify functionality - check for todo app elements (since router is not used)
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
  });

  test('list-empty', async ({ page, visualTestPlugin }) => {
    // Navigate to todo app (which is the main app)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for the todo app to be visible
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
    
    // Take screenshot
    await visualTestPlugin.takeSnap(page, "list-empty");
    
    // Verify functionality
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(0);
  });

  test('list-todos', async ({ page, visualTestPlugin }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Add multiple todos
    const input = page.locator('input[placeholder="What needs to be done?"]');
    for (const todo of testTodos) {
      await input.fill(todo.text);
      await input.press('Enter');
      if (todo.priority !== 'medium') {
        const todoItem = page.locator('[data-testid="todo-item"]').filter({ hasText: todo.text });
        await todoItem.locator('.priority-dropdown button').click();
        await todoItem.locator(`.priority-dropdown .absolute button:has-text("${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}")`).click();
      }
      if (todo.completed) {
        const todoItem = page.locator('[data-testid="todo-item"]').filter({ hasText: todo.text });
        await todoItem.locator('input[type="checkbox"]').click();
      }
    }
    
    // Wait for all todos to be added
    await page.waitForSelector('[data-testid="todo-item"]');
    
    // Take screenshot
    await visualTestPlugin.takeSnap(page, "list-todos");
    
    // Verify functionality
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(testTodos.length);
  });

  test('list-filter-pending', async ({ page, visualTestPlugin }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Add multiple todos
    const input = page.locator('input[placeholder="What needs to be done?"]');
    for (const todo of testTodos) {
      await input.fill(todo.text);
      await input.press('Enter');
      if (todo.completed) {
        const todoItem = page.locator('[data-testid="todo-item"]').filter({ hasText: todo.text });
        await todoItem.locator('input[type="checkbox"]').click();
      }
    }
    
    // Filter to show only pending todos
    const statusFilter = page.locator('select').nth(1); // Second select is status filter
    await statusFilter.selectOption('incomplete');
    
    // Wait for filter to apply
    await page.waitForTimeout(100);
    
    // Take screenshot
    await visualTestPlugin.takeSnap(page, "list-filter-pending");
    
    // Verify functionality
    const pendingTodos = testTodos.filter(todo => !todo.completed);
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(pendingTodos.length);
  });

  test('list-search-results', async ({ page, visualTestPlugin }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Add multiple todos
    const input = page.locator('input[placeholder="What needs to be done?"]');
    for (const todo of testTodos) {
      await input.fill(todo.text);
      await input.press('Enter');
    }
    
    // Search for "groceries"
    const searchInput = page.locator('input[placeholder="Search todos..."]');
    await searchInput.fill('groceries');
    
    // Wait for search to apply
    await page.waitForTimeout(100);
    
    // Take screenshot
    await visualTestPlugin.takeSnap(page, "list-search-results");
    
    // Verify functionality
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="todo-item"]')).toContainText('groceries');
  });

  test('list-long-text', async ({ page, visualTestPlugin }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Add long text todo
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill(longTextTodo);
    await input.press('Enter');
    
    // Wait for todo to be added
    await page.waitForSelector('[data-testid="todo-item"]');
    
    // Take screenshot
    await visualTestPlugin.takeSnap(page, "list-long-text");
    
    // Verify functionality
    await expect(page.locator('[data-testid="todo-item"]')).toContainText(longTextTodo);
  });

  test('list-special-characters', async ({ page, visualTestPlugin }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Add special characters todo
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill(specialCharsTodo);
    await input.press('Enter');
    
    // Wait for todo to be added
    await page.waitForSelector('[data-testid="todo-item"]');
    
    // Take screenshot
    await visualTestPlugin.takeSnap(page, "list-special-characters");
    
    // Verify functionality
    await expect(page.locator('[data-testid="todo-item"]')).toContainText(specialCharsTodo);
  });
});