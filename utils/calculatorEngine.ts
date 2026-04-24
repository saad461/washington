import { getExactSupport } from '../data/washingtonTable2026';

// LEGAL CONSTANTS
const SELF_SUPPORT_RESERVE = 2394;

/**
 * 2026 Washington State Child Support Calculation Engine
 */

interface ParentValues {
  p1?: string | number | boolean;
  p2?: string | number | boolean;
}

export type CalculationStatus = 'SUCCESS' | 'MANUAL_DETERMINATION_REQUIRED' | 'MANUAL_REVIEW_REQUIRED' | 'INVALID_INPUT' | 'ERROR';

export function calculateChildSupport(formData: Record<string, ParentValues>) {
  // HELPER: Sum specific fields for a parent
  function sum(fields: (ParentValues | undefined)[], parentKey: 'p1' | 'p2') {
    return fields.reduce((acc, field) => {
      const value = parseFloat(String(field?.[parentKey] || 0)) || 0;
      return acc + value;
    }, 0);
  }

  // GET INPUTS
  const incomeType = String(formData["incomeType"]?.p1 || "monthly");
  const payingParent = String(formData["payingParent"]?.p1 || "P1");
  const parentingTime = parseFloat(String(formData["parentingTime"]?.p1 ?? 20));
  const otherChildren = parseFloat(String(formData["otherChildren"]?.p1 || 0)) || 0;
  const healthInsurance = parseFloat(String(formData["healthInsurance"]?.p1 || 0)) || 0;
  const daycare = parseFloat(String(formData["daycare"]?.p1 || 0)) || 0;
  const children = parseFloat(String(formData["5_children"]?.p1 || 1));

  // STEP 1 & 2: GROSS & DEDUCTIONS
  let grossP1 = sum([formData["1a"], formData["1b"], formData["1c"], formData["1d"], formData["1e"], formData["1f"]], "p1");
  let grossP2 = sum([formData["1a"], formData["1b"], formData["1c"], formData["1d"], formData["1e"], formData["1f"]], "p2");
  let deductionsP1 = sum([formData["2a"], formData["2b"], formData["2c"], formData["2d"], formData["2e"], formData["2f"], formData["2g"], formData["2h"], formData["2i"]], "p1");
  let deductionsP2 = sum([formData["2a"], formData["2b"], formData["2c"], formData["2d"], formData["2e"], formData["2f"], formData["2g"], formData["2h"], formData["2i"]], "p2");

  // ✅ Convert Income
  if (incomeType === "yearly") {
    grossP1 /= 12;
    grossP2 /= 12;
    deductionsP1 /= 12;
    deductionsP2 /= 12;
  }

  // STEP 3: NET INCOME
  const netP1 = Math.max(0, grossP1 - deductionsP1);
  const netP2 = Math.max(0, grossP2 - deductionsP2);

  // STEP 4: COMBINED NET INCOME
  const combinedIncome = netP1 + netP2;
  const shareP1 = combinedIncome > 0 ? netP1 / combinedIncome : 0;
  const shareP2 = combinedIncome > 0 ? netP2 / combinedIncome : 0;

  let status: CalculationStatus = 'SUCCESS';
  let obligationP1 = 0;
  let obligationP2 = 0;
  let baseTableSupport = 0;
  let adjustmentReason = "Standard calculation";

  // ✅ RULE ENGINE LOOKUP
  const lookup = getExactSupport(combinedIncome, children);

  if (lookup.status === "MANUAL_DETERMINATION_REQUIRED") {
    status = 'MANUAL_DETERMINATION_REQUIRED';
    adjustmentReason = lookup.reason;
    // We return early for manual determination cases
    return {
      status, grossP1, grossP2, deductionsP1, deductionsP2, netP1, netP2, combinedIncome,
      baseSupport: 0, finalSupport: 0, adjustmentReason, shareP1, shareP2,
      obligationP1: 0, obligationP2: 0, children,
      breakdown: { baseSupport: 0, parentingAdjustment: 0, otherChildrenAdjustment: 0, extraCosts: 0 },
      ssrApplied: false, is45PercentCapped: false, isLowIncome: true
    };
  } else if (lookup.status === "INVALID_INPUT") {
    status = 'INVALID_INPUT';
    return {
      status, grossP1, grossP2, deductionsP1, deductionsP2, netP1, netP2, combinedIncome,
      baseSupport: 0, finalSupport: 0, adjustmentReason: lookup.reason, shareP1, shareP2,
      obligationP1: 0, obligationP2: 0, children,
      breakdown: { baseSupport: 0, parentingAdjustment: 0, otherChildrenAdjustment: 0, extraCosts: 0 },
      ssrApplied: false, is45PercentCapped: false, isLowIncome: false
    };
  } else if (lookup.status === "SUCCESS") {
    baseTableSupport = lookup.totalSupport;
    obligationP1 = baseTableSupport * shareP1;
    obligationP2 = baseTableSupport * shareP2;
  } else {
    status = 'ERROR';
    return {
      status, grossP1, grossP2, deductionsP1, deductionsP2, netP1, netP2, combinedIncome,
      baseSupport: 0, finalSupport: 0, adjustmentReason: "Error in support calculation", shareP1, shareP2,
      obligationP1: 0, obligationP2: 0, children,
      breakdown: { baseSupport: 0, parentingAdjustment: 0, otherChildrenAdjustment: 0, extraCosts: 0 },
      ssrApplied: false, is45PercentCapped: false, isLowIncome: false
    };
  }

  // TRACK BREAKDOWN
  let parentingAdjustment = 0;
  let otherChildrenAdjustment = 0;
  let extraCostsAdjustment = 0;

  // Apply further adjustments ONLY if combined income is above $2,200
  // (Manual determination was already handled above)

  // OTHER CHILDREN ADJUSTMENT
  if (otherChildren > 0) {
    const reductionRate = Math.min(otherChildren * 0.025, 0.125);
    const prevP1 = obligationP1;
    const prevP2 = obligationP2;

    obligationP1 *= (1 - reductionRate);
    obligationP2 *= (1 - reductionRate);

    otherChildrenAdjustment = payingParent === "P1" ? (obligationP1 - prevP1) : (obligationP2 - prevP2);
  }

  // Parenting Time Adjustment
  const BASELINE = 25;
  let parentingAdjustmentAmount = 0;

  if (parentingTime > BASELINE) {
    const extraTime = parentingTime - BASELINE;
    const maxReductionRate = 0.5; // max 50% reduction
    const reductionRate = Math.min(extraTime / 100, maxReductionRate);

    if (payingParent === "P1") {
      parentingAdjustmentAmount = obligationP1 * reductionRate;
      obligationP1 -= parentingAdjustmentAmount;
    } else {
      parentingAdjustmentAmount = obligationP2 * reductionRate;
      obligationP2 -= parentingAdjustmentAmount;
    }
  }
  parentingAdjustment = -parentingAdjustmentAmount;

  // Add Extra Expenses
  const totalExtra = healthInsurance + daycare;
  if (totalExtra > 0) {
    const extraP1 = totalExtra * shareP1;
    const extraP2 = totalExtra * shareP2;
    obligationP1 += extraP1;
    obligationP2 += extraP2;
    extraCostsAdjustment = payingParent === "P1" ? extraP1 : extraP2;
  }

  // ✅ Apply SSR Protection
  const originalObligationP1 = obligationP1;
  const originalObligationP2 = obligationP2;

  const applySSRCap = (obligation: number, netIncome: number): { value: number; triggered: boolean; manualReview: boolean } => {
    const maxAffordable = netIncome - SELF_SUPPORT_RESERVE;
    if (maxAffordable <= 0) {
      return { value: 0, triggered: true, manualReview: true };
    }
    const cappedValue = Math.min(obligation, maxAffordable);
    return { value: cappedValue, triggered: cappedValue < obligation, manualReview: false };
  };

  const ssrResultP1 = applySSRCap(obligationP1, netP1);
  const ssrResultP2 = applySSRCap(obligationP2, netP2);

  if (ssrResultP1.manualReview || ssrResultP2.manualReview) {
    // If SSR cannot be handled precisely, trigger manual review
    status = 'MANUAL_REVIEW_REQUIRED';
    adjustmentReason = "Self-support reserve requires manual judicial review";
    return {
      status, grossP1, grossP2, deductionsP1, deductionsP2, netP1, netP2, combinedIncome,
      baseSupport: baseTableSupport, finalSupport: 0, adjustmentReason, shareP1, shareP2,
      obligationP1: 0, obligationP2: 0, children,
      breakdown: { baseSupport: 0, parentingAdjustment: 0, otherChildrenAdjustment: 0, extraCosts: 0 },
      ssrApplied: true, is45PercentCapped: false, isLowIncome: false
    };
  }

  obligationP1 = ssrResultP1.value;
  obligationP2 = ssrResultP2.value;

  if (ssrResultP1.triggered || ssrResultP2.triggered) {
    const isP1Capped = payingParent === "P1" && ssrResultP1.triggered;
    const isP2Capped = payingParent === "P2" && ssrResultP2.triggered;
    if (isP1Capped || isP2Capped) {
      adjustmentReason = "Self-support reserve protection applied";
    }
  }

  // ✅ Apply 45% Rule (Safety Cap)
  const pre45P1 = obligationP1;
  const pre45P2 = obligationP2;
  const apply45Rule = (obligation: number, netIncome: number) => {
    const maxLimit = netIncome * 0.45;
    return Math.min(obligation, maxLimit);
  }
  obligationP1 = apply45Rule(obligationP1, netP1);
  obligationP2 = apply45Rule(obligationP2, netP2);

  // ✅ Prevent Invalid Values
  obligationP1 = Math.max(0, obligationP1);
  obligationP2 = Math.max(0, obligationP2);

  let finalObligation = payingParent === "P1" ? obligationP1 : obligationP2;

  // ✅ Safety Clamp for Extreme Cases
  const MAX_REASONABLE_SUPPORT = combinedIncome * 0.6;
  finalObligation = Math.min(finalObligation, MAX_REASONABLE_SUPPORT);

  const ssrApplied = ssrResultP1.triggered || ssrResultP2.triggered;
  const is45PercentCapped = (payingParent === "P1" && obligationP1 < pre45P1) || (payingParent === "P2" && obligationP2 < pre45P2);
  const isLowIncome = combinedIncome < 2200;

  return {
    status,
    grossP1, grossP2,
    deductionsP1, deductionsP2,
    netP1, netP2,
    combinedIncome,
    baseSupport: baseTableSupport,
    finalSupport: finalObligation,
    adjustmentReason,
    shareP1, shareP2,
    obligationP1, obligationP2,
    children,
    breakdown: {
      baseSupport: payingParent === "P1" ? (baseTableSupport * shareP1) : (baseTableSupport * shareP2),
      parentingAdjustment,
      otherChildrenAdjustment,
      extraCosts: extraCostsAdjustment
    },
    ssrApplied,
    is45PercentCapped,
    isLowIncome
  };
}
