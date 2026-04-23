# WCSSC Typography and Color Audit Report (2026)

## 1. Executive Summary
The WCSSC website utilizes a professional and modern design system based on a clean typography hierarchy and a focused color palette. While a robust global design system is defined in `globals.css`, there are several instances of "local styling" where pages deviate from these global standards by using hardcoded Tailwind classes. This report details the current system, identifies inconsistencies, and provides recommendations for alignment.

---

## 2. Global Design System Audit

### A. Typography Hierarchy
The site uses three primary fonts: **Poppins** (Headings), **Inter** (Body), and **Geist Mono** (Monospace).

| Level | Tailwind Class | CSS Value (rem) | Pixel Value (px) | Font Weight | Color (Tailwind) | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Mobile)** | `text-3xl` | `1.875rem` | 30px | Bold (700) | `text-heading` | Base style in `globals.css` |
| **H1 (Desktop)**| `md:text-4xl` | `2.25rem` | 36px | Bold (700) | `text-heading` | Base style in `globals.css` |
| **H2 (Mobile)** | `text-2xl` | `1.5rem` | 24px | Semibold (600) | `text-heading` | Base style in `globals.css` |
| **H2 (Desktop)**| `md:text-3xl` | `1.875rem` | 30px | Semibold (600) | `text-heading` | Base style in `globals.css` |
| **H3** | `text-xl` | `1.25rem` | 20px | Semibold (600) | `text-heading` | Base style in `globals.css` |
| **Body (Mobile)**| `text-base` | `1rem` | 16px | Normal (400) | `text-body` | Global `p, li` |
| **Body (Desktop)**| `md:text-lg` | `1.125rem` | 18px | Normal (400) | `text-body` | Global `p, li` |
| **Metadata** | `text-[10px]` | `0.625rem` | 10px | Bold (700) | `text-muted` | `.label-metadata` class |
| **Small Text** | `text-sm` | `0.875rem` | 14px | Normal (400) | `text-muted` | `.text-small` class |

### B. Color Palette
The color system is managed via CSS variables and Tailwind theme tokens.

| Name | Variable | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Heading** | `--color-heading` | `#0F172A` | Primary text for titles and headers |
| **Body** | `--color-body` | `#475569` | Standard paragraph and list text |
| **Muted** | `--color-muted` | `#94A3B8` | Labels, metadata, and secondary info |
| **Primary** | `--color-primary-indigo` | `#6366F1` | Brand accents, buttons, active states |
| **Primary Hover**| `--color-primary-hover` | `#4F46E5` | Interactive hover states |
| **Page BG** | `--color-page-bg` | `#F8FAFC` | Main background color |
| **Card BG** | `--color-card-bg` | `#FFFFFF` | Container backgrounds |
| **Border** | `--color-border-default`| `#E2E8F0` | Dividers and outlines |

---

## 3. Page-by-Page Audit

### ✅ Consistent Pages (Following Global Standards)
*   **Home Page (`/`)**: Follows global heading and body styles. Use of `section-default` and `stack-space` ensures consistent layout.
*   **Blog Listing (`/blog`)**: Adheres well to the typography system, utilizing `label-metadata` and standard heading sizes.
*   **Worksheet Wizard (`/worksheet`)**: While highly customized, it maintains the font hierarchy and color tokens effectively.

### ⚠️ Pages with Minor Deviations
*   **Washington Courts Directory (`/washington-courts`)**:
    *   *Observation*: Uses `text-emerald-500` and `bg-emerald-50` for courthouse badges, which deviates from the indigo primary brand color but is used consistently for "Court" related elements.
    *   *Recommendation*: Keep as-is for visual categorization, or unify with `text-primary`.
*   **Extra Expenses (`/extra-expenses`)**:
    *   *Observation*: Uses hardcoded `bg-gray-900` for result cards.
    *   *Recommendation*: Use a theme-token class if dark cards become a standard component.

### ❌ Pages with Significant Deviations
*   **About Page (`/about`)**:
    *   *Observation*: H1 is defined as `<h1>About WCSSC</h1>` without the global `h1` classes applied (since it relies on `@apply` in `globals.css` which sometimes requires explicit class naming in Next.js builds if not strictly followed).
    *   *Observation*: H2 uses `text-xl md: ` which is an incomplete Tailwind class.
    *   *Recommendation*: Explicitly apply `h1` and `h2` styles or ensure the base styles are correctly inherited.
*   **Terms & Disclaimer Pages (`/terms`, `/disclaimer`)**:
    *   *Observation*: Headers often use local overrides like `text-xl md:text-2xl` instead of the global H2/H3 standards.
    *   *Observation*: Some paragraphs use `md:leading-loose` which differs from the global `leading-relaxed`.
    *   *Recommendation*: Replace local size classes with global H2/H3 classes.
*   **Glossary Term Template (`/glossary/[slug]`)**:
    *   *Observation*: H1 is defined as `<h1 >` with no size classes.
    *   *Recommendation*: Apply global H1 classes.
