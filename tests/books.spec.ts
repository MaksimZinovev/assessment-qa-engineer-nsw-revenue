import { test, expect } from '@playwright/test';

// Demonstrate navigating and asserting various records and elements from the response body Json array.
test('', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});



