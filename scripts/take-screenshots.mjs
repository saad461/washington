import { chromium, devices } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'screenshots';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function takeScreenshots() {
  // Ensure screenshots directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR);
  }

  const browser = await chromium.launch();

  const scenarios = [
    {
      name: 'home-desktop-empty',
      viewport: { width: 1440, height: 900 },
      populated: false,
    },
    {
      name: 'home-desktop-populated',
      viewport: { width: 1440, height: 900 },
      populated: true,
    },
    {
      name: 'home-mobile-empty',
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      populated: false,
    },
    {
      name: 'home-mobile-populated',
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      populated: true,
    },
  ];

  for (const scenario of scenarios) {
    console.log(`Taking screenshot for: ${scenario.name}`);

    const context = await browser.newContext({
      viewport: scenario.viewport,
      userAgent: scenario.userAgent,
      deviceScaleFactor: scenario.deviceScaleFactor,
      isMobile: scenario.isMobile,
      hasTouch: scenario.hasTouch,
    });
    const page = await context.newPage();

    await page.goto(BASE_URL);
    // Wait for the main content to be loaded
    await page.waitForSelector('h1');

    if (scenario.populated) {
      // Scroll to calculator to ensure it's in view if needed,
      // though for filling it's not strictly necessary in headless
      await page.locator('#calculator').scrollIntoViewIfNeeded();

      // Fill data
      await page.fill('#parent1-income', '5000');
      await page.fill('#parent2-income', '3000');
      await page.selectOption('#children-count', '2');

      // Wait for calculation and animations
      // The calculator has a 400ms debounce + animations
      await page.waitForTimeout(2000);

      // Verify results are visible
      await page.waitForSelector('text=Total Basic Obligation');
    } else {
      // For empty state, just wait a bit for any initial animations
      await page.waitForTimeout(1000);
    }

    const filePath = path.join(SCREENSHOTS_DIR, `${scenario.name}.png`);
    await page.screenshot({ path: filePath, fullPage: true });

    console.log(`Saved to ${filePath}`);
    await context.close();
  }

  await browser.close();
}

takeScreenshots().catch(err => {
  console.error(err);
  process.exit(1);
});