*   **Programmatic SEO Pages (`/[slug]`)**:
    *   *Observation*: Uses `leading-[1.15] md:leading-[1.1]` on H1 titles.
    *   *Observation*: Uses `text-3xl` for H2 instead of the global `text-2xl md:text-3xl`.
    *   *Recommendation*: These pages use a "conversion-heavy" style. If this is intentional, it should be documented as a "Marketing Template" variant.

---

## 4. Component Audit

### **FAQ Accordion**
*   **Inconsistency**: Question text uses `text-xl` but doesn't explicitly use the `font-heading` (Poppins) or `tracking-tight` found in global H3s.
*   **Recommendation**: Apply `font-heading tracking-tight` to FAQ buttons.

### **Author Box**
*   **Inconsistency**: Uses `text-sm md:text-base` for the bio, which is smaller than the global `text-base md:text-lg`.
*   **Recommendation**: Increase font size to match global body text standards.

### **Authority Sidebar**
*   **Inconsistency**: Uses `font-heading` on H3s but hardcodes `font-semibold` instead of relying on the global base style.
*   **Recommendation**: Unify sidebar headers with the global H3 style.

---

## 5. Summary of Recommendations

1.  **Standardize Informational Pages**: Update `/about`, `/terms`, and `/disclaimer` to use global heading and body classes. Remove `md:leading-loose` in favor of the global `leading-relaxed`.
2.  **Unify Brand Colors**: Replace instances of `text-indigo-600` with the `text-primary` token to ensure color consistency if the brand hex code ever changes.
3.  **Refactor Component Headings**: Update `FAQAccordion` and `AuthorBox` to use Poppins (`font-heading`) for all sub-titles.
4.  **Template Documentation**: Create a distinction in `globals.css` between "Content Pages" (Informational) and "Tool Pages" (Calculator/SEO) if the different heading sizes in programmatic pages are intentional.

### **Cookie Banner**
*   **Inconsistency**: Uses `font-sans` explicitly on a paragraph instead of relying on the global base.
*   **Recommendation**: Remove redundant `font-sans` classes.

### **Contact Form**
*   **Inconsistency**: Label styles are `block label-metadata mb-2 ml-1`, which includes a left margin (`ml-1`) not found in other labels.
*   **Recommendation**: Standardize label margins across all forms.

---

## 6. Page-by-Page Typography & Color Usage

| Page/Template | Primary Fonts | H1 Style | Body Style | Primary Colors | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Home** | Poppins, Inter | `text-3xl font-bold` | `text-body leading-relaxed` | `heading`, `body`, `primary` | ✅ Good |
| **About** | Inter | `<h1>` (No classes) | `text-lg` | `heading`, `body` | ❌ Inconsistent |
| **Blog Listing** | Poppins, Inter | `text-3xl md:text-4xl` | `text-body` | `heading`, `body`, `indigo-600`| ✅ Good |
| **Blog Post** | Poppins, Inter | `<h1>` (No classes) | `prose-lg` (Tailwind Typography) | `heading`, `body`, `indigo-600`| ⚠️ Minor |
| **County Guide**| Poppins, Inter | `leading-[1.05]` | `text-body` | `heading`, `body`, `primary` | ⚠️ Minor |
| **Courts Index**| Inter | `<h1>` (No classes) | `text-lg` | `heading`, `body`, `emerald-500`| ❌ Inconsistent |
| **Glossary** | Poppins, Inter | `<h1>` (No classes) | `text-body` | `heading`, `body` | ❌ Inconsistent |
| **Worksheet** | Poppins, Inter | `text-2xl font-bold` | `text-sm md:text-base` | `heading`, `body`, `primary` | ✅ Good |
| **Extra Expenses**| Poppins, Inter | `<h1>` (No classes) | `text-lg` | `heading`, `body`, `primary` | ❌ Inconsistent |
| **Contact** | Poppins, Inter | `<h1>` (No classes) | `text-body` | `heading`, `body`, `primary` | ❌ Inconsistent |
| **Prog. SEO** | Poppins, Inter | `leading-[1.1]` | `text-body` | `heading`, `body`, `primary` | ⚠️ Minor |

---

## 7. Global Consistency Report

### **Pages that follow consistent UI/UX:**
- **Home Page**: Effectively uses the design system and global components.
- **Blog Listing**: Great use of the grid system and metadata styling.
- **Worksheet Wizard**: Despite complex logic, it maintains a high level of visual consistency with the rest of the site.

### **Sections needing alignment:**
- **Informational Pages** (`/about`, `/terms`, `/disclaimer`, `/editorial-methodology`): These pages often skip the `font-heading` (Poppins) class for titles and use varied paragraph sizing.
- **Calculators** (`/extra-expenses`, `/compare-2024-2026`): These tools use slightly different heading weights and margins compared to the main `HomeCalculator`.

---
**Audit Performed by Jules (Agent)**
*Date: May 2024*
