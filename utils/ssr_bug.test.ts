import { calculateChildSupport } from './calculatorEngine';

describe('Washington Child Support 2026 Engine — Verified Test Cases', () => {

  it('Test Case 1: P1=$2,500 P2=$2,500, 2 children → $723', () => {
    const mockFormData = {
      incomeType: { p1: 'monthly' },
      payingParent: { p1: 'P1' },
      '5_children': { p1: 2 },
      '1a': { p1: 2500, p2: 2500 },
    };

    const result = calculateChildSupport(mockFormData as any);

    // Combined $5,000, 2 children → Table obligation $723 per child.
    // Wait, the table says [5000, 951, 723, 580, 486, 428]
    // The second value (723) is for 2 children, PER CHILD.
    // So total obligation is 723 * 2 = 1446.
    // P1 share (50%) = 723.
    // P1 income $2,500 > SSR $2,394, so no SSR reduction.
    expect(result.finalSupport).toBe(723);
    expect(result.ssrApplied).toBe(false);
  });

  it('Test Case 2: P1=$1,000 P2=$1,000, 1 child → $239', () => {
    const mockFormData = {
      incomeType: { p1: 'monthly' },
      payingParent: { p1: 'P1' },
      '5_children': { p1: 1 },
      '1a': { p1: 1000, p2: 1000 },
    };

    const result = calculateChildSupport(mockFormData as any);

    // Combined $2,000 (uses $2,200 bracket), 1 child → Table obligation $477.
    // P1 share (50%) = 238.5.
    // Combined income $2,000 < $2,200 threshold, so SSR is skipped.
    expect(result.finalSupport).toBeCloseTo(238.5, 1);
  });

  it('Test Case 3: P1=$2,500 P2=$0, 1 child → $543', () => {
    const mockFormData = {
      incomeType: { p1: 'monthly' },
      payingParent: { p1: 'P1' },
      '5_children': { p1: 1 },
      '1a': { p1: 2500, p2: 0 },
    };

    const result = calculateChildSupport(mockFormData as any);

    // Combined $2,500, 1 child → Table obligation $543.
    // P1 share (100%) = 543.
    // P1 income $2,500 > SSR $2,394, so no SSR reduction.
    expect(result.finalSupport).toBe(543);
  });

  it('Test Case 4: P1=$5,000 P2=$0, 1 child → $951', () => {
    const mockFormData = {
      incomeType: { p1: 'monthly' },
      payingParent: { p1: 'P1' },
      '5_children': { p1: 1 },
      '1a': { p1: 5000, p2: 0 },
    };

    const result = calculateChildSupport(mockFormData as any);

    // Combined $5,000, 1 child → Table obligation $951.
    // P1 share (100%) = 951.
    // P1 income $5,000 > SSR $2,394, so no SSR reduction.
    expect(result.finalSupport).toBe(951);
  });

  it('SSR Application: should reduce to $50/child if payer is at or below SSR', () => {
    const mockFormData = {
      incomeType: { p1: 'monthly' },
      payingParent: { p1: 'P1' },
      '5_children': { p1: 1 },
      '1a': { p1: 2300, p2: 1000 },
    };

    const result = calculateChildSupport(mockFormData as any);

    // Combined $3,300, 1 child → Table obligation $718.
    // P1 share = 2300 / 3300 = 69.7% → $500.42
    // P1 income $2,300 <= SSR $2,394 → Reduced to $50 minimum.
    expect(result.finalSupport).toBe(50);
    expect(result.ssrApplied).toBe(true);
  });
});
