import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load and display hero section', async ({ page }) => {
    // Check if the hero section loads
    await expect(page.locator('h1')).toContainText('LiteControl Admin');
    
    // Check if the tagline is visible
    await expect(page.locator('text=A fully-typed')).toBeVisible();
    
    // Check if CTA buttons are present
    await expect(page.locator('text=Live Demo')).toBeVisible();
    await expect(page.locator('text=View on GitHub')).toBeVisible();
  });

  test('should navigate to dashboard when clicking Live Demo', async ({ page }) => {
    // Click the Live Demo button
    await page.click('text=Live Demo');
    
    // Should navigate to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display GitHub stars badge', async ({ page }) => {
    // Wait for GitHub stars to load (simulated)
    await page.waitForSelector('text=stars', { timeout: 2000 });
    
    // Check if stars badge is visible
    await expect(page.locator('text=stars')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if hero content is still visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Live Demo')).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/LiteControl Admin/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /fully-typed Next.js 15 admin template/);
  });
}); 