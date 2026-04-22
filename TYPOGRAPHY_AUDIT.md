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

## 2. Page-by-Page Audit

### Home Page (`/`)
- **Hero Section**:
  - H1: Follows baseline (`text-3xl md:text-4xl`).
  - Paragraph: `text-base md:text-lg text-gray-700 leading-relaxed`.
- **Calculator Card**:
  - Labels: `text-[10px] font-bold uppercase tracking-widest text-gray-500`.
  - Inputs: `h-12 font-medium text-gray-900`.
  - Results: `bg-indigo-600 text-white`, `text-2xl md:text-3xl font-bold`.
- **Key Figures Strip**:
  - Card Labels: `text-[10px] uppercase font-bold text-gray-500`.
  - Values: `text-base md:text-lg text-gray-700 font-semibold`.
- **Benchmark Table**:
  - Headers: `text-[10px] uppercase font-bold text-gray-500 tracking-widest`.
  - Body: `text-base text-gray-700`.
- **Educational Content Sections**:
  - H2: Follows baseline.
  - H3: Follows baseline.
  - Paragraphs: `text-base md:text-lg`.
- **Spacing**: Consistent `py-12 md:py-16` for main sections.

### Worksheet Pro Wizard (`/worksheet`)
- **Hero Section**:
  - H1: **Inconsistency**. Uses `text-2xl md:text-3xl`, which is smaller than the H1 baseline.
- **Sidebar (Desktop)**:
  - Header: `font-heading font-semibold tracking-tight`.
  - Steps: `text-sm font-medium`.
  - Numbers: `text-[10px] font-bold`.
- **Wizard Form**:
  - Field Labels: `text-sm font-medium`.
  - Field IDs: `text-[10px] uppercase font-bold bg-gray-100`.
  - Parent Labels: `text-[10px] uppercase font-bold text-gray-500`.
- **Summary Report**:
  - H1: Follows baseline (no class override).
  - Table Headers: `text-[10px] uppercase font-bold text-gray-500 tracking-widest`.
- **Responsive**: Mobile uses a sticky step navigation with pills (`text-[10px] font-bold`).

### Washington Courts Directory (`/washington-courts`)
- **Header**:
  - H1: Follows baseline.
  - Paragraph: `text-lg`.
- **Court Cards**:
  - H2 (County Name): Follows baseline.
  - Details (Address/Phone): `text-sm`.
  - "View" Badge: `text-[10px] uppercase font-bold`.
- **Spacing**: `gap-6` grid.

### County Specific Pages (`/washington-courts/[county]`)
- **Hero**:
  - H1: Follows baseline but adds `leading-[1.05]`.
  - Quick Stats: `text-[10px] uppercase font-bold`.
- **Main Content**:
  - H2: Follows baseline.
  - Body Text: `text-[17px]` (Custom size, slightly larger than baseline `text-base`).
- **Filing Steps**:
  - Step Numbers: `text-sm`.
  - Step Titles: `h4` baseline.
- **Sidebar**:
  - Labels: `text-[10px] uppercase font-bold text-gray-500`.
  - Address/Phone: `text-sm`.
- **Responsive**: Sidebars stack below main content on mobile.

### Blog Listing (`/blog`)
- **Hero**:
  - H1: Follows baseline.
- **Featured Post**:
  - H2: **Inconsistency**. Uses `text-2xl md:text-3xl md:text-4xl`.
  - Excerpt: `text-base md:text-lg`.
- **Grid**:
  - Card H3: Uses `font-heading font-semibold` but no size class, relying on baseline.
  - Meta: `text-[10px] uppercase font-bold`.

### Blog Post Detail (`/blog/[slug]`)
- **Typography Wrapper**: Uses `@tailwindcss/typography` with `prose-lg`.
- **Prose Overrides**:
  - H2: `text-2xl md:text-3xl`.
  - H3: `text-xl`.
  - Paragraphs: Standard `prose-lg` defaults.
