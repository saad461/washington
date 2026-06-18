// Federal tax brackets: 2026 estimates
// Based on IRS inflation adjustment ~2.8%
// Official 2026 brackets published by IRS
// in October-November 2025.
// Update this file when official
// brackets are confirmed.

export function calculate2026Tax(annualGross: number, filingStatus: 'single' | 'hoh' | 'married'): number {
  let standardDeduction = 15450;
  if (filingStatus === 'hoh') standardDeduction = 23200;
  if (filingStatus === 'married') standardDeduction = 30900;

  const taxableIncome = Math.max(0, annualGross - standardDeduction);

  const brackets = {
    single: [
      { cap: 11925, rate: 0.10 },
      { cap: 48475, rate: 0.12 },
      { cap: 103350, rate: 0.22 },
      { cap: 197300, rate: 0.24 },
      { cap: 250525, rate: 0.32 },
      { cap: 626350, rate: 0.35 },
      { cap: Infinity, rate: 0.37 },
    ],
    hoh: [
      { cap: 17000, rate: 0.10 },
      { cap: 64850, rate: 0.12 },
      { cap: 103350, rate: 0.22 },
      { cap: 197300, rate: 0.24 },
      { cap: 250500, rate: 0.32 },
      { cap: 626350, rate: 0.35 },
      { cap: Infinity, rate: 0.37 },
    ],
    married: [
      { cap: 23850, rate: 0.10 },
      { cap: 96950, rate: 0.12 },
      { cap: 206700, rate: 0.22 },
      { cap: 206700, rate: 0.24 }, // Correcting the overlap in instructions: $206,700 - $394,600 is 24%
      // Re-reading instructions:
      // $96,950 - $206,700: 22%
      // $206,700 - $394,600: 24%
    ]
  };

  // Re-defining brackets more clearly based on provided values
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

export function calculateNetIncome2026(annualGross: number, filingStatus: 'single' | 'hoh' | 'married', optionalDeductions: number = 0): {
  monthlyGross: number;
  fedTax: number;
  fica: number;
  pfml: number;
  ltc: number;
  optional: number;
  monthlyNet: number;
} {
  const monthlyGross = annualGross / 12;
  const fedTax = calculate2026Tax(annualGross, filingStatus) / 12;
  const fica = (annualGross * 0.0765) / 12;
  const pfml = (annualGross * 0.0092) / 12;
  const ltc = (annualGross * 0.0058) / 12;

  const monthlyNet = monthlyGross - fedTax - fica - pfml - ltc - optionalDeductions;

  return {
    monthlyGross,
    fedTax,
    fica,
    pfml,
    ltc,
    optional: optionalDeductions,
    monthlyNet
  };
}
