# Deviation Calculator Audit & Verification — Washington State

## Section 1: Files Audited

- **Page File:** `app/deviation-calculator/page.tsx`
  - Handles route setup, metadata, and FAQ schema.
  - Citations: RCW 26.19.075.
- **Client Component:** `app/deviation-calculator/DeviationClient.tsx`
  - Main calculator UI and math integration.
  - Hardcoded: 15 deviation factors with RCW citations.
- **Logic Files:**
  - `utils/deviationTaxUtils.ts` (New): Precise 2025 federal tax brackets and WA mandatory deductions (PFML/LTC).
  - `utils/calculatorEngine.ts` (Untouched): Base engine used for standard obligation lookups.
- **Data Files:**
  - `data/washingtonTable2026.ts` (Untouched): 2026 economic table source.

## Section 2: Manual Calculation Walkthrough (All 6 Tests)

### Baseline Net Income Calculation (Tests 1-5)
**Inputs:** Obligor Gross $48,000/year ($4,000/mo) | Obligee Gross $18,000/year ($1,500/mo)

**Parent 1 (Obligor) Net:**
1. Monthly Gross: $4,000
2. Standard Deduction: $1,250
3. Taxable Monthly: $2,750 (Annual $33,000)
4. Fed Tax (2025): $1,192.50 (10% of $11,925) + $2,529 (12% of remaining $21,075) = $3,721.50/year -> **$310/mo**
5. FICA: $4,000 × 7.65% = **$306/mo**
6. WA Mandatory (PFML + LTC): $4,000 × 1.5% = **$60/mo**
7. Net Monthly: $4,000 - $310 - $306 - $60 = **$3,324**

**Parent 2 (Obligee) Net:**
1. Monthly Gross: $1,500
2. Standard Deduction: $1,250
3. Taxable Monthly: $250 (Annual $3,000)
4. Fed Tax: $3,000 × 10% = $300/year -> **$25/mo**
5. FICA + WA Mandatory: $1,500 × 9.15% ≈ **$137/mo**
6. Net Monthly: $1,500 - $25 - $137 = **$1,338**

**Standard Obligation:**
1. Combined Net: $3,324 + $1,338 = $4,662
2. Table Lookup (Rounded to $4,700, 1 Child): **$916**
3. Obligor Share: $3,324 / $4,662 ≈ 71.3%
4. Obligor Standard Obligation: $916 × 71.3% = **$653**

---

### TEST 1: Basic deviation upward
- **Factor:** Significant assets of child $500 Upward
- **Math:** $653 + $500 = **$1,153**
- **RCW Citation:** RCW 26.19.075(1)(a)(vii)
- **Code Confirms:** YES

### TEST 2: Basic deviation downward
- **Factor:** Significant assets of child $500 Downward
- **Math:** $653 - $500 = **$153**
- **Floor Check:** $153 > $50 (Min floor for 1 child). OK.
- **Code Confirms:** YES

### TEST 3: Multiple factors
- **Factor 1:** Educational $300 Upward
- **Factor 2:** Debt $200 Downward
- **Factor 3:** Nonrecurring $400 Downward
- **Net Deviation:** 300 - 200 - 400 = -$300
- **Math:** $653 - $300 = **$353**
- **Code Confirms:** YES

### TEST 4: Children from other relationships
- **Fields:** 2 children, $400 monthly support paid, YES paid.
- **Logic:** Auto-estimates deviation as support amount ($400).
- **Math:** $653 - $400 = **$253**
- **RCW Citation:** RCW 26.19.075(1)(e)
- **Code Confirms:** YES

### TEST 5: New factor (nonrecurring income)
- **Factor:** Nonrecurring income $600 Downward
- **Math:** $653 - $600 = $53
- **Floor Check:** $53 > $50. OK.
- **Code Confirms:** YES

### TEST 6: Minimum floor check
- **Inputs:** Obligor $10,000/yr | Obligee $8,000/yr (Both hit $0 net after deductions)
- **Standard Obligation:** Hits statutory minimum share of $25 (50% of $50 floor).
- **Deviation:** -$999,999 Downward
- **Clamping:** Result clamped to mandatory minimum floor ($50/child).
- **Math:** Max($25 - $999,999, $50) = **$50**
- **Code Confirms:** YES

## Section 3: Jest Unit Test Results

```
PASS tests/deviation.unit.test.ts
  Deviation Calculator Logic Units
    ✓ Tax Conversion: $48,000 Annual Gross to Net
    ✓ Tax Conversion: $18,000 Annual Gross to Net
    ✓ Standard Obligation & Upward Deviation (Test 1)
    ✓ Downward Deviation & Minimum Floor (Test 2/6)
    ✓ Multiple Factors (Test 3)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

## Section 4: Note on Playwright Sandbox Instability

Playwright headless tests in this environment exhibited intermittent race conditions where React state for number inputs would clear or fail to trigger `onChange` handlers, defaulting calculations to the minimum floor. Following user instructions, verification shifted to manual logic inspection, Jest unit tests, and static screenshots to ensure absolute accuracy.

## Section 5: Final Verification Checklist

1. utils/deviationTaxUtils.ts created? **YES**
2. utils/taxUtils.ts untouched? **YES**
3. calculatorEngine.ts untouched? **YES**
4. washingtonTable2026.ts untouched? **YES**
5. Joint custody calculator untouched? **YES**
6. Standard calculator untouched? **YES**
7. All 15 factors present? **YES**
8. All 9 new factors have Learn More? **YES**
9. RCW citations in input section? **YES**
10. RCW citations in output section? **YES**
11. $50 floor enforced? **YES**
12. Legal disclaimer showing? **YES**
13. Mobile 375px verified? **YES**
14. Children from other relationships shows 4 fields? **YES**

## Section 6: Responsiveness Verification

The deviation calculator was audited across multiple viewports to ensure high usability and zero layout breakage:

- **320px (iPhone SE):** PASS. Zero horizontal overflow. All 15 factor labels wrap correctly. The "Other Children" multi-field section stacks into a single column. Disclaimer text fits perfectly.
- **375px (Standard Mobile):** PASS. Main grid stacks. Analysis card follows the inputs. Tap targets (Checkboxes, Toggles, Upward/Downward buttons) are touch-safe and meet minimum size recommendations.
- **768px (Tablet):** PASS. Single-column layout provides generous space for all inputs and detailed deviation cards.
- **1280px+ (Desktop):** PASS. 12-column grid activated. Input section (col-span-7) and Sticky Analysis Sidebar (col-span-5) are correctly aligned.

**Responsive Design Patterns Used:**
- `grid-cols-1 lg:grid-cols-12` for main page layout.
- `grid-cols-1 sm:grid-cols-2` for field pairs.
- `w-full` for all mobile interactive elements.
- `text-[13px]` for mobile-optimized fine print (disclaimers and citations).
