# WSCSS Metadata Audit & Gap Analysis

This document provides a complete audit of page-level metadata for the WSCSS website, identifying current values and highlighting gaps where metadata is missing or falling back to root defaults.

## 1. Global Defaults (`app/layout.tsx`)
*   **Base URL**: `https://wscss.site`
*   **Default Title**: `WA Child Support Calculator 2026 | Free | WSCSS`
*   **Title Template**: `%s`
*   **Default Description**: `Calculate your 2026 Washington child support instantly using the official AOC economic table. Free for all 39 counties. Trusted by parents and attorneys.`
*   **OG Image**: `https://wscss.site/wscss-og.webp`

---

## 2. Page-by-Page Audit

| Page Route | Meta Title | Meta Description | OG/Twitter Tags Status |
| :--- | :--- | :--- | :--- |
| **Home (`/`)** | WA Child Support Calculator 2026 \| Free \| WSCSS | Calculate your 2026 Washington child support instantly... | Custom (Calculator focus) |
| **Worksheet (`/worksheet`)** | WA Child Support Worksheet 2026 \| AOC Form \| WSCSS | Complete the official 8-part AOC child support worksheet online... | Custom (Worksheet focus) |
| **Joint Custody (`/joint-custody-calculator`)** | Washington State Joint Custody Child Support Calculator 2026 \| WSCSS | Calculate child support for joint custody arrangements in WA... | Custom (Joint Custody focus) |
| **Deviation (`/deviation-calculator`)** | Washington State Child Support Deviation Calculator 2026 \| WSCSS | Calculate above or below standard child support... | Custom (Deviation focus) |
| **Modification (`/modification-calculator`)** | Washington State Child Support Modification Calculator 2026 \| WSCSS | Find out if your support order qualifies for modification... | Custom (Modification focus) |
| **Expenses (`/extra-expenses`)** | Extraordinary Expenses Splitter \| WA Child Support \| WSCSS | Calculate proportional shares for healthcare and daycare... | Custom (Expenses focus) |
| **Scenario Compare (`/compare`)** | Washington Child Support Scenario Comparison 2026 \| WSCSS | Compare different child support scenarios side-by-side... | **MISSING** (Uses root defaults) |
| **2024 vs 2026 (`/compare-2024-2026`)** | 2024 vs 2026 WA Child Support Changes \| WSCSS | Compare Washington child support guidelines 2024 vs 2026... | Custom (Comparison focus) |
| **Blog Index (`/blog`)** | WA Child Support Legal Guides 2026 \| WSCSS | Expert guides on Washington child support guidelines... | Custom (Blog focus) |
| **Glossary Index (`/glossary`)** | WA Child Support Glossary 2026 \| 20 Terms \| WSCSS | Plain-language definitions of 20 Washington child support... | Custom (Glossary focus) |
| **Court Directory (`/washington-courts`)** | WA Court Directory 2026 \| All 39 Counties \| WSCSS | Courthouse addresses, phone numbers, and filing links... | Custom (Directory focus) |
| **Filing Guide (`/how-to-file...`)** | How to File Child Support in Washington 2026 \| WSCSS | Step-by-step 2026 guide to filing child support in WA... | Custom (Guide focus) |
| **About (`/about`)** | About WSCSS \| WA Child Support Schedule Center | WSCSS is an independent educational platform... | Custom (About focus) |
| **Methodology (`/editorial-methodology`)** | Editorial Methodology \| WSCSS Child Support | Learn how WSCSS calculates Washington child support... | Custom (Methodology focus) |
| **Contact (`/contact`)** | Contact WSCSS \| WA Child Support Center | Contact the WSCSS editorial and support team... | Custom + `noindex` |
| **Disclaimer (`/disclaimer`)** | Legal Disclaimer \| WSCSS Child Support Calculator | WSCSS legal disclaimer. All calculations are estimates... | Custom + `noindex` |
| **Privacy Policy (`/privacy`)** | Privacy Policy \| WSCSS Child Support Calculator | WSCSS privacy policy. No personal calculation data... | Custom + `noindex` |
| **Terms of Service (`/terms`)** | Terms of Service \| WSCSS Child Support Calculator | Terms of service for WSCSS. Educational use only... | Custom + `noindex` |

---

## 3. Dynamic Route Logic

### Blog Posts (`/blog/[slug]`)
*   **Source**: `data/blogs.ts`
*   **Title**: `post.metaTitle` (sliced to 60 chars)
*   **Description**: `post.metaDescription` (sliced to 160 chars)
*   **OG/Twitter**: Inherits title and description. Uses generic `wscss-og.webp`.

### Glossary Terms (`/glossary/[slug]`)
*   **Source**: `data/glossary.ts`
*   **Title**: `termData.metaTitle`
*   **Description**: `termData.metaDescription`
*   **OG/Twitter**: Uses `ogTitle` and `ogDescription` from data file.

### County Pages (`/washington-courts/[county]`)
*   **Source**: `utils/seo.ts` -> `getCountyPageMeta`
*   **Title**: `{county.name} Child Support 2026 | WSCSS`
*   **Description**: Template-based including courthouse address and filing fee.

### Income Pages (`/[slug]`)
*   **Source**: `utils/seo.ts` -> `getIncomePageMeta`
*   **Title**: `Child Support $[Income] – {County}, WA ({Children}) | 2026 | WSCSS`
*   **Description**: Template-based including presumptive amount and SSR rules.

---

## 4. Gaps to Be Addressed (Do Not Implement)
*   **Scenario Comparison tool (`/compare`)**: Needs unique `openGraph` and `twitter` tags to replace layout defaults.
*   **Social Preview Images**: Many pages use the generic branding image (`wscss-og.webp`). Future optimization could involve page-specific or dynamic preview images.
