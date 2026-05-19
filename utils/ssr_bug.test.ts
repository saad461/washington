import { calculateChildSupport } from './calculatorEngine';

describe('Washington Child Support 2026 Engine — Low Income & SSR Rules', () => {
  it('should accurately compute low-income payer support with an active SSR cap', () => {
    // Test Case: Combined Income $3,500. P1 is Payer making $2,500 (71.43%). 1 Child.
    const mockFormData = {
      incomeType: { p1: 'monthly' },
      payingParent: { p1: 'P1' },
      '5_children': { p1: 1 },
      // Parent 1 (Payer) Gross Income
      '1a': { p1: 2500, p2: 1000 },
      // No deductions or extra expenses for clean baseline verification
    };

    const result = calculateChildSupport(mockFormData as any);

    // 1. Validate Base Metrics mapping
    expect(result.combinedIncome).toBe(3500);
    expect(result.shareP1).toBeCloseTo(0.7143, 4);

    // 2. Validate state breakdown mapping assignments
    expect(result.breakdown.baseSupport).toBeCloseTo(544.30, 1); // $762 * 71.4285%
    expect(result.breakdown.payerAvailableAfterSSR).toBe(106); // $2,500 - $2,394

    // 3. Validate SSR flag triggering criteria
    expect(result.ssrApplied).toBe(true);

    // 4. Validate final statutory clamp support evaluation
    expect(result.finalSupport).toBe(106);
  });

  it('should clamp upward to the statutory floor when available income drops below $50 per child', () => {
    // Test Case: P1 makes $2,420 (Owes support but available income is only $26 after SSR)
    const mockFormData = {
      incomeType: { p1: 'monthly' },
      payingParent: { p1: 'P1' },
      '5_children': { p1: 1 },
      '1a': { p1: 2420, p2: 2500 } // Payer makes slightly over SSR threshold
    };

    const result = calculateChildSupport(mockFormData as any);

    expect(result.ssrApplied).toBe(true);
    expect(result.finalSupport).toBe(50); // Clamped up to statutory minimum floor
  });
});
