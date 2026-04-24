import { getExactSupport } from '../data/washingtonTable2026';

// LEGAL CONSTANTS
const SELF_SUPPORT_RESERVE = 2394;

/**
 * 2026 Washington State Child Support Calculation Engine
 */

export type CalculationStatus =
  | "SUCCESS"
  | "MANUAL_DETERMINATION_REQUIRED"
  | "MANUAL_REVIEW_REQUIRED"
  | "INVALID_INPUT"
  | "ERROR";

interface ParentValues {
  p1?: string | number | boolean;
  p2?: string | number | boolean;
}

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
  const children = Number(formData["5_children"]?.p1);

  // STEP 1 & 2: GROSS & DEDUCTIONS
  let grossP1 = sum([formData["1a"], formData["1b"], formData["1c"], formData["1d"], formData["1e"], formData["1f"]], "p1");
  let grossP2 = sum([formData["1a"], formData["1b"], formData["1c"], formData["1d"], formData["1e"], formData["1f"]], "p2");
  let deductionsP1 = sum([formData["2a"], formData["2b"], formData["2c"], formData["2d"], formData["2e"], formData["2f"], formData["2g"], formData["2h"], formData["2i"]], "p1");
  let deductionsP2 = sum([formData["2a"], formData["2b"], formData["2c"], formData["2d"], formData["2e"], formData["2f"], formData["2g"], formData["2h"], formData["2i"]], "p2");

  // ✅ (A) Convert Income
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

  let obligationP1 = 0;
  let obligationP2 = 0;
  let baseTableSupport = 0;
  let adjustmentReason = "Standard calculation";

  // ✅ (B) RULE ENGINE LOOKUP
  const lookup = getExactSupport(combinedIncome, children);

  if (lookup.status === "MANUAL_DETERMINATION_REQUIRED") {
    return {
      status: "MANUAL_DETERMINATION_REQUIRED" as CalculationStatus,
      adjustmentReason: lookup.reason,
      combinedIncome,
      netP1, netP2,
      grossP1, grossP2,
      children
    };
  } else if (lookup.status === "INVALID_INPUT") {
    return {
      status: "INVALID_INPUT" as CalculationStatus,
      adjustmentReason: lookup.reason,
      combinedIncome,
      children
    };
  } else if (lookup.status === "SUCCESS") {
    baseTableSupport = lookup.totalSupport;
    obligationP1 = baseTableSupport * shareP1;
    obligationP2 = baseTableSupport * shareP2;
  } else {
    // ERROR status
    return {
      status: "ERROR" as CalculationStatus,
      adjustmentReason: lookup.status === "ERROR" ? lookup.message : "Internal engine error",
      combinedIncome,
      children
    };
  }

  // Apply further adjustments ONLY if combined income is above $2,200
  let parentingAdjustment = 0;
  let otherChildrenAdjustment = 0;
  let extraCostsAdjustment = 0;

  if (combinedIncome >= 2200) {
    // OTHER CHILDREN ADJUSTMENT
    if (otherChildren > 0) {
      const reductionRate = Math.min(otherChildren * 0.025, 0.125);
      const prevP1 = obligationP1;
      const prevP2 = obligationP2;

      obligationP1 *= (1 - reductionRate);
      obligationP2 *= (1 - reductionRate);

      otherChildrenAdjustment = payingParent === "P1" ? (obligationP1 - prevP1) : (obligationP2 - prevP2);
    }

    // ✅ (D) Parenting Time Adjustment
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

    // ✅ (E) Add Extra Expenses
    const totalExtra = healthInsurance + daycare;
    if (totalExtra > 0) {
      const extraP1 = totalExtra * shareP1;
      const extraP2 = totalExtra * shareP2;
      obligationP1 += extraP1;
      obligationP2 += extraP2;
      extraCostsAdjustment = payingParent === "P1" ? extraP1 : extraP2;
    }
  }

  // ✅ (C) Apply SSR Protection (Self-Support Reserve)
  // If maxAffordable is 0 or less, the rule requires manual judicial review.
  const checkSSR = (obligation: number, netIncome: number) => {
    const maxAffordable = netIncome - SELF_SUPPORT_RESERVE;
    if (maxAffordable <= 0) {
      return { status: "MANUAL_REVIEW_REQUIRED", value: obligation };
    }
    return { status: "SUCCESS", value: Math.min(obligation, maxAffordable) };
  };

  const originalObligationP1 = obligationP1;
  const originalObligationP2 = obligationP2;

  const ssrP1 = checkSSR(obligationP1, netP1);
  const ssrP2 = checkSSR(obligationP2, netP2);

  if (ssrP1.status === "MANUAL_REVIEW_REQUIRED" || ssrP2.status === "MANUAL_REVIEW_REQUIRED") {
    return {
      status: "MANUAL_REVIEW_REQUIRED" as CalculationStatus,
      adjustmentReason: "Self-support reserve requires manual judicial review",
      combinedIncome,
      netP1, netP2,
      grossP1, grossP2,
      children
    };
  }

  obligationP1 = ssrP1.value;
  obligationP2 = ssrP2.value;

  if (obligationP1 !== originalObligationP1 || obligationP2 !== originalObligationP2) {
    const isP1Capped = payingParent === "P1" && obligationP1 !== originalObligationP1;
    const isP2Capped = payingParent === "P2" && obligationP2 !== originalObligationP2;
    if (isP1Capped || isP2Capped) {
      adjustmentReason = "Self-support reserve protection applied";
    }
  }

  // ✅ (F) Apply 45% Rule (Safety Cap)
  // This is a mandatory Washington State legal limit.
  const pre45P1 = obligationP1;
  const pre45P2 = obligationP2;
  const apply45Rule = (obligation: number, netIncome: number) => {
    const maxLimit = netIncome * 0.45;
    return Math.min(obligation, maxLimit);
  }
  obligationP1 = apply45Rule(obligationP1, netP1);
  obligationP2 = apply45Rule(obligationP2, netP2);

  // ✅ (G) Prevent Invalid Values
  obligationP1 = Math.max(0, obligationP1);
  obligationP2 = Math.max(0, obligationP2);

  let finalObligation = payingParent === "P1" ? obligationP1 : obligationP2;

  // ✅ (H) Safety Clamp for Extreme Cases
  // Final safety check to ensure obligation does not exceed 60% of combined income.
  const MAX_REASONABLE_SUPPORT = combinedIncome * 0.6;
  finalObligation = Math.min(finalObligation, MAX_REASONABLE_SUPPORT);

  const ssrApplied = (payingParent === "P1" && obligationP1 !== originalObligationP1) || (payingParent === "P2" && obligationP2 !== originalObligationP2);
  const is45PercentCapped = (payingParent === "P1" && obligationP1 < pre45P1) || (payingParent === "P2" && obligationP2 < pre45P2);
  const isLowIncome = combinedIncome < 2200;

  return {
    status: "SUCCESS" as CalculationStatus,
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