- **Meta Data**: `text-[10px] uppercase font-bold text-gray-500`.

---

## 3. Component Style Audit

### Navbar
- **Brand**: `text-xl font-bold tracking-tight`.
- **Links**: `text-sm font-medium`.
- **Button**: `px-6 py-3 text-sm font-medium`.

### Footer
- **Brand**: `text-xl md:text-2xl font-bold`.
- **Headers**: `text-[10px] font-bold uppercase tracking-widest text-gray-500`.
- **Links**: `text-sm text-gray-500`.
- **Copyright**: `text-[10px] font-bold uppercase tracking-widest`.

### FAQ Accordion
- **Question**: `text-xl font-semibold text-gray-900`.
- **Answer**: `text-base md:text-lg text-gray-700`.

---

## 4. Identified Inconsistencies & UI/UX Issues

### Typography Inconsistencies
1. **H1 Size Variance**:
   - Baseline: `text-3xl md:text-4xl`.
   - Worksheet Page: `text-2xl md:text-3xl` (Under-sized).
   - Featured Blog: `text-2xl md:text-3xl md:text-4xl` (Matches baseline but uses redundant classes).
2. **Body Text Sizing**:
   - Baseline: `text-base` (16px).
   - County Pages: `text-[17px]` (1px larger than baseline).
   - Blog Posts: `prose-lg` (Approx 18px).
   - *Recommendation*: Standardize informational body text to either `text-base` or `text-lg`.
3. **Label Metadata**:
   - Most labels use `text-[10px] uppercase font-bold text-gray-500 tracking-widest`.
   - Some instances omit `tracking-widest` or use `tracking-tight` (e.g., Navbar Brand), creating slight visual friction.
4. **Font Weight for Headings**:
   - Baseline H2-H4 uses `font-semibold`.
   - Some manual overrides use `font-bold` for H2s (e.g., Home Page Hero H1).
   - *Recommendation*: Use `font-bold` for H1 and `font-semibold` consistently for H2-H4.

### Color Inconsistencies
1. **Body Text Color**:
   - `globals.css` sets `body` to `gray-700`.
   - However, many sections manually apply `text-gray-900` to body-like text (e.g., result breakdowns), which can reduce visual hierarchy between content and headers.
2. **Link Colors**:
   - Some links use `hover:text-indigo-700` while others use `hover:text-indigo-800` or just `hover:text-gray-900`.

### Layout & Spacing (UX)
1. **Desktop vs Mobile Padding**:
   - Global standard is `px-4 sm:px-6 lg:px-8`.
   - Some pages (like `/washington-courts`) use `px-6` directly, which might be too tight on very small mobile devices (320px).
2. **Container Width**:
   - Most content is constrained by `max-w-3xl` for readability.
   - However, the `/washington-courts` index uses `max-w-7xl` with a 3-column grid, which significantly changes the reading rhythm compared to the rest of the site.
3. **Button Consistency**:
   - Standard primary button: `px-6 py-3 min-h-[48px]`.
   - Some secondary buttons use `px-5 py-2.5 min-h-[44px]`.
   - *UX Note*: While both meet touch target standards (44px/48px), the visual variance in height when buttons are near each other is noticeable.

## 5. Summary Table

| Element | Font | Desktop Size | Mobile Size | Weight | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | Poppins | 36px (4xl) | 30px (3xl) | Bold | Gray-900 |
| **H2** | Poppins | 30px (3xl) | 24px (2xl) | Semibold | Gray-900 |
| **H3** | Poppins | 20px (xl) | 20px (xl) | Semibold | Gray-900 |
| **Body** | Inter | 16px-18px | 16px | Normal | Gray-700 |
| **Labels** | Inter | 10px | 10px | Bold | Gray-500 |
| **Buttons** | Inter | 14px-16px | 16px | Medium | White/Gray-900 |

---
*End of Audit Report*
