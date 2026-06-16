import { test, expect } from '@playwright/test';

test('verify all 5 new sections are present and correct', async ({ page }) => {
  await page.goto('http://localhost:3000/king-county-income-5000-2-children');

  // Section 1: Filing
  await expect(page.locator('h3:has-text("Filing in King County Superior Court")')).toBeVisible();

  // Section 2: Income Bracket
  await expect(page.locator('h3:has-text("Income Bracket Context")')).toBeVisible();

  // Section 3: Deviation Likelihood
  await expect(page.locator('h3:has-text("Deviation Likelihood in King County")')).toBeVisible();

  // Section 4: Children-Specific Insight
  await expect(page.locator('h3:has-text("Children-Specific Insight")')).toBeVisible();

  // Section 5: Related Income Tiers
  await expect(page.locator('h3:has-text("Related Income Tiers")')).toBeVisible();

  await page.screenshot({ path: 'verification_full.png', fullPage: true });
});
