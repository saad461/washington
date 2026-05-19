import { getExactSupport } from '../data/washingtonTable2026.ts';

// LEGAL CONSTANTS — RCW 26.19.065
export const MIN_SUPPORT_PER_CHILD = 50;
export const SELF_SUPPORT_RESERVE = 2394; // 180% federal poverty line, 2026

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
    payerNetIncome: number;
    payerSharePercentage: number;
    payerAvailableAfterSSR: number;
    parentingAdjustment: number;
    otherChildrenAdjustment: number;
    healthInsurance: number;
    daycare: number;
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

/**
 * REFACTORED CHILD SUPPORT CALCULATION ENGINE (RCW 26.19)
 *
 * Fixes included:
 * 1. Expense Netting (Part 1)
 * 2. SSR Stabilization (Part 1)
 * 3. Whole Family Formula for Other Children (Part 1)
 * 4. 45% Cap Breakdown Inversion (Part 2)
 * 5. Breakdown Data Assignment Corrections (Part 2)
 */
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

  const children        = Math.max(1, Math.min(5, parseInt(String(formData["5_children"]?.p1 || 1), 10) || 1));
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
    adjustmentReason = "Low income minimum: $50 per child per month (RCW 26.19.065(2)(a))";
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

  // Capture pre-adjustment obligations for breakdown
  const preSSRP1 = obligationP1;
  const preSSRP2 = obligationP2;

  // ── SSR PROTECTION (RCW 26.19.065(2)(b)) ─────────────────────────
  // SSR must be applied BEFORE deviations like parenting time
  const applySSR = (share: number, netIncome: number) => {
    const minFloor = MIN_SUPPORT_PER_CHILD * children;
    const available = netIncome - SELF_SUPPORT_RESERVE;
    // The equation must compare the Proportional Share against Available Income After SSR
    // and must not drop below the statutory floor.
    return Math.max(minFloor, Math.min(share, available));
  };

  obligationP1 = applySSR(obligationP1, netP1);
  obligationP2 = applySSR(obligationP2, netP2);

  const postSSRP1 = obligationP1;
  const postSSRP2 = obligationP2;

  const ssrApplied =
    (payingParent === "P1" && obligationP1 < preSSRP1) ||
    (payingParent === "P2" && obligationP2 < preSSRP2);

  // ── ADJUSTMENTS ───────────────────────────────────────────────────────────
  let parentingAdjustment = 0;
  let otherChildrenAdjustment = 0;
  let healthcareAdjustment = 0;
  let daycareAdjustment = 0;
  let extraCostsAdjustment = 0;

  // FIX 5: Use lookup status as the source of truth for low income
  const isLowIncome = lookup.status === "manual_determination";

  // Only apply deviations and other adjustments if income is above low-income threshold
  if (!isLowIncome) {

    // FIX 3: Other children math (Whole Family Formula)
    if (otherChildren > 0) {
      const prevP1 = obligationP1;
      const prevP2 = obligationP2;

      const lookupWholeFamily = getExactSupport(combinedIncome, children + otherChildren);
      let baseWholeFamily = 0;
      if (lookupWholeFamily.status === "calculated") {
        baseWholeFamily = lookupWholeFamily.familyTotal * children;
      } else if (lookupWholeFamily.status === "above_maximum") {
        baseWholeFamily = lookupWholeFamily.familyTotal * children;
      } else {
        baseWholeFamily = MIN_SUPPORT_PER_CHILD * children;
      }

      const wfObligationP1 = baseWholeFamily * shareP1;
      const wfObligationP2 = baseWholeFamily * shareP2;

      // Apply the Whole Family obligation if it's lower than the standard obligation
      if (wfObligationP1 < obligationP1) obligationP1 = Math.max(wfObligationP1, MIN_SUPPORT_PER_CHILD * children);
      if (wfObligationP2 < obligationP2) obligationP2 = Math.max(wfObligationP2, MIN_SUPPORT_PER_CHILD * children);

      otherChildrenAdjustment = payingParent === "P1"
        ? obligationP1 - prevP1
        : obligationP2 - prevP2;
    }

    // Parenting time deviation
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

      if (reductionRate > 0) {
        const adjustment = (payingParent === "P1" ? obligationP1 : obligationP2) * reductionRate;
        if (payingParent === "P1") {
          obligationP1 -= adjustment;
        } else {
          obligationP2 -= adjustment;
        }
        parentingAdjustment = -adjustment;
        adjustmentReason = tierLabel;
      }
    }
  }

  // ── HEALTHCARE & DAYCARE (LINE 14) ──────────────────────────────────────
  // FIX 1: Expense Netting & Transfer Netting
  const healthP1Paid = sum([formData["10a"], formData["10b"]], "p1");
  const healthP2Paid = sum([formData["10a"], formData["10b"]], "p2");
  const healthTotal = healthP1Paid + healthP2Paid;

  const daycareP1Paid = sum([formData["11a"], formData["11b"], formData["11c"], formData["11d"]], "p1");
  const daycareP2Paid = sum([formData["11a"], formData["11b"], formData["11c"], formData["11d"]], "p2");
  const daycareTotal = daycareP1Paid + daycareP2Paid;

  if (healthTotal > 0) {
    const payerPaid = payingParent === "P1" ? healthP1Paid : healthP2Paid;
    const payerShare = payingParent === "P1" ? shareP1 : shareP2;
    healthcareAdjustment = (healthTotal * payerShare) - payerPaid;
    if (payingParent === "P1") obligationP1 += healthcareAdjustment; else obligationP2 += healthcareAdjustment;
  }

  if (daycareTotal > 0) {
    const payerPaid = payingParent === "P1" ? daycareP1Paid : daycareP2Paid;
    const payerShare = payingParent === "P1" ? shareP1 : shareP2;
    daycareAdjustment = (daycareTotal * payerShare) - payerPaid;
    if (payingParent === "P1") obligationP1 += daycareAdjustment; else obligationP2 += daycareAdjustment;
  }

  extraCostsAdjustment = healthcareAdjustment + daycareAdjustment;

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

  const finalObligation = payingParent === "P1" ? obligationP1 : obligationP2;

  return {
    grossP1, grossP2,
    deductionsP1, deductionsP2,
    netP1, netP2,
    combinedIncome,
    shareP1, shareP2,
    baseSupport: baseTableSupport,
    totalObligation: baseTableSupport,
    finalSupport: finalObligation,
    roundedCombinedIncome: lookup.status === "calculated" ? lookup.roundedIncome : combinedIncome,
    adjustmentReason,
    obligationP1, obligationP2,
    children,
    breakdown: {
      // breakdown.baseSupport = Payer's Proportional Share of Basic Obligation
      baseSupport: payingParent === "P1" ? preSSRP1 : preSSRP2,
      payerNetIncome: payingParent === "P1" ? netP1 : netP2,
      payerSharePercentage: payingParent === "P1" ? shareP1 : shareP2,
      // Payer available income after SSR (can be negative)
      payerAvailableAfterSSR: (payingParent === "P1" ? netP1 : netP2) - SELF_SUPPORT_RESERVE,
      parentingAdjustment,
      otherChildrenAdjustment,
      healthInsurance: healthcareAdjustment,
      daycare: daycareAdjustment,
      extraCosts: extraCostsAdjustment,
      ssrAdjustment: payingParent === "P1" ? postSSRP1 - preSSRP1 : postSSRP2 - preSSRP2,
      // FIX 4: Reverse subtraction for cap45Adjustment inversion
      cap45Adjustment: payingParent === "P1" ? preCapP1 - obligationP1 : preCapP2 - obligationP2,
    },
    ssrApplied,
    is45PercentCapped,
    isLowIncome,
    isAboveMaximum: lookup.status === "above_maximum",
    parentingDeviationApplied: useParentingDeviation && parentingAdjustment < 0,
  };
}
