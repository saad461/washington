/**
 * ACCURATE 2025 WASHINGTON TAX CONVERSION FOR DEVIATIONS
 * Converts Annual Gross to Monthly Net
 *
 * Includes:
 * - Federal Income Tax (2025 Brackets - Single Filer)
 * - Standard Deduction ($15,000)
 * - FICA (Social Security 6.2% up to $176,100, Medicare 1.45%)
 * - WA Mandatory (PFML 0.92% up to $176,100, LTC 0.58%)
 */

export function convertGrossToNet(annualGross: number): number {
  if (annualGross <= 0) return 0;

  // Step 1: Calculate Federal Income Tax (2025 Brackets)
  const taxableAnnual = Math.max(0, annualGross - 15000);
  let annualFedTax = 0;

  if (taxableAnnual > 0) {
    if (taxableAnnual <= 11925) {
      annualFedTax = taxableAnnual * 0.10;
    } else if (taxableAnnual <= 48475) {
      annualFedTax = 1192.5 + (taxableAnnual - 11925) * 0.12;
    } else if (taxableAnnual <= 103350) {
      annualFedTax = 5578.5 + (taxableAnnual - 48475) * 0.22;
    } else if (taxableAnnual <= 197300) {
      annualFedTax = 17651 + (taxableAnnual - 103350) * 0.24;
    } else if (taxableAnnual <= 250525) {
      annualFedTax = 40199 + (taxableAnnual - 197300) * 0.32;
    } else if (taxableAnnual <= 626350) {
      annualFedTax = 57231 + (taxableAnnual - 250525) * 0.35;
    } else {
      annualFedTax = 188769.75 + (taxableAnnual - 626350) * 0.37;
    }
  }

  // Step 2: Calculate FICA
  const socialSecurity = Math.min(annualGross, 176100) * 0.062;
  const medicare = annualGross * 0.0145;
  const totalFICA = socialSecurity + medicare;

  // Step 3: Calculate WA State Mandatory Deductions
  const waPFML = Math.min(annualGross, 176100) * 0.0092;
  const waLTC = annualGross * 0.0058;
  const totalWA = waPFML + waLTC;

  // Step 4: Calculate Net Monthly Income
  const annualNet = annualGross - annualFedTax - totalFICA - totalWA;
  const monthlyNet = annualNet / 12;

  return Math.max(0, Math.round(monthlyNet));
}
