# Website Audit Criteria & Definition

## 1. Split Sections Definition
A "Split Section" is defined as a UI component or section where the layout changes from a single-column stack on small screens (mobile) to a multi-column or side-by-side arrangement on large screens (desktop).

## 2. Audit Checklist

### Visual & Layout (Mobile & Desktop)
- [ ] No horizontal scrolling on mobile.
- [ ] No text overlaps or cut-offs.
- [ ] Proper vertical spacing (consistency in `section-default`).
- [ ] Images and icons scale correctly.
- [ ] Colors and typography match the design system (`globals.css`).

### Accessibility (A11y)
- [ ] Semantic HTML (H1-H6 hierarchy).
- [ ] Alt text for images.
- [ ] ARIA labels for interactive elements (Menu, Buttons).
- [ ] Focus indicators visible.

### Performance & SEO
- [ ] Meta tags present (Title, Description).
- [ ] Canonical tags present.
- [ ] Proper use of `next/image` or optimized images.
- [ ] JSON-LD structured data present.

### Interaction
- [ ] Mobile menu opens/closes correctly.
- [ ] Buttons have hover/active states.
- [ ] Forms (Calculator/Wizard) function as expected on both screen sizes.
- [ ] Sliders (Parenting Time) are usable on touch and mouse.
