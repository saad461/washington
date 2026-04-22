# WCSSC Typography and Color Audit Report

## 1. Global Design System Baseline

The website follows a modern, clean design system primarily built on Tailwind CSS 4.0.

### Fonts
- **Headings**: `Poppins` (Variable: `--font-poppins`)
- **Body**: `Inter` (Variable: `--font-inter`)
- **Monospace**: `Geist Mono` (Variable: `--font-geist-mono`)

### Core Colors
- **Primary**: `#4f46e5` (Indigo-600)
- **Primary Hover**: `#4338ca` (Indigo-700)
- **Text Primary**: `#111827` (Gray-900) - Used for headings and high-contrast elements.
- **Text Secondary**: `#374151` (Gray-700) - Default color for body text.
- **Text Muted**: `#4b5563` (Gray-600) or `#6b7280` (Gray-500).
- **Background**: `#ffffff` (White) with occasional `#f9fafb` (Gray-50) for sections.

### Global Heading Hierarchy (Baseline)
Defined in `globals.css` base layer:
- **H1**: `text-3xl md:text-4xl | font-bold | font-heading | text-gray-900`
- **H2**: `text-2xl md:text-3xl | font-semibold | font-heading | text-gray-900`
- **H3**: `text-xl | font-semibold | font-heading | text-gray-900`
- **H4**: `text-lg | font-semibold | font-heading | text-gray-900`

---

## 2. Page-by-Page & Section Audit

### Home Page (`/`)
- **Hero Section**:
  - H1: Follows baseline (`text-3xl md:text-4xl`).
  - Paragraph: `text-base md:text-lg text-gray-700 leading-relaxed`.
  - Spacing: `py-12 md:py-16`.
- **Calculator Card**:
  - Labels: `text-[10px] font-bold uppercase tracking-widest text-gray-500`.
  - Inputs: `h-12 font-medium text-gray-900`.
  - Results Box: `bg-indigo-600 text-white rounded-xl px-6 py-4 text-center font-semibold text-lg shadow-sm`.
- **Key Figures Strip**:
  - Card Labels: `text-[10px] uppercase font-bold text-gray-500`.
  - Values: `text-base md:text-lg text-gray-700 font-semibold`.
- **Benchmark Table Section**:
  - H2: Follows baseline.
  - Table Headers: `text-[10px] uppercase font-bold text-gray-500 tracking-widest`.
  - Table Body: `text-base text-gray-700`.
  - Spacing: `py-12 md:py-16`.
- **Educational Content Sections**:
  - H2/H3: Follows baseline.
  - Paragraphs: `text-base md:text-lg`.
  - Padding: `p-6 md:p-8` for cards.
- **FAQ Section**:
  - Container: `py-12 md:py-16`.

### Worksheet Pro Wizard (`/worksheet`)
- **Hero Section**:
  - H1: **Inconsistency**. Uses `text-2xl md:text-3xl`.
  - Paragraph: `text-sm md:text-base font-medium`.
- **Progress Bar**: `text-[10px] uppercase font-bold text-gray-500 tracking-widest`.
- **Sidebar (Desktop)**:
  - Header: `font-heading font-semibold tracking-tight`.
  - Steps: `text-sm font-medium`.
  - Numbers: `text-[10px] font-bold`.
- **Wizard Form Section**:
  - Field Labels: `text-sm font-medium`.
  - Field IDs: `text-[10px] uppercase font-bold bg-gray-100`.
  - Parent Labels: `text-[10px] uppercase font-bold text-gray-500`.
  - Padding: `p-5 sm:p-6 md:p-6 lg:p-12`.
- **Summary Report Section**:
  - H1: Baseline size.
  - Cards: `bg-gray-900` and `bg-white`.
  - Table Headers: `text-[10px] uppercase font-bold text-gray-500 tracking-widest`.

### Washington Courts Directory (`/washington-courts`)
- **Header Section**:
  - H1: Follows baseline.
  - Paragraph: `text-lg`.
  - Spacing: `py-10 md:py-16`.
- **Court Cards Section**:
  - H2 (County Name): Baseline.
  - Details (Address/Phone): `text-sm`.
  - Padding: `p-6`.
  - Grid: `gap-6`.

### County Specific Pages (`/washington-courts/[county]`)
- **Hero Section**:
  - H1: Baseline size, `leading-[1.05]`.
  - Quick Stats Strip: `text-[10px] uppercase font-bold`.
  - Spacing: `py-14 md:py-20`.
- **Calculator Section**: `py-16 bg-gray-50`.
- **Main Article Content**:
  - H2: Follows baseline.
  - Body Text: `text-[17px]`.
- **Filing Steps Section**:
  - Numbered Badges: `bg-indigo-600 text-white text-sm`.
  - Padding: `p-5`.
- **Local Insight Card**: `bg-amber-50 text-amber-900 p-6`.
- **Sidebar (Desktop)**:
  - Court Info Card: `bg-gray-900 p-6`.
  - Links: `text-sm`.

### Blog Listing (`/blog`)
- **Hero Section**: H1 baseline.
- **Featured Post Section**:
  - H2: `text-2xl md:text-3xl md:text-4xl`.
  - Excerpt: `text-base md:text-lg`.
  - Spacing: `mb-20 lg:mb-32`.
