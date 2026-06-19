// Federal tax brackets: 2026 estimates
// Based on IRS inflation adjustment ~2.8%
// Official 2026 brackets published by IRS
// in October-November 2025.
// Update this file when official
// brackets are confirmed.

export interface DeductionResults {
  grossMonthly: number;
  fedTax: number;
  fica: number;
  waPFML: number;
  waLTC: number;
  optionalTotal: number;
  netMonthly: number;
}

export function calculate2026Tax(annualGross: number, filingStatus: 'single' | 'hoh' | 'married'): number {
  let standardDeduction = 15450;
  if (filingStatus === 'hoh') standardDeduction = 23200;
  if (filingStatus === 'married') standardDeduction = 30900;

  const taxableIncome = Math.max(0, annualGross - standardDeduction);

  const activeBrackets = filingStatus === 'single' ? [
    { threshold: 0, rate: 0.10 },
    { threshold: 11925, rate: 0.12 },
    { threshold: 48475, rate: 0.22 },
    { threshold: 103350, rate: 0.24 },
    { threshold: 197300, rate: 0.32 },
    { threshold: 250525, rate: 0.35 },
    { threshold: 626350, rate: 0.37 },
  ] : filingStatus === 'hoh' ? [
    { threshold: 0, rate: 0.10 },
    { threshold: 17000, rate: 0.12 },
    { threshold: 64850, rate: 0.22 },
    { threshold: 103350, rate: 0.24 },
    { threshold: 197300, rate: 0.32 },
    { threshold: 250500, rate: 0.35 },
    { threshold: 626350, rate: 0.37 },
  ] : [
    { threshold: 0, rate: 0.10 },
    { threshold: 23850, rate: 0.12 },
    { threshold: 96950, rate: 0.22 },
    { threshold: 206700, rate: 0.24 },
    { threshold: 394600, rate: 0.32 },
    { threshold: 501050, rate: 0.35 },
    { threshold: 751600, rate: 0.37 },
  ];

  let tax = 0;
  for (let i = 0; i < activeBrackets.length; i++) {
    const current = activeBrackets[i];
    const next = activeBrackets[i + 1];
    const upperLimit = next ? next.threshold : Infinity;

    if (taxableIncome > current.threshold) {
      const amountInBracket = Math.min(taxableIncome, upperLimit) - current.threshold;
      tax += amountInBracket * current.rate;
    }
  }

  return tax;
}

export function calculateNetIncome(
  amount: number,
  period: 'annual' | 'monthly' | 'biweekly' | 'weekly',
  filingStatus: 'single' | 'hoh' | 'married',
  optional: {
    mandatoryPension?: number;
    unionDues?: number;
    maintenancePaid?: number;
    otherDeductions?: number;
  } = {}
): DeductionResults {
  let annualGross = 0;
  if (period === 'annual') annualGross = amount;
  else if (period === 'monthly') annualGross = amount * 12;
  else if (period === 'biweekly') annualGross = amount * 26;
  else if (period === 'weekly') annualGross = amount * 52;

  const fedTaxAnnual = calculate2026Tax(annualGross, filingStatus);
  const ficaAnnual = annualGross * 0.0765;
  const pfmlAnnual = annualGross * 0.0092;
  const ltcAnnual = annualGross * 0.0058;

  const optionalTotal = (optional.mandatoryPension || 0) +
                        (optional.unionDues || 0) +
                        (optional.maintenancePaid || 0) +
                        (optional.otherDeductions || 0);

  return {
    grossMonthly: annualGross / 12,
    fedTax: fedTaxAnnual / 12,
    fica: ficaAnnual / 12,
    waPFML: pfmlAnnual / 12,
    waLTC: ltcAnnual / 12,
    optionalTotal: optionalTotal,
    netMonthly: (annualGross / 12) - (fedTaxAnnual / 12) - (ficaAnnual / 12) - (pfmlAnnual / 12) - (ltcAnnual / 12) - optionalTotal
  };
}
