import { washingtonTable2026 } from '../data/washingtonTable2026';

// LEGAL CONSTANTS
const MIN_SUPPORT_PER_CHILD = 50;
const SELF_SUPPORT_RESERVE = 2394;

/**
 * 2026 Washington State Child Support Calculation Engine
 */

interface ParentValues {
  p1?: string | number;
  p2?: string | number;
}

export function calculateChildSupport(formData: Record<string, ParentValues>) {
  // HELPER: Sum specific fields for a parent
  function sum(fields: (ParentValues | undefined)[], parentKey: 'p1' | 'p2') {
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
  let totalSupport = baseSupport;
  let adjustmentReason = "Standard calculation";

  // CASE A: Combined income < 2200 (Minimum support rule)
  if (combinedIncome < 2200) {
    totalSupport = MIN_SUPPORT_PER_CHILD * children;
    adjustmentReason = "Low income minimum rule applied ($50/child)";
  }

  // STEP 8: EACH PARENT OBLIGATION (Proportional share of total)
  let obligationP1 = totalSupport * shareP1;
  let obligationP2 = totalSupport * shareP2;

  // STEP 9: APPLY SSR PROTECTION (Cap-based rule)
  // Each parent's obligation is capped so they retain the Self-Support Reserve
  const applySSRCap = (obligation: number, netIncome: number) => {
    const maxAffordable = netIncome - SELF_SUPPORT_RESERVE;
    if (maxAffordable <= 0) {
      // If income is below SSR, they pay the $50/child minimum
      return MIN_SUPPORT_PER_CHILD * children;
    }
    // Otherwise, they pay the lesser of their share or what's above the SSR
    return Math.min(obligation, maxAffordable);
  };

  const originalP1 = obligationP1;
  const originalP2 = obligationP2;

  obligationP1 = applySSRCap(obligationP1, netP1);
  obligationP2 = applySSRCap(obligationP2, netP2);

  if (obligationP1 !== originalP1 || obligationP2 !== originalP2) {
    adjustmentReason = "Self-support reserve protection applied (capped at income above approximately $2,394)";
  }

  return {
    grossP1,
    grossP2,
    deductionsP1,
    deductionsP2,
    netP1,
    netP2,
    combinedIncome,
    baseSupport,
    finalSupport: totalSupport, // Base support after low-income combined rule
    adjustmentReason,
    shareP1,
    shareP2,
    obligationP1,
    obligationP2,
    children
  };
}
