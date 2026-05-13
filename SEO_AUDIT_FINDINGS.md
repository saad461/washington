# SEO Audit Findings - WSCSS.site

This document outlines the findings from a comprehensive SEO audit conducted on the WSCSS.site codebase based on the provided 10-point checklist.

## 1. Meta Tags

### Findings
*   **Unique Title/Description**: Most pages have unique titles and descriptions.
*   **Character Limits**:
    *   Most titles are within 60 characters.
    *   Most descriptions are within 160 characters.
    *   *Note*: The metadata in `app/blog/[slug]/page.tsx` uses `.slice(0, 60)` and `.slice(0, 160)`, which ensures limits but might cut off mid-sentence.
*   **Calculator Keywords**:
    *   **Homepage (`app/page.tsx`)**:
        *   Title: "WA Child Support Calculator 2026 | Free | WSCSS" (Contains "child support calculator").
        *   Description: Missing "child support estimator WA".
    *   **Worksheet Page (`app/worksheet/page.tsx`)**:
        *   Title: "WA Child Support Worksheet 2026 | AOC Form | WSCSS" - Missing both "child support calculator Washington" and "child support estimator WA".
        *   Description: Missing both keywords.

### Proposed Fixes
*   Update `app/page.tsx` metadata description to include "child support estimator WA".
*   Update `app/worksheet/page.tsx` metadata title and description to include the required keywords.

---

## 2. Headings

### Findings
*   **Exactly one `<h1>`**:
    *   **ISSUE**: `app/worksheet/page.tsx` has multiple `<h1>` tags. One is in the page itself, and others are inside the `WorksheetWizard` component (which is a sub-component).
    *   **ISSUE**: `components/WorksheetWizard.tsx` contains `<h1>` tags (lines 507 and 590) which are rendered inside the `WorksheetPage`.
*   **H1 Keywords**:
    *   Homepage H1: "Washington Child Support Calculator 2026" (Good).
    *   Worksheet H1: "Washington State Child Support Worksheet 2026" (Missing "calculator" or "estimator").
*   **Hierarchy**:
    *   Generally good, but `FAQAccordion.tsx` uses `<h3>` for questions. This is fine if an `<h2>` precedes it on the page.

### Proposed Fixes
*   Fix `app/worksheet/page.tsx` and `components/WorksheetWizard.tsx` to ensure only one `<h1>` exists on the Worksheet page.
*   Update Worksheet page `<h1>` to include the keyword "Calculator".
*   Convert extra `<h1>` tags in `WorksheetWizard.tsx` and other components to `<h2>` or `<h3>`.

---

## 3. Structured Data / Schema

### Findings
*   **FAQ Schema**:
    *   `FAQAccordion.tsx` successfully generates `FAQPage` schema.
    *   Blog posts and the calculator page use this component, so they have FAQ schema.
*   **WebApplication Schema**:
    *   **ISSUE**: Homepage (`app/page.tsx`) uses `SoftwareApplication` but not `WebApplication`.
    *   **ISSUE**: Worksheet page (`app/worksheet/page.tsx`) is missing `WebApplication` schema (it has `HowTo` and `BreadcrumbList`).

### Proposed Fixes
*   Add or update schema on `app/page.tsx` to include `WebApplication`.
*   Add `WebApplication` schema to `app/worksheet/page.tsx`.

---

## 4. Sitemap

### Findings
*   `app/sitemap.ts` exists and is dynamic.
*   It includes static routes, counties, glossary terms, and blog posts.
*   **ISSUE**: It doesn't seem to include the `/[slug]` programmatic income pages for all counties, only 4 major ones.

### Proposed Fixes
*   (Optional but recommended) Expand sitemap to include more programmatic income pages if they are high-value.

---

## 5. Robots.txt

### Findings
*   `app/robots.ts` exists and is correctly configured.

---

## 6. Images

### Findings
*   All identified images use Next.js `<Image>` component.
*   **ISSUE**: Some `alt` text in `data/blogs.ts` could be more descriptive.

### Proposed Fixes
*   Audit and improve `alt` text in `data/blogs.ts`.

---

## 7. Internal Linking

### Findings
*   **ISSUE**: While some links exist, they are not consistent across all blog posts and the calculator page.
*   Blog posts have a `BlogCTA` component that links to `/worksheet`.

### Proposed Fixes
*   Ensure all blog posts contain a natural link to the main calculator or worksheet.
*   Add "Related Articles" or "Guides" links to the bottom of the worksheet page.

---

## 8. Canonical Tags

### Findings
*   All pages have self-referencing canonical tags. (Pass)

---

## 9. Open Graph Tags

### Findings
*   **ISSUE**: Blog posts (`app/blog/[slug]/page.tsx`) use the generic `wscss-og.webp` instead of the post's unique featured image in the `openGraph` metadata.

### Proposed Fixes
*   Update `app/blog/[slug]/page.tsx` to use `post.image.url` for the OG and Twitter image tags.

---

## 10. Performance

### Findings
*   GA4 scripts use `strategy="lazyOnload"`. (Pass)
*   Standard `<img>` tags were not found in the main components; `<Image>` is used. (Pass)

---

## Priority Fixes (Calculator Page First)

1.  **Worksheet Metadata**: Add "child support calculator Washington" and "child support estimator WA" to title/description.
2.  **Worksheet H1**: Ensure exactly one `<h1>` and include "Calculator".
3.  **Worksheet Schema**: Add `WebApplication` schema.
4.  **Homepage Metadata**: Add "child support estimator WA" to description.
5.  **Homepage Schema**: Add/Update `WebApplication` schema.
6.  **Blog OG Images**: Use featured images for OG tags.
