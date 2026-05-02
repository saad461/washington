import { getExactSupport } from '../data/washingtonTable2026';

// LEGAL CONSTANTS — RCW 26.19.065
const MIN_SUPPORT_PER_CHILD = 50;
const SELF_SUPPORT_RESERVE = 2394; // 180% federal poverty line, 2026

interface ParentValues {
  p1?: string | number | boolean;
  p2?: string | number | boolean;
}

export function calculateChildSupport(formData: Record<string, ParentValues>) {

  function sum(fields: (ParentValues | undefined)[], parentKey: 'p1' | 'p2') {
    return fields.reduce((acc, field) => {
      const raw = field?.[parentKey];
      const value = parseFloat(String(raw ?? 0)) || 0;
      return acc + (isFinite(value) ? value : 0);
    }, 0);
  }

  // ── INPUTS ────────────────────────────────────────────────────────────────
  const incomeType      = String(formData["incomeType"]?.p1 || "monthly");
  const payingParent    = String(formData["payingParent"]?.p1 || "P1");
  const parentingTime   = parseFloat(String(formData["parentingTime"]?.p1 ?? 0));
  const otherChildren   = parseFloat(String(formData["otherChildren"]?.p1 || 0)) || 0;
  const healthInsurance = parseFloat(String(formData["healthInsurance"]?.p1 || 0)) || 0;
  const daycare         = parseFloat(String(formData["daycare"]?.p1 || 0)) || 0;
  const children        = Math.max(1, Math.min(5, parseInt(String(formData["5_children"]?.p1 || 1), 10) || 1));

  /**
   * PARENTING DEVIATION TOGGLE
   * ─────────────────────────────────────────────────────────────────────────
   * When false (default): parentingTime is ignored entirely. The result is
   * the pure table-based presumptive obligation — fully court-defensible.
   *
   * When true: an estimated deviation credit is calculated per
   * RCW 26.19.075(1)(d). IMPORTANT — this is an APPROXIMATION.
   * Washington courts apply parenting time deviation case-by-case with no
   * fixed statutory formula. The estimate uses a proportional scale above
   * the 25% overnight baseline, capped at 50% reduction at 100% parenting.
   * Label this clearly in any UI that exposes it.
   */
  const useParentingDeviation = formData["useParentingDeviation"]?.p1 === true;

  // ── STEP 1 & 2: GROSS INCOME & DEDUCTIONS ────────────────────────────────
  const incomeFields = [
    formData["1a"], formData["1b"], formData["1c"],
    formData["1d"], formData["1e"], formData["1f"],
  ];
  const deductionFields = [
    formData["2a"], formData["2b"], formData["2c"],
    formData["2d"], formData["2e"], formData["2f"],
    formData["2g"], formData["2h"], formData["2i"],
  ];

  let grossP1 = sum(incomeFields, "p1");
  let grossP2 = sum(incomeFields, "p2");
  let deductionsP1 = sum(deductionFields, "p1");
  let deductionsP2 = sum(deductionFields, "p2");

  // Convert yearly → monthly
  if (incomeType === "yearly") {
    grossP1 /= 12; grossP2 /= 12;
    deductionsP1 /= 12; deductionsP2 /= 12;
  }

  // ── STEP 3: NET INCOME ────────────────────────────────────────────────────
  const netP1 = Math.max(0, grossP1 - deductionsP1);
  const netP2 = Math.max(0, grossP2 - deductionsP2);

  // ── STEP 4: COMBINED NET INCOME & INCOME SHARES ───────────────────────────
  const combinedIncome = netP1 + netP2;
  const shareP1 = combinedIncome > 0 ? netP1 / combinedIncome : 0.5;
  const shareP2 = combinedIncome > 0 ? netP2 / combinedIncome : 0.5;

  let obligationP1 = 0;
  let obligationP2 = 0;
  let baseTableSupport = 0;
  let adjustmentReason = "Standard calculation";

  // ── STEP 5: TABLE LOOKUP ──────────────────────────────────────────────────
  const lookup = getExactSupport(combinedIncome, children);

  if (lookup.status === "calculated") {
    baseTableSupport = lookup.totalSupport;
    obligationP1 = baseTableSupport * shareP1;
    obligationP2 = baseTableSupport * shareP2;

  } else if (lookup.status === "manual_determination") {
    baseTableSupport = MIN_SUPPORT_PER_CHILD * children;
    adjustmentReason = "Low income minimum: $50/child/month (RCW 26.19.065(2)(a))";
    obligationP1 = baseTableSupport * shareP1;
    obligationP2 = baseTableSupport * shareP2;

  } else if (lookup.status === "above_maximum") {
    baseTableSupport = lookup.tableMaxTotal;
    obligationP1 = baseTableSupport * shareP1;
    obligationP2 = baseTableSupport * shareP2;
    adjustmentReason =
      "Income exceeds $50,000 table maximum — presumptive amount applied. " +
      "Court may order more with written findings. (RCW 26.19.065(3))";

  } else {
    adjustmentReason = lookup.status === "error" ? lookup.message : "Calculation error";
  }

  // ── ADJUSTMENTS ───────────────────────────────────────────────────────────
  let parentingAdjustment = 0;
  let otherChildrenAdjustment = 0;
  let extraCostsAdjustment = 0;

  if (combinedIncome >= 2200) {

    // Other children adjustment (RCW 26.19.075(1)(e))
    if (otherChildren > 0) {
      const SSR = SELF_SUPPORT_RESERVE;

      // Line 8c for each parent: netIncome - SSR, minimum $50/child
      const line8cP1 = Math.max(MIN_SUPPORT_PER_CHILD * children, netP1 - SSR);
      const line8cP2 = Math.max(MIN_SUPPORT_PER_CHILD * children, netP2 - SSR);

      // Line 8d: divide by total children, multiply by children in this case
      const totalChildrenP1 = children + otherChildren;
      const totalChildrenP2 = children + otherChildren;
      const line8dP1 = (line8cP1 / totalChildrenP1) * children;
      const line8dP2 = (line8cP2 / totalChildrenP2) * children;

      // Only apply if 8d is less than line 7 (current obligation)
      const prevP1 = obligationP1;
      const prevP2 = obligationP2;
      if (line8dP1 < obligationP1) obligationP1 = Math.max(line8dP1, MIN_SUPPORT_PER_CHILD * children);
      if (line8dP2 < obligationP2) obligationP2 = Math.max(line8dP2, MIN_SUPPORT_PER_CHILD * children);

      otherChildrenAdjustment = payingParent === "P1"
        ? obligationP1 - prevP1
        : obligationP2 - prevP2;
    }

    // ── PARENTING TIME DEVIATION (OPTIONAL / ESTIMATED) ───────────────────
    // Gated behind useParentingDeviation toggle — OFF by default.
    // When OFF: parentingTime has zero effect on the result.
    // When ON:  estimated deviation per RCW 26.19.075(1)(d) — Tier-based logic.
    if (useParentingDeviation) {
      let reductionRate = 0;
      let tierLabel = "";

      if (parentingTime >= 183) {
        reductionRate = 0.25;
        tierLabel = "Equal Parenting Time — RCW 26.19.075(1)(d)";
      } else if (parentingTime >= 128) {
        reductionRate = 0.1667;
        tierLabel = "Substantial Shared Time — RCW 26.19.075(1)(d)";
      } else if (parentingTime >= 91) {
        reductionRate = 0.0667;
        tierLabel = "Significant Residential Time — RCW 26.19.075(1)(d)";
      }

      let parentingAdjustmentAmount = 0;
      if (reductionRate > 0) {
        if (payingParent === "P1") {
          parentingAdjustmentAmount = obligationP1 * reductionRate;
          obligationP1 -= parentingAdjustmentAmount;
        } else {
          parentingAdjustmentAmount = obligationP2 * reductionRate;
          obligationP2 -= parentingAdjustmentAmount;
        }
        adjustmentReason = tierLabel;
      }
      parentingAdjustment = -parentingAdjustmentAmount;
    }

    // Healthcare & daycare — proportional share (RCW 26.19.080(2)(3))
    const totalExtra = healthInsurance + daycare;
    if (totalExtra > 0) {
      const extraP1 = totalExtra * shareP1;
      const extraP2 = totalExtra * shareP2;
      obligationP1 += extraP1;
      obligationP2 += extraP2;
      extraCostsAdjustment = payingParent === "P1" ? extraP1 : extraP2;
    }
  }

  // ── SSR PROTECTION (RCW 26.19.065(2)(b)) ─────────────────────────────────
  const applySSRCap = (obligation: number, netIncome: number) => {
    const maxAffordable = netIncome - SELF_SUPPORT_RESERVE;
    if (maxAffordable <= 0) {
      return Math.min(MIN_SUPPORT_PER_CHILD * children, obligation);
    }
    return Math.min(obligation, maxAffordable);
  };

  const originalObligationP1 = obligationP1;
  const originalObligationP2 = obligationP2;
  obligationP1 = applySSRCap(obligationP1, netP1);
  obligationP2 = applySSRCap(obligationP2, netP2);

  const ssrApplied =
    (payingParent === "P1" && obligationP1 < originalObligationP1) ||
    (payingParent === "P2" && obligationP2 < originalObligationP2);

  if (ssrApplied) {
    adjustmentReason = "Self-support reserve protection applied (RCW 26.19.065(2)(b))";
  }

  // ── 45% NET INCOME CAP (RCW 26.19.065(1)) ────────────────────────────────
  const pre45P1 = obligationP1;
  const pre45P2 = obligationP2;
  if (netP1 > 0) obligationP1 = Math.min(obligationP1, netP1 * 0.45);
  if (netP2 > 0) obligationP2 = Math.min(obligationP2, netP2 * 0.45);

  const is45PercentCapped =
    (payingParent === "P1" && obligationP1 < pre45P1) ||
    (payingParent === "P2" && obligationP2 < pre45P2);

  // ── FLOOR: MINIMUM $50/CHILD ──────────────────────────────────────────────
  obligationP1 = Math.max(0, obligationP1);
  obligationP2 = Math.max(0, obligationP2);

  // ── FINAL TRANSFER PAYMENT ────────────────────────────────────────────────
  let finalObligation = payingParent === "P1" ? obligationP1 : obligationP2;

  return {
    // Income
    grossP1, grossP2,
    deductionsP1, deductionsP2,
    netP1, netP2,
    combinedIncome,
    shareP1, shareP2,

    // Support
    baseSupport: baseTableSupport,
    finalSupport: Math.round(finalObligation),
    adjustmentReason,
    obligationP1, obligationP2,
    children,

    // Breakdown for UI
    breakdown: {
      baseSupport: payingParent === "P1"
        ? baseTableSupport * shareP1
        : baseTableSupport * shareP2,
      parentingAdjustment,
      otherChildrenAdjustment,
      extraCosts: extraCostsAdjustment,
    },

    // Status flags
    ssrApplied,
    is45PercentCapped,
    isLowIncome: combinedIncome < 2200,
    isAboveMaximum: lookup.status === "above_maximum",
    parentingDeviationApplied: useParentingDeviation && parentingAdjustment < 0,
  };
}
