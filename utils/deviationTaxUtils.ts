// Federal tax brackets: 2026 estimates
// Updated from 2025 for consistency
// Official 2026 brackets published by IRS
// in October-November 2025.
// Update when official brackets confirmed.

/**
 * ACCURATE 2026 WASHINGTON TAX CONVERSION FOR DEVIATIONS
 * Converts Annual Gross to Monthly Net
 *
 * Includes:
 * - Federal Income Tax (2026 Estimates - Single Filer)
 * - Standard Deduction ($15,450)
 * - FICA (7.65%)
 * - WA Mandatory (PFML 0.92%, LTC 0.58%)
 */

export function convertGrossToNet(annualGross: number): number {
  if (annualGross <= 0) return 0;

  // Step 1: Calculate Federal Income Tax (2026 Estimates - Single)
  const taxableAnnual = Math.max(0, annualGross - 15450);
  let annualFedTax = 0;

  const brackets = [
    { threshold: 0, rate: 0.10 },
    { threshold: 11925, rate: 0.12 },
    { threshold: 48475, rate: 0.22 },
    { threshold: 103350, rate: 0.24 },
    { threshold: 197300, rate: 0.32 },
    { threshold: 250525, rate: 0.35 },
    { threshold: 626350, rate: 0.37 },
  ];

  for (let i = 0; i < brackets.length; i++) {
    const current = brackets[i];
    const next = brackets[i + 1];
    const upperLimit = next ? next.threshold : Infinity;

    if (taxableAnnual > current.threshold) {
      const amountInBracket = Math.min(taxableAnnual, upperLimit) - current.threshold;
      annualFedTax += amountInBracket * current.rate;
    }
  }

  // Step 2: Calculate FICA (7.65%)
  const totalFICA = annualGross * 0.0765;

  // Step 3: Calculate WA State Mandatory Deductions
  const waPFML = annualGross * 0.0092;
  const waLTC = annualGross * 0.0058;
  const totalWA = waPFML + waLTC;

  // Step 4: Calculate Net Monthly Income
  const annualNet = annualGross - annualFedTax - totalFICA - totalWA;
  const monthlyNet = annualNet / 12;

  return Math.max(0, Math.round(monthlyNet));
}
