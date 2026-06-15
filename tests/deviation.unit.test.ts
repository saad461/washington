import { convertGrossToNet } from '../utils/deviationTaxUtils';
import { calculateDeviationResult } from '../utils/deviationLogic';

describe('Deviation Calculator Logic Units', () => {

  test('Tax Conversion: 8,000 Annual Gross to Net', () => {
    const net = convertGrossToNet(48000);
    // Calculated: 4000 (gross) - 310 (tax) - 306 (fica) - 60 (wa) = 3324
    expect(net).toBe(3324);
  });

  test('Tax Conversion: 8,000 Annual Gross to Net', () => {
    const net = convertGrossToNet(18000);
    // Calculated: 1500 (gross) - 25 (tax) - 137 (fica+wa) = 1338
    expect(net).toBe(1338);
  });

  test('Standard Obligation & Upward Deviation (Test 1)', () => {
    const result = calculateDeviationResult({
      obligorAnnual: 48000,
      obligeeAnnual: 18000,
      childrenCount: 1,
      selectedReasons: [{ id: 'assets', amount: 500, direction: 'upward' }]
    });
    expect(result.standardObligation).toBeCloseTo(653, 0);
    expect(result.adjustedObligation).toBeCloseTo(1153, 0);
  });

  test('Downward Deviation & Minimum Floor (Test 2/6)', () => {
    const result = calculateDeviationResult({
      obligorAnnual: 48000,
      obligeeAnnual: 18000,
      childrenCount: 1,
      selectedReasons: [{ id: 'assets', amount: 999999, direction: 'downward' }]
    });
    expect(result.adjustedObligation).toBe(50);
  });

  test('Multiple Factors (Test 3)', () => {
    const result = calculateDeviationResult({
      obligorAnnual: 48000,
      obligeeAnnual: 18000,
      childrenCount: 1,
      selectedReasons: [
        { id: 'edu', amount: 300, direction: 'upward' },
        { id: 'debt', amount: 200, direction: 'downward' },
        { id: 'nonrecurring', amount: 400, direction: 'downward' }
      ]
    });
    // 653 + 300 - 200 - 400 = 353
    expect(result.adjustedObligation).toBeCloseTo(353, 0);
  });
});
