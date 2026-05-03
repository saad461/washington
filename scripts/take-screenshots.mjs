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
    {
      name: 'worksheet-desktop-empty',
      viewport: { width: 1440, height: 900 },
      url: '/worksheet',
      populated: false,
    },
    {
      name: 'worksheet-mobile-empty',
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      url: '/worksheet',
      populated: false,
    },
    {
      name: 'worksheet-summary-desktop',
      viewport: { width: 1440, height: 900 },
      url: '/worksheet',
      populated: 'summary',
    }
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

    await page.goto(scenario.url ? `${BASE_URL}${scenario.url}` : BASE_URL);
    // Wait for the main content to be loaded
    await page.waitForSelector('h1');

    if (scenario.populated === true) {
      if (scenario.url === '/worksheet') {
         // Worksheet population logic (Part 1)
         await page.fill('input[placeholder="0.00"] >> nth=0', '5000');
         await page.fill('input[placeholder="0.00"] >> nth=1', '3000');
         await page.waitForTimeout(1000);
      } else {
        // Home page calculator population
        await page.locator('#calculator').scrollIntoViewIfNeeded();
        await page.fill('#parent1-income', '5000');
        await page.fill('#parent2-income', '3000');
        await page.selectOption('#children-count', '2');
        await page.waitForTimeout(2000);
        await page.waitForSelector('text=Total Basic Obligation');
      }
    } else if (scenario.populated === 'summary') {
      // Navigate through the worksheet wizard to the summary
      // Part 1: Income
      await page.fill('input[placeholder="0.00"] >> nth=0', '5000');
      await page.fill('input[placeholder="0.00"] >> nth=1', '3000');

      // Find and fill number of children which is also in Part 1
      const childrenInput = page.locator('input[placeholder="1"]');
      if (await childrenInput.count() > 0) {
        await childrenInput.fill('2');
      }

      await page.click('text=Save & Continue');

      // Parts 2-8: Fast forward
      for (let i = 0; i < 7; i++) {
        await page.waitForTimeout(800);
        // On some steps there might be a "Save & Continue" button
        const nextBtn = page.locator('text=Save & Continue');
        if (await nextBtn.isVisible()) {
          await nextBtn.click();
        } else {
          const genBtn = page.locator('text=Generate Summary');
          if (await genBtn.isVisible()) {
            await genBtn.click();
            break;
          }
        }
      }

      await page.waitForSelector('h1:has-text("Worksheet Summary")', { timeout: 10000 });
      await page.waitForTimeout(1500); // Wait for summary animations
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
