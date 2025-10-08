import { test as base, expect } from "@playwright/test";
import withVisualTestPluginFixture from "@buddy-works/playwright";

// Use regular test if visual tests are disabled, otherwise use visual test plugin
const test = process.env.DISABLE_VISUAL_TESTS === 'true' 
  ? base 
  : withVisualTestPluginFixture(base);

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

  test('home-welcome-empty', async ({ page }: any) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Only take screenshot if visual tests are enabled
    if (process.env.DISABLE_VISUAL_TESTS !== 'true') {
      const visualTestPlugin = (page as any).visualTestPlugin;
      if (visualTestPlugin) {
        await visualTestPlugin.takeSnap(page, "home-welcome-empty");
      }
    }
  });

  test('about-page', async ({ page }: any) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    
    // Only take screenshot if visual tests are enabled
    if (process.env.DISABLE_VISUAL_TESTS !== 'true') {
      const visualTestPlugin = (page as any).visualTestPlugin;
      if (visualTestPlugin) {
        await visualTestPlugin.takeSnap(page, "about-page");
      }
    }
  });

  test('list-empty', async ({ page }: any) => {
    // Navigate to todo app (which is the main app)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for the todo app to be visible
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
    
    // Only take screenshot if visual tests are enabled
    if (process.env.DISABLE_VISUAL_TESTS !== 'true') {
      const visualTestPlugin = (page as any).visualTestPlugin;
      if (visualTestPlugin) {
        await visualTestPlugin.takeSnap(page, "list-empty");
      }
    }
  });

  test('list-todos', async ({ page }: any) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for the todo app to be visible
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
    
    // Add test todos
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    for (const todo of testTodos) {
      await input.fill(todo.text);
      await input.press('Enter');
      
      // If todo should be completed, click the checkbox
      if (todo.completed) {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('input[type="checkbox"]').click();
      }
      
      // If todo has high priority, change it
      if (todo.priority === 'high') {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('.priority-dropdown button').click();
        await todoItem.locator('.priority-dropdown .absolute button:has-text("High")').click();
      }
      
      // If todo has low priority, change it
      if (todo.priority === 'low') {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('.priority-dropdown button').click();
        await todoItem.locator('.priority-dropdown .absolute button:has-text("Low")').click();
      }
    }
    
    // Wait for all todos to be added
    await page.waitForSelector('[data-testid="todo-item"]');
    
    // Only take screenshot if visual tests are enabled
    if (process.env.DISABLE_VISUAL_TESTS !== 'true') {
      const visualTestPlugin = (page as any).visualTestPlugin;
      if (visualTestPlugin) {
        await visualTestPlugin.takeSnap(page, "list-todos");
      }
    }
  });

  test('list-filter-pending', async ({ page }: any) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for the todo app to be visible
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
    
    // Add test todos
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    for (const todo of testTodos) {
      await input.fill(todo.text);
      await input.press('Enter');
      
      // If todo should be completed, click the checkbox
      if (todo.completed) {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('input[type="checkbox"]').click();
      }
      
      // If todo has high priority, change it
      if (todo.priority === 'high') {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('.priority-dropdown button').click();
        await todoItem.locator('.priority-dropdown .absolute button:has-text("High")').click();
      }
      
      // If todo has low priority, change it
      if (todo.priority === 'low') {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('.priority-dropdown button').click();
        await todoItem.locator('.priority-dropdown .absolute button:has-text("Low")').click();
      }
    }
    
    // Wait for all todos to be added
    await page.waitForSelector('[data-testid="todo-item"]');
    
    // Filter to show only pending todos
    const statusFilter = page.locator('select').nth(1); // Second select is status filter
    await statusFilter.selectOption('incomplete');
    
    // Wait for filter to apply
    await page.waitForTimeout(100);
    
    // Only take screenshot if visual tests are enabled
    if (process.env.DISABLE_VISUAL_TESTS !== 'true') {
      const visualTestPlugin = (page as any).visualTestPlugin;
      if (visualTestPlugin) {
        await visualTestPlugin.takeSnap(page, "list-filter-pending");
      }
    }
  });

  test('list-search-results', async ({ page }: any) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for the todo app to be visible
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
    
    // Add test todos
    const input = page.locator('input[placeholder="What needs to be done?"]');
    
    for (const todo of testTodos) {
      await input.fill(todo.text);
      await input.press('Enter');
      
      // If todo should be completed, click the checkbox
      if (todo.completed) {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('input[type="checkbox"]').click();
      }
      
      // If todo has high priority, change it
      if (todo.priority === 'high') {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('.priority-dropdown button').click();
        await todoItem.locator('.priority-dropdown .absolute button:has-text("High")').click();
      }
      
      // If todo has low priority, change it
      if (todo.priority === 'low') {
        const todoItem = page.locator('[data-testid="todo-item"]').last();
        await todoItem.locator('.priority-dropdown button').click();
        await todoItem.locator('.priority-dropdown .absolute button:has-text("Low")').click();
      }
    }
    
    // Wait for all todos to be added
    await page.waitForSelector('[data-testid="todo-item"]');
    
    // Search for "groceries"
    const searchInput = page.locator('input[placeholder="Search todos..."]');
    await searchInput.fill('groceries');
    
    // Wait for search to apply
    await page.waitForTimeout(100);
    
    // Only take screenshot if visual tests are enabled
    if (process.env.DISABLE_VISUAL_TESTS !== 'true') {
      const visualTestPlugin = (page as any).visualTestPlugin;
      if (visualTestPlugin) {
        await visualTestPlugin.takeSnap(page, "list-search-results");
      }
    }
  });

  test('list-long-text', async ({ page }: any) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for the todo app to be visible
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
    
    // Add long text todo
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill(longTextTodo);
    await input.press('Enter');
    
    // Wait for todo to be added
    await page.waitForSelector('[data-testid="todo-item"]');
    
    // Only take screenshot if visual tests are enabled
    if (process.env.DISABLE_VISUAL_TESTS !== 'true') {
      const visualTestPlugin = (page as any).visualTestPlugin;
      if (visualTestPlugin) {
        await visualTestPlugin.takeSnap(page, "list-long-text");
      }
    }
  });

  test('list-special-characters', async ({ page }: any) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for the todo app to be visible
    await page.waitForSelector('input[placeholder="What needs to be done?"]');
    
    // Add special characters todo
    const input = page.locator('input[placeholder="What needs to be done?"]');
    await input.fill(specialCharsTodo);
    await input.press('Enter');
    
    // Wait for todo to be added
    await page.waitForSelector('[data-testid="todo-item"]');
    
    // Only take screenshot if visual tests are enabled
    if (process.env.DISABLE_VISUAL_TESTS !== 'true') {
      const visualTestPlugin = (page as any).visualTestPlugin;
      if (visualTestPlugin) {
        await visualTestPlugin.takeSnap(page, "list-special-characters");
      }
    }
  });
});