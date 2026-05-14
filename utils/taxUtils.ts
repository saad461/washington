/**
 * SIMPLIFIED 2026 WASHINGTON TAX CONVERSION
 * Converts Annual Gross to Monthly Net
 *
 * Includes:
 * - Federal Income Tax (2026 estimated brackets)
 * - FICA (Social Security 6.2% up to cap, Medicare 1.45%)
 * - WA Paid Family & Medical Leave (approx 0.8% total)
 * - Standard Deduction ($15,000 approx for 2026)
 */

export function convertGrossToNet(annualGross: number): number {
  if (annualGross <= 0) return 0;

  const monthlyGross = annualGross / 12;

  // 1. FICA (7.65%)
  // 2026 SS Cap estimated at ~$170k. Below that for most cases.
  const ficaRate = 0.0765;
  const fica = monthlyGross * ficaRate;

  // 2. WA PFML (approx 0.8% employee share)
  const waPFML = monthlyGross * 0.008;

  // 3. Federal Income Tax (Simplified 2026 Brackets)
  // Standard deduction approx $15,000
  const taxableAnnual = Math.max(0, annualGross - 15000);
  let annualTax = 0;

  if (taxableAnnual > 0) {
    if (taxableAnnual <= 11600) {
      annualTax = taxableAnnual * 0.10;
    } else if (taxableAnnual <= 47150) {
      annualTax = 1160 + (taxableAnnual - 11600) * 0.12;
    } else if (taxableAnnual <= 100525) {
      annualTax = 5426 + (taxableAnnual - 47150) * 0.22;
    } else {
      // Higher brackets simplified for this estimator
      annualTax = 17168 + (taxableAnnual - 100525) * 0.24;
    }
  }

  const monthlyTax = annualTax / 12;
  const monthlyNet = monthlyGross - fica - waPFML - monthlyTax;

  return Math.max(0, Math.round(monthlyNet));
}
