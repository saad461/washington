# WSCSS New Calculators Audit

## Tech Stack
- **Framework**: Next.js 16.2.3
- **Styling**: Tailwind CSS 4
- **TypeScript**: Yes
- **UI Libraries**: Framer Motion, Lucide React
- **Standard UI Approach**: Tailwind classes (no external component library like shadcn found for core inputs/cards).

## Existing UI Patterns
- **Cards**: `card-standard`, `card-subtle`, `card-highlighted`
- **Buttons**: `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-tertiary-ghost`
- **Badges**: `eyebrow`, `badge-category`, `badge-meta`, `badge-success`, `badge-warning`
- **Breadcrumbs**: Inline implementation using standard Tailwind and Lucide icons.
- **FAQ**: `FAQAccordion` component used for FAQ sections.
- **Disclaimer**: Inline `callout-amber` or similar styling.
- **Typography**: `.prose-standard` for long-form content.

## Existing Calculator Routes
- `/` (Home/Income Estimator)
- `/joint-custody-calculator`
- `/deviation-calculator`
- `/modification-calculator`
- `/extra-expenses`

## Navigation Pattern
- Dropdown menu in `Navbar.tsx` under "Calculators".

## Tax Bracket Update 2026
- **Baseline Results (2025 Brackets)**:
  - Obligor Gross: $48,000/year
  - Obligor Net: $3,324/month
  - Obligee Gross: $18,000/year
  - Obligee Net: $1,338/month
  - Combined Income: $4,662/month
  - Standard Obligation (P1): $653.11/month

- **Post-Update Results (2026 Brackets)**:
  - Obligor Gross: $48,000/year
  - Obligor Net: $3,328/month
  - Obligee Gross: $18,000/year
  - Obligee Net: $1,342/month
  - Combined Income: $4,670/month
  - Standard Obligation (P1): $652.77/month
  - **Difference**: $0.34 (≤ $5 threshold met)

## Files Created
- `utils/netIncomeUtils.ts`
- `app/parenting-time-calculator/page.tsx`
- `app/parenting-time-calculator/ParentingTimeClient.tsx`
- `app/childcare-calculator/page.tsx`
- `app/childcare-calculator/ChildcareClient.tsx`
- `app/health-insurance-calculator/page.tsx`
- `app/health-insurance-calculator/HealthInsuranceClient.tsx`
- `app/medical-expense-calculator/page.tsx`
- `app/medical-expense-calculator/MedicalExpenseClient.tsx`
- `app/education-expense-calculator/page.tsx`
- `app/education-expense-calculator/EducationExpenseClient.tsx`
- `app/arrears-calculator/page.tsx`
- `app/arrears-calculator/ArrearsClient.tsx`
- `app/net-income-calculator/page.tsx`
- `app/net-income-calculator/NetIncomeClient.tsx`
- `app/tax-benefit-calculator/page.tsx`
- `app/tax-benefit-calculator/TaxBenefitClient.tsx`

## Verification Results
- **Parenting Time**: 182 overnights -> 49.9% Significant Residential Time (Verified)
- **Childcare Split**: P1 $5000, P2 $3000, Cost $800 -> P2 pays P1 $300 (Verified)
- **Health Insurance**: P1 $5000, P2 $3000, Premium $400 -> P2 reimburses P1 $150 (Verified)
- **Medical Expense**: P1 $5000, P2 $3000, Expense $500 -> P2 reimburses P1 $187.50 (Verified)
- **Education Expense**: P1 $5000, P2 $3000, Expense $300 -> P1 pays P2 $187.50 (Verified)
- **Arrears**: $794 order, 6 months missed -> $4,764 total, $47.64/mo interest (Verified at 12% RCW 26.23.060)
- **Net Income**: $60,000/year single -> $4,095 monthly net (Verified with 2026 tax estimates)
- **Tax Benefit**: $80,000/year, 1 child -> $2,000 annual CTC ($167/mo) (Verified)

## Updates Confirmation
- **Navigation**: Updated `Navbar.tsx` with two-column dropdown and mobile grouping.
- **Related Calculators**: Updated `CrossSuggestions.tsx` with logic for all new types.
- **Sitemap**: Added all 8 new routes to `app/sitemap.ts`.
- **Tax Logic**: Updated `utils/deviationTaxUtils.ts` to use 2026 bracket estimates.
- **Phase 4 SEO Content**: Added 600-1000 words of substantive content to all 8 pages, including RCW citations and 2026 EHB 1014 update mentions.
- **Content Fixes**: Added worked examples to Net Income, Tax Benefit, and Education pages. Fixed "direction" display on Education and Medical result cards.
- **Meta Title Optimization**: Optimized meta titles for all 8 calculators to remove "| wscss.site" suffix and prioritize keywords/benefits (e.g., "Washington Parenting Time Calculator 2026 — Overnights & Custody Percentage").

## Final Status
- `npm run build`: Passed successfully.
- TypeScript Errors: Zero.
- Mobile Verification: Confirmed at 375px viewport via Playwright.
- Test Coverage: Jest unit tests passed for Net Income, Arrears (12%), and Deviation tax logic.
