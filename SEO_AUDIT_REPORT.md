# WSCSS SEO Audit Report (A to Z)

This report provides a comprehensive overview of the SEO configuration for the WSCSS website, including sitemap inclusion, canonical tags, indexing instructions, and robots.txt rules.

## 1. Executive Summary
- **Canonical Coverage:** 100% of page templates implement self-referencing canonical tags using absolute URLs.
- **Sitemap Inclusion:** All primary static routes, county-specific guides, glossary terms, and blog posts are included. Income-specific pages have partial inclusion.
- **Indexing Control:** High-value pages are indexed; legal and low-value programmatic pages are correctly set to `noindex`.
- **Crawler Access:** `robots.txt` is configured to allow crawling of all content while protecting internal system paths.

---

## 2. Page-by-Page Audit Table

| Page / Route Template | Route Path | In Sitemap? | Canonical URL | Indexing (Robots Meta) | Blocked by Robots.txt? |
| :--- | :--- | :---: | :--- | :--- | :---: |
| **Homepage** | `/` | Yes | `https://wscss.site` | `index, follow` | No |
| **Worksheet Wizard** | `/worksheet` | Yes | `https://wscss.site/worksheet` | `index, follow` | No |
| **Extra Expenses Splitter** | `/extra-expenses` | Yes | `https://wscss.site/extra-expenses` | `index, follow` | No |
| **Glossary Index** | `/glossary` | Yes | `https://wscss.site/glossary` | `index, follow` | No |
| **Glossary Term** | `/glossary/[slug]` | Yes | `https://wscss.site/glossary/${slug}` | `index, follow` | No |
| **Blog Index** | `/blog` | Yes | `https://wscss.site/blog` | `index, follow` | No |
| **Blog Post** | `/blog/[slug]` | Yes | `https://wscss.site/blog/${slug}` | `index, follow` | No |
| **Court Directory** | `/washington-courts` | Yes | `https://wscss.site/washington-courts` | `index, follow` | No |
| **County Page** | `/washington-courts/[county]` | Yes | `https://wscss.site/washington-courts/${slug}` | `index, follow` | No |
| **About Us** | `/about` | Yes | `https://wscss.site/about` | `index, follow` | No |
| **Filing Guide** | `/how-to-file-child-support-washington` | Yes | `https://wscss.site/how-to-file...` | `index, follow` | No |
| **Comparison Tool** | `/compare-2024-2026` | Yes | `https://wscss.site/compare-2024-2026` | `index, follow` | No |
| **Methodology** | `/editorial-methodology` | Yes | `https://wscss.site/editorial-methodology` | `index, follow` | No |
| **Contact** | `/contact` | Yes | `https://wscss.site/contact` | `index, follow` | No |
| **Legal Disclaimer** | `/disclaimer` | No | `https://wscss.site/disclaimer` | `noindex, follow` | No |
| **Privacy Policy** | `/privacy` | No | `https://wscss.site/privacy` | `noindex, follow` | No |
| **Terms of Service** | `/terms` | No | `https://wscss.site/terms` | `noindex, follow` | No |
| **Income Pages ($100s)** | `/[slug]` (e.g. $5,100) | Yes* | `https://wscss.site/${slug}` | `index, follow` | No |
| **Income Pages (Other)** | `/[slug]` (e.g. $5,125) | No | `https://wscss.site/${slug}` | `noindex, follow` | No |

---

## 3. Robots.txt Analysis (`app/robots.ts`)
The site uses a dynamic `robots.ts` file that generates the following rules:

- **User-Agent:** `*` (All bots)
- **Allow:** `/` (Allow all content crawling)
- **Disallow:**
    - `/api/` — Protects internal API endpoints.
    - `/tmp/` — Prevents indexing of temporary/cache files.
- **Sitemap:** `https://wscss.site/sitemap.xml`

**Conclusion:** All user-facing pages are crawlable. Indexing for `noindex` pages is handled correctly at the page level via meta tags, allowing bots to "follow" links without indexing the page itself.

---

## 4. Sitemap Detailed Logic (`app/sitemap.ts`)
The sitemap is generated dynamically with the following data sources:

1.  **Static Routes:** Hardcoded high-priority URLs.
2.  **Washington Counties:** Pulled from `data/washingtonCounties.ts` (39 items).
3.  **Glossary Terms:** Pulled from `data/glossary.ts` (20 items).
4.  **Blog Posts:** Pulled from `data/blogs.ts`.
5.  **Target Income Pages:** Currently hardcodes 4 specific examples (King, Pierce, Snohomish, Spokane at $5,000).

---

## 5. Canonical Tag Implementation
Every page utilizes the Next.js `Metadata` object to ensure search engines consolidate authority to the correct URL.

**Standard applied:**
- Protocol: `https`
- Domain: `wscss.site`
- Trailing Slash: **None** (Strictly enforced across all routes).

---

## 6. Recommendations
1.  **Income Sitemap Expansion:** (Completed) High-value income tiers ($500/$1,000 increments) for all 39 counties are now included in the sitemap.
2.  **Indexing Policy:** (Completed) All $100 income increments matching the official 2026 economic table are now set to `index, follow`.
3.  **Breadcrumb Schema:** (Verified) Most pages correctly include `BreadcrumbList` schema that matches the canonical structure.
