# Audit Report: Joint Custody Calculation Fix (RCW 26.19.075 Compliance)

## Overview
This audit documents the removal of non-statutory "tier percentages" and "offset methods" from the joint custody calculation and their replacement with the discretionary range model as per Washington State RCW 26.19.075(1)(d).

## Files Changed

### 1. `components/calculator/RangeDisplay.tsx` (NEW)
- Created a dedicated, mobile-safe styled component for showing the "Estimated Court Range".
- Implemented light blue shaded box, 1px blue border, and responsive padding.

### 2. `app/joint-custody-calculator/JointCustodyClient.tsx`
- **Removed:**
    - `RESIDENTIAL_CREDIT_THRESHOLD` (135 days)
    - `OFFSET_TIERS` (6.67%, 16.67%, 25%)
    - "Offset Method" logic.
- **Added:**
    - Automated Payer Identification based on income share (parent with higher share is the payer).
    - Tiered range logic:
        - 0-90 overnights: No range, standard calculation message.
        - 91-182 overnights: 75% to 90% of `standardAmount`.
        - 183+ overnights: 50% to 75% of `standardAmount`.
    - Mandatory 50% floor cap on all estimates.
    - Integration with `RangeDisplay` component.
    - Updated "Live Range Sandbox" (What-If sliders) to reflect new tiers.
    - Integrated updated `PrintReport` props including legal disclaimer.

### 3. `app/joint-custody-calculator/page.tsx`
- Updated SEO metadata and FAQ schema to remove 135-day and offset method references.
- Clarified that no fixed formula exists in Washington.

### 4. `data/blogs.ts`
- Updated Blog 10 and Blog 1 to remove 135-day threshold and offset method mentions.
- Replaced with accurate RCW 26.19.075 language.

### 5. `data/glossary.ts`
- Updated definitions for "Deviation", "Parenting Time Credit", and "Residential Schedule".
- Removed 25% fixed references and replaced with discretionary language and 50% floor context.

### 6. `components/calculator/ParentingTimeSelector.tsx`
- Simplified parenting tiers to: "Standard Parenting" (0-90), "Significant Time" (91-182), and "Equal Parenting Time" (183+).

### 7. `components/ComparisonTool.tsx`
- Updated joint custody comparison logic to use the new tier midpoints for estimation.

## Before & After Snippets (Key Logic)

### JointCustodyClient.tsx Logic

**Before:**
```typescript
const getResidentialCredit = (nights: number) => {
  if (nights < 135) return 0;
  if (nights < 155) return 0.0667;
  if (nights < 175) return 0.1667;
  return 0.25;
};
// ... using offset method subtraction
```

**After:**
```typescript
let lowEstimate = standardAmount;
let highEstimate = standardAmount;

if (overnights >= 91 && overnights <= 182) {
  lowEstimate = Math.round(standardAmount * 0.75);
  highEstimate = Math.round(standardAmount * 0.90);
} else if (overnights >= 183) {
  lowEstimate = Math.round(standardAmount * 0.50);
  highEstimate = Math.round(standardAmount * 0.75);
}

// 50% Floor Cap
const floor = Math.round(standardAmount * 0.50);
if (lowEstimate < floor) lowEstimate = floor;
```

## Verification & Testing

- **Hardcoded Dollar Amounts:** Verified none remain in joint custody logic (uses `standardAmount`).
- **StandardAmount Variable:** Used as the base for all range calculations.
- **50% Floor Cap:** Verified through unit tests and code inspection.
- **Mobile Responsiveness:** Verified on 375px screen via Playwright screenshots (no overflow, full width).
- **Test Cases Passed (Jest):**
    - TEST A (0 nights): $0 range, message shown.
    - TEST B (90 nights): $0 range, message shown.
    - TEST C (91 nights): 75-90% range.
    - TEST D (182 nights): 75-90% range.
    - TEST E (183 nights): 50-75% range.
    - TEST F (365 nights): 50-75% range, floor applied.

## Compliance
All changes are strictly isolated from the core `calculatorEngine.ts` and `washingtonTable2026.ts` data files.

## Follow-Up Fixes (Session 2)

### Issue 1: RangeDisplay Hidden for 0-90 Days
**Problem:** The RangeDisplay was visible (showing $0 or empty) for 0-90 overnights.
**Fix:** Implemented strict conditional rendering using `payerOvernights > 90`.

**Code Before:**
```tsx
{result.tier !== "standard" && (
  <RangeDisplay ... />
)}
```

**Code After:**
```tsx
{result.payerOvernights > 90 && (
  <RangeDisplay ... />
)}
```

**Verification:**
- TEST A (0 days): Component NOT rendered.
- TEST B (90 days): Component NOT rendered.
- TEST C (91 days): Component rendered correctly (75-90% range).
- TEST D (183 days): Component rendered correctly (50-75% range).

### Issue 2: ComparisonTool Revert & Text Update
**Problem:** Comparison tool used inaccurate "tier midpoint" calculations.
**Fix:** Removed midpoint logic. Joint custody scenarios now display a static text message with a link.

**Code Before:**
```tsx
if (payerOvernights > 182) {
   transferPayment = standardAmount * 0.625;
} else if (payerOvernights > 90) {
   transferPayment = standardAmount * 0.825;
}
```

**Code After:**
```tsx
if (s.custodyType === "Joint Custody") {
  return {
    id: s.id,
    basicObligation: 0,
    transferPayment: 0,
    annualTotal: 0,
    isJointCustody: true
  };
}
```

**Verification:**
- No dollar amounts shown for joint custody.
- Neutral gray border used (no Best/Worst highlighting).
- Working link to `/joint-custody-calculator`.
- Mobile-friendly 44px tap target.
