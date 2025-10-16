import { test as base, expect } from "@playwright/test";
import withVisualTestPluginFixture from "@buddy-works/visual-tests-playwright";

// Add fixture with plugin
const test = withVisualTestPluginFixture(base);

test.describe('About Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the about page
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    // Wait a bit for animations to settle
    await page.waitForTimeout(500);
  });

  test('about-page-full-view', async ({ page, visualTestPlugin }) => {
    // Verify the page header with unicorn emoji is visible
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1.rainbow-text').first()).toContainText('Magical Todo App');
    
    // Verify about page specific content
    await expect(page.locator('.hero-section')).toBeVisible();
    await expect(page.locator('h1').filter({ hasText: 'About Our Magical App' })).toBeVisible();
    
    // Take screenshot with BDY CLI
    await visualTestPlugin.takeSnap(page, "about-page-full-view");
    
    // Verify main sections are present
    await expect(page.locator('[data-testid="feature-card"]')).toHaveCount(6);
    await expect(page.locator('[data-testid="tech-badge"]')).toHaveCount(4);
  });

  test('about-page-navigation', async ({ page, visualTestPlugin }) => {
    // Verify navigation elements (with emojis)
    await expect(page.locator('nav a', { hasText: 'Home' })).toBeVisible();
    await expect(page.locator('nav a', { hasText: 'About' })).toBeVisible();
    
    // Take screenshot of the page with active navigation
    await visualTestPlugin.takeSnap(page, "about-page-navigation");
    
    // Test CTA button
    const ctaButton = page.locator('[data-testid="cta-button"]');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Get Started Now');
  });

  test('about-page-features', async ({ page, visualTestPlugin }) => {
    // Wait for feature cards to be visible
    await expect(page.locator('[data-testid="feature-card"]').first()).toBeVisible();
    
    // Verify all feature cards are visible
    const featureCards = page.locator('[data-testid="feature-card"]');
    await expect(featureCards).toHaveCount(6);
    
    // Scroll to features section
    await featureCards.first().scrollIntoViewIfNeeded();
    
    // Take screenshot of features section
    await visualTestPlugin.takeSnap(page, "about-page-features");
    
    // Verify feature card content
    await expect(featureCards.first()).toContainText('Rainbow Design');
  });

  test('about-page-tech-stack', async ({ page, visualTestPlugin }) => {
    // Wait for tech badges to be visible
    await expect(page.locator('[data-testid="tech-badge"]').first()).toBeVisible();
    
    // Scroll to tech section
    await page.locator('[data-testid="tech-badge"]').first().scrollIntoViewIfNeeded();
    
    // Verify tech badges
    const techBadges = page.locator('[data-testid="tech-badge"]');
    await expect(techBadges).toHaveCount(4);
    
    // Take screenshot of tech stack section
    await visualTestPlugin.takeSnap(page, "about-page-tech-stack");
    
    // Verify tech stack items contain the right text
    await expect(page.locator('text=Vue 3')).toBeVisible();
    await expect(page.locator('text=Tailwind CSS')).toBeVisible();
    await expect(page.locator('text=TypeScript')).toBeVisible();
    await expect(page.locator('text=Vite')).toBeVisible();
  });

  test('about-page-cta-interaction', async ({ page, visualTestPlugin }) => {
    // Wait for CTA button to be visible
    await expect(page.locator('[data-testid="cta-button"]')).toBeVisible();
    
    // Scroll to CTA section
    await page.locator('[data-testid="cta-button"]').scrollIntoViewIfNeeded();
    
    // Take screenshot before interaction
    await visualTestPlugin.takeSnap(page, "about-page-cta-before");
    
    // Click CTA button and verify navigation
    await page.locator('[data-testid="cta-button"]').click();
    await page.waitForURL('/');
    
    // Verify we're on home page
    await expect(page.locator('input[placeholder="What needs to be done?"]')).toBeVisible();
    
    // Take screenshot of home page after navigation
    await visualTestPlugin.takeSnap(page, "about-page-cta-after-navigation");
  });

  test('about-page-dark-mode', async ({ page, visualTestPlugin }) => {
    // Wait for page to be ready
    await expect(page.locator('button[data-testid="dark-mode-toggle"]')).toBeVisible();
    
    // Take screenshot in light mode
    await visualTestPlugin.takeSnap(page, "about-page-light-mode");
    
    // Toggle dark mode
    await page.click('button[data-testid="dark-mode-toggle"]');
    await page.waitForTimeout(300); // Wait for transition
    
    // Verify dark mode is applied
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);
    
    // Take screenshot in dark mode
    await visualTestPlugin.takeSnap(page, "about-page-dark-mode");
  });

  test('about-page-responsive-mobile', async ({ page, visualTestPlugin }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Reload page for mobile view
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    
    // Wait for layout adjustment
    await page.waitForTimeout(500);
    
    // Take screenshot in mobile view
    await visualTestPlugin.takeSnap(page, "about-page-mobile-view");
    
    // Verify page is still functional
    await expect(page.locator('h1').filter({ hasText: 'About Our Magical App' })).toBeVisible();
    await expect(page.locator('[data-testid="feature-card"]')).toHaveCount(6);
  });

  test('about-page-with-animations', async ({ page, visualTestPlugin }) => {
    // Wait for initial animations to settle
    await page.waitForTimeout(1000);
    
    // Take screenshot with animations
    await visualTestPlugin.takeSnap(page, "about-page-with-animations");
    
    // Verify unicorn emoji is present
    await expect(page.locator('.hero-section').filter({ hasText: '🦄' })).toBeVisible();
    
    // Verify rainbow text elements are present
    await expect(page.locator('.rainbow-text').first()).toBeVisible();
  });
});