- **Blog Grid Section**: `pb-24 md:pb-40`.

### Blog Post Detail (`/blog/[slug]`)
- **Header Section**:
  - Category: `text-[10px] uppercase font-bold text-gray-500`.
  - H1: Follows baseline.
  - Meta Box: `text-sm`.
- **Article Body**:
  - Typography: `prose-lg`.
  - H2 Overrides: `text-2xl md:text-3xl`.
  - H3 Overrides: `text-xl`.
- **FAQ/CTA Sections**: Consistent with components.

### Extra Expenses Splitter (`/extra-expenses`)
- **Hero Section**: H1 baseline.
- **Form Card**:
  - Labels: `text-[10px] uppercase font-bold text-gray-500 tracking-widest`.
  - Inputs: `h-14`.
  - Padding: `p-6 md:p-14`.
- **Results Card**: `bg-gray-900 text-white p-6`.
- **Result Values**: `text-3xl`.

### Glossary Index (`/glossary`)
- **Hero Section**: H1 baseline.
- **Term Grid Section**:
  - H2: Baseline.
  - Definitions: `text-sm` (14px).
  - Padding: `p-6`.

### About / Contact / Legal Pages
- **Layout**: `max-w-3xl mx-auto`.
- **Header Section**:
  - Icon Box: `p-4 bg-indigo-600` (or `amber-500` for disclaimer).
  - H1: Baseline.
  - Spacing: `py-10 md:py-16`.
- **Content Cards**:
  - H2: Baseline.
  - Paragraphs: `text-lg` or `md:leading-loose`.
  - Padding: `p-6`.
- **Footer Section (Internal)**: `bg-gray-900 text-gray-500 text-[10px] uppercase font-bold`.

### Programmatic SEO Pages (`/[slug]`)
- **Hero Section**: H1 with `leading-[1.15] md:leading-[1.1]`.
- **Result Card Section**:
  - Amount: `text-3xl md:text-4xl`.
  - Padding: `p-6 md:p-12`.
- **Article Section**:
  - H2: `text-3xl`.
  - Paragraphs: `prose-lg`.
- **Key Figures Table**: `text-[10px] uppercase font-bold text-gray-500 tracking-widest` for headers.

---

## 3. Component Style Audit

### Navbar
- **Brand**: `text-xl font-bold tracking-tight`.
- **Links**: `text-sm font-medium`.
- **Button**: `px-6 py-3 text-sm font-medium`.

### Footer
- **Headers**: `text-[10px] font-bold uppercase tracking-widest text-gray-500`.
- **Links**: `text-sm text-gray-500`.
- **Bottom Bar**: `text-[10px] font-bold uppercase tracking-widest`.

### FAQ Accordion
- **Question**: `text-xl font-semibold text-gray-900`.
- **Answer**: `text-base md:text-lg text-gray-700`.

### Cookie Banner
- **Message**: `text-sm font-medium`.
- **Compliance Label**: `text-[10px] uppercase font-bold`.

---

## 4. Spacing, Padding & Margins (Audit)

### Page Containers
- **Informational Pages**: `max-w-3xl mx-auto px-4 sm:px-6`.
- **Grid/Functional Pages**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Global Vertical Spacing**: `py-10 md:py-16` or `py-12 md:py-16`.

### Card Padding
- **Standard Card**: `p-6` (Mobile) / `p-8` (Desktop).
- **High-Impact Cards**: `p-6` (Mobile) / `p-12` or `p-14` (Desktop).

### Inconsistencies in Spacing
- **County Pages**: Use `px-6` directly on mobile containers instead of the standard `px-4 sm:px-6`.
- **Hero Vertical Spacing**: Ranges from `py-10` to `py-24` depending on the page template.

---

## 5. Identified Inconsistencies & UI/UX Issues

1. **H1 Size Variance**: Worksheet H1 is too small (`text-2xl md:text-3xl`).
2. **Body Text Divergence**: Sizing fluctuates between `text-base` (16px), `text-sm` (14px), and `text-[17px]` (17px).
3. **Leading (Line Height)**: Hero headings use inconsistent leading values (`none`, `snug`, `[1.1]`).
4. **Label Uniformity**: Metadata labels inconsistently apply `tracking-widest` vs `tracking-tight`.
5. **Button Heights**: Standard varies between 44px and 48px, causing slight misalignment in side-by-side buttons.

---

## 6. Summary Table

| Element | Font | Desktop Size | Mobile Size | Weight | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | Poppins | 36px (4xl) | 30px (3xl) | Bold | Gray-900 |
| **H2** | Poppins | 30px (3xl) | 24px (2xl) | Semibold | Gray-900 |
| **H3** | Poppins | 20px (xl) | 20px (xl) | Semibold | Gray-900 |
| **Body** | Inter | 16px-18px | 16px | Normal | Gray-700 |
| **Labels** | Inter | 10px | 10px | Bold | Gray-500 |
| **Buttons** | Inter | 14px-16px | 16px | Medium | White/Gray-900 |

---
*End of Final Audit Report*
