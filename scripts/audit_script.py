import os
from playwright.sync_api import sync_playwright

PAGES = {
    "home": "/",
    "worksheet": "/worksheet",
    "blog_listing": "/blog",
    "blog_post": "/blog/washington-child-support-guidelines-2026",
    "county_guide": "/king-county-income-5000-2-children",
    "privacy": "/privacy",
    "about": "/about",
    "compare": "/compare-2024-2026",
    "editorial": "/editorial-methodology",
    "glossary": "/glossary"
}

def audit_page(page_name, url):
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Mobile Audit (375px)
        mobile_context = browser.new_context(viewport={"width": 375, "height": 812})
        mobile_page = mobile_context.new_page()
        mobile_page.goto(f"http://localhost:3000{url}")
        mobile_page.wait_for_timeout(2000) # Wait for animations
        mobile_page.screenshot(path=f"audit_assets/mobile_{page_name}.png", full_page=True)
        mobile_context.close()

        # Desktop Audit (1440px)
        desktop_context = browser.new_context(viewport={"width": 1440, "height": 900})
        desktop_page = desktop_context.new_page()
        desktop_page.goto(f"http://localhost:3000{url}")
        desktop_page.wait_for_timeout(2000)
        desktop_page.screenshot(path=f"audit_assets/desktop_{page_name}.png", full_page=True)
        desktop_context.close()

        browser.close()

if __name__ == "__main__":
    for name, url in PAGES.items():
        print(f"Auditing {name}...")
        audit_page(name, url)
