import { washingtonTable2026 } from '../data/washingtonTable2026';

// LEGAL CONSTANTS
const MIN_SUPPORT_PER_CHILD = 50;
const SELF_SUPPORT_RESERVE = 1514;

/**
 * 2026 Washington State Child Support Calculation Engine
 */

function applyLowIncomeRules(data: {
  netP1: number;
  netP2: number;
  combinedIncome: number;
  baseSupport: number;
  children: number;
}) {
  const { netP1, netP2, combinedIncome, baseSupport, children } = data;
  const minTotal = MIN_SUPPORT_PER_CHILD * children;

  // CASE A: Combined income < 2200
  if (combinedIncome < 2200) {
    return {
      finalSupport: minTotal,
      reason: "Low income minimum rule applied ($50/child)"
    };
  }

  // CASE B: Parent below Self-Support Reserve (SSR)
  if (netP1 < SELF_SUPPORT_RESERVE || netP2 < SELF_SUPPORT_RESERVE) {
    // Presumptive rule: greater of $50/child or 50% of shared obligation
    return {
      finalSupport: Math.max(minTotal, baseSupport * 0.5),
      reason: "Self-support reserve protection applied"
    };
  }

  // DEFAULT
  return {
    finalSupport: baseSupport,
    reason: "Standard calculation"
  };
}

export function calculateChildSupport(formData: any) {
  // HELPER: Sum specific fields for a parent
  function sum(fields: any[], parentKey: 'p1' | 'p2') {
    return fields.reduce((acc, field) => {
      // Ensure we treat the value as a number (handle string inputs from forms)
      const value = parseFloat(String(field?.[parentKey] || 0)) || 0;
      return acc + value;
    }, 0);
  }

  // STEP 1: TOTAL GROSS INCOME (1g)
  const grossP1 = sum([
    formData["1a"], formData["1b"], formData["1c"],
    formData["1d"], formData["1e"], formData["1f"]
  ], "p1");

  const grossP2 = sum([
    formData["1a"], formData["1b"], formData["1c"],
    formData["1d"], formData["1e"], formData["1f"]
  ], "p2");

  // STEP 2: TOTAL DEDUCTIONS (2j)
  const deductionsP1 = sum([
    formData["2a"], formData["2b"], formData["2c"],
    formData["2d"], formData["2e"], formData["2f"],
    formData["2g"], formData["2h"], formData["2i"]
  ], "p1");

  const deductionsP2 = sum([
    formData["2a"], formData["2b"], formData["2c"],
    formData["2d"], formData["2e"], formData["2f"],
    formData["2g"], formData["2h"], formData["2i"]
  ], "p2");

  // STEP 3: NET INCOME (3)
  const netP1 = Math.max(0, grossP1 - deductionsP1);
  const netP2 = Math.max(0, grossP2 - deductionsP2);

  // STEP 4: COMBINED NET INCOME (4)
  const combinedIncome = netP1 + netP2;

  // STEP 5: LOOKUP TABLE
  // Standard Washington 2026 lookup logic using rounded combined income
  const roundedIncome = Math.round(combinedIncome / 100) * 100;
  const row = washingtonTable2026[roundedIncome];

  // Number of children from form (default to 1)
  const childrenField = formData["5_children"];
  const children = parseInt(String(childrenField?.p1 || 1), 10) || 1;

  const baseSupport = row ? (row[Math.min(children, 5)] || 0) : 0;

  // STEP 6: PROPORTIONAL SHARE (6)
  const shareP1 = combinedIncome > 0 ? netP1 / combinedIncome : 0;
  const shareP2 = combinedIncome > 0 ? netP2 / combinedIncome : 0;

  // STEP 7: APPLY LOW-INCOME RULES & ADJUSTMENTS
  const adjustment = applyLowIncomeRules({
    netP1,
    netP2,
    combinedIncome,
    baseSupport,
    children
  });

  const finalSupport = adjustment.finalSupport;
  const adjustmentReason = adjustment.reason;

  // STEP 8: EACH PARENT OBLIGATION (7)
  const obligationP1 = finalSupport * shareP1;
  const obligationP2 = finalSupport * shareP2;

  return {
    grossP1,
    grossP2,
    deductionsP1,
    deductionsP2,
    netP1,
    netP2,
    combinedIncome,
    baseSupport,
    finalSupport,
    adjustmentReason,
    shareP1,
    shareP2,
    obligationP1,
    obligationP2,
    children
  };
}
