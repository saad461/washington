import { getExactSupport } from '../data/washingtonTable2026';

// LEGAL CONSTANTS — RCW 26.19.065
const MIN_SUPPORT_PER_CHILD = 50;
const SELF_SUPPORT_RESERVE = 2394; // 180% federal poverty line, 2026

interface ParentValues {
  p1?: string | number | boolean;
  p2?: string | number | boolean;
}

export interface ChildSupportResult {
  grossP1: number;
  grossP2: number;
  deductionsP1: number;
  deductionsP2: number;
  netP1: number;
  netP2: number;
  combinedIncome: number;
  shareP1: number;
  shareP2: number;
  baseSupport: number;
  totalObligation: number;
  finalSupport: number;
  roundedCombinedIncome: number;
  adjustmentReason: string;
  obligationP1: number;
  obligationP2: number;
  children: number;
  breakdown: {
    baseSupport: number;
    parentingAdjustment: number;
    otherChildrenAdjustment: number;
    extraCosts: number;
    ssrAdjustment: number;
    cap45Adjustment: number;
  };
  ssrApplied: boolean;
  is45PercentCapped: boolean;
  isLowIncome: boolean;
  isAboveMaximum: boolean;
  parentingDeviationApplied: boolean;
}

export function calculateChildSupport(formData: Record<string, ParentValues>): ChildSupportResult {

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

  // Healthcare and Daycare / Special Expenses
  const healthInsurance = sum([formData["10a"], formData["10b"]], "p1") + sum([formData["10a"], formData["10b"]], "p2");
  const daycare         = sum([formData["11a"], formData["11b"], formData["11c"], formData["11d"]], "p1") + sum([formData["11a"], formData["11b"], formData["11c"], formData["11d"]], "p2");

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

  }

  // ── SSR PROTECTION & FLOOR ───────────────────────────────────────────────
  const originalObligationP1 = obligationP1;
  const originalObligationP2 = obligationP2;

  const applySSR = (obligation: number, netIncome: number) => {
    const minFloor = MIN_SUPPORT_PER_CHILD * children;
    if (netIncome - obligation < SELF_SUPPORT_RESERVE) {
      const reduced = netIncome - SELF_SUPPORT_RESERVE;
      if (reduced < obligation) {
        return Math.max(reduced, minFloor);
      }
    }
    return Math.max(obligation, minFloor);
  };

  obligationP1 = applySSR(obligationP1, netP1);
  obligationP2 = applySSR(obligationP2, netP2);

  const postSSRP1 = obligationP1;
  const postSSRP2 = obligationP2;

  const ssrApplied =
    (payingParent === "P1" && obligationP1 < originalObligationP1) ||
    (payingParent === "P2" && obligationP2 < originalObligationP2);

  if (ssrApplied) {
    adjustmentReason = "Self-support reserve protection applied (RCW 26.19.065(2)(b))";
  }

  // ── HEALTHCARE & DAYCARE (LINE 14) ──────────────────────────────────────
  // Applied AFTER SSR reduction per request
  const totalExtra = healthInsurance + daycare;
  let extraP1 = 0;
  let extraP2 = 0;
  if (totalExtra > 0) {
    extraP1 = totalExtra * shareP1;
    extraP2 = totalExtra * shareP2;
    obligationP1 += extraP1;
    obligationP2 += extraP2;
    extraCostsAdjustment = payingParent === "P1" ? extraP1 : extraP2;
  }

  // ── 45% NET INCOME CAP (RCW 26.19.065(1)) ────────────────────────────────
  const apply45Cap = (obligation: number, netIncome: number) => {
    const minFloor = MIN_SUPPORT_PER_CHILD * children;
    const cap45 = netIncome * 0.45;
    if (obligation > cap45) {
      return Math.max(cap45, minFloor);
    }
    return obligation;
  };

  const preCapP1 = obligationP1;
  const preCapP2 = obligationP2;

  obligationP1 = apply45Cap(obligationP1, netP1);
  obligationP2 = apply45Cap(obligationP2, netP2);

  const is45PercentCapped =
    (payingParent === "P1" && obligationP1 < preCapP1) ||
    (payingParent === "P2" && obligationP2 < preCapP2);

  // ── CREDITS (Line 16) ───────────────────────────────────────────────────
  const creditsP1 = sum([formData["16a"], formData["16b"], formData["16c"]], "p1");
  const creditsP2 = sum([formData["16a"], formData["16b"], formData["16c"]], "p2");

  obligationP1 = Math.max(MIN_SUPPORT_PER_CHILD * children, obligationP1 - creditsP1);
  obligationP2 = Math.max(MIN_SUPPORT_PER_CHILD * children, obligationP2 - creditsP2);

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
    totalObligation: baseTableSupport,
    finalSupport: finalObligation,
    roundedCombinedIncome: lookup.status === "calculated" ? lookup.roundedIncome : combinedIncome,
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
      ssrAdjustment: payingParent === "P1" ? postSSRP1 - originalObligationP1 : postSSRP2 - originalObligationP2,
      cap45Adjustment: payingParent === "P1" ? obligationP1 - preCapP1 : obligationP2 - preCapP2,
    },

    // Status flags
    ssrApplied,
    is45PercentCapped,
    isLowIncome: combinedIncome < 2200,
    isAboveMaximum: lookup.status === "above_maximum",
    parentingDeviationApplied: useParentingDeviation && parentingAdjustment < 0,
  };
}
