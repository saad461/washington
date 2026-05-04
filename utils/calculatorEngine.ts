import { getExactSupport } from '../data/washingtonTable2026.ts';

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
    healthInsurance: number;
    daycare: number;
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

  // Capture pre-adjustment obligations for breakdown
  const presumptiveP1 = obligationP1;
  const presumptiveP2 = obligationP2;

  // ── SSR PROTECTION (RCW 26.19.065(2)(b)) ─────────────────────────
  // SSR must be applied BEFORE deviations like parenting time
  const applySSR = (obligation: number, netIncome: number) => {
    const minFloor = MIN_SUPPORT_PER_CHILD * children;
    if (netIncome - obligation < SELF_SUPPORT_RESERVE) {
      return Math.max(netIncome - SELF_SUPPORT_RESERVE, minFloor);
    }
    return obligation;
  };

  const preSSRP1 = obligationP1;
  const preSSRP2 = obligationP2;

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

  // Only apply deviations and other adjustments if income is above low-income threshold
  if (combinedIncome >= 2200) {

    // Other children adjustment (RCW 26.19.075(1)(e))
    if (otherChildren > 0) {
      const SSR = SELF_SUPPORT_RESERVE;
      const line8cP1 = Math.max(MIN_SUPPORT_PER_CHILD * children, netP1 - SSR);
      const line8cP2 = Math.max(MIN_SUPPORT_PER_CHILD * children, netP2 - SSR);

      const totalChildren = children + otherChildren;
      const line8dP1 = (line8cP1 / totalChildren) * children;
      const line8dP2 = (line8cP2 / totalChildren) * children;

      const prevP1 = obligationP1;
      const prevP2 = obligationP2;
      if (line8dP1 < obligationP1) obligationP1 = Math.max(line8dP1, MIN_SUPPORT_PER_CHILD * children);
      if (line8dP2 < obligationP2) obligationP2 = Math.max(line8dP2, MIN_SUPPORT_PER_CHILD * children);

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

    // Healthcare & daycare
    const totalHealth = healthInsurance;
    const totalDaycare = daycare;

    if (totalHealth > 0) {
      const share = payingParent === "P1" ? totalHealth * shareP1 : totalHealth * shareP2;
      if (payingParent === "P1") obligationP1 += share; else obligationP2 += share;
      healthcareAdjustment = share;
    }
    if (totalDaycare > 0) {
      const share = payingParent === "P1" ? totalDaycare * shareP1 : totalDaycare * shareP2;
      if (payingParent === "P1") obligationP1 += share; else obligationP2 += share;
      daycareAdjustment = share;
    }
  }

  const postDevP1 = obligationP1;
  const postDevP2 = obligationP2;

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
      baseSupport: payingParent === "P1" ? presumptiveP1 : presumptiveP2,
      parentingAdjustment,
      otherChildrenAdjustment,
      healthInsurance: healthcareAdjustment,
      daycare: daycareAdjustment,
      ssrAdjustment: payingParent === "P1" ? postSSRP1 - preSSRP1 : postSSRP2 - preSSRP2,
      cap45Adjustment: payingParent === "P1" ? obligationP1 - postDevP1 : obligationP2 - postDevP2,
    },
    ssrApplied,
    is45PercentCapped,
    isLowIncome: combinedIncome < 2200,
    isAboveMaximum: lookup.status === "above_maximum",
    parentingDeviationApplied: useParentingDeviation && parentingAdjustment < 0,
  };
}
