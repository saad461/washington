import os
from playwright.sync_api import sync_playwright

def test_interactions():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Test Mobile Menu
        mobile_context = browser.new_context(viewport={"width": 375, "height": 812})
        mobile_page = mobile_context.new_page()
        mobile_page.goto("http://localhost:3000/")
        mobile_page.wait_for_timeout(1000)

        # Click menu button
        mobile_page.click("button[aria-label='Open menu']")
        mobile_page.wait_for_timeout(500)
        mobile_page.screenshot(path="audit_assets/mobile_menu_open.png")

        # Test Home Calculator
        mobile_page.fill("#parent1-income", "5000")
        mobile_page.fill("#parent2-income", "3000")
        mobile_page.wait_for_timeout(1000)
        mobile_page.screenshot(path="audit_assets/mobile_home_calc_result.png")

        mobile_context.close()

        # Test Worksheet Wizard (Desktop)
        desktop_context = browser.new_context(viewport={"width": 1440, "height": 900})
        desktop_page = desktop_context.new_page()
        desktop_page.goto("http://localhost:3000/worksheet")
        desktop_page.wait_for_timeout(1000)

        # Fill some data and go to next step
        desktop_page.fill("input[type='number'] >> nth=0", "6000")
        desktop_page.click("button:has-text('Save & Continue')")
        desktop_page.wait_for_timeout(500)
        desktop_page.screenshot(path="audit_assets/desktop_worksheet_step2.png")

        desktop_context.close()
        browser.close()

if __name__ == "__main__":
    print("Testing interactions...")
    test_interactions()
