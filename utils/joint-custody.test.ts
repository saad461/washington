import { calculateChildSupport } from '../utils/calculatorEngine';

describe('Joint Custody Calculator Logic Verification', () => {
  const getParentingCreditPercent = (time: number, useCredit: boolean): number => {
    if (!useCredit) return 0;
    if (time >= 50) return 0.25;
    if (time < 20) return 0;
    return Math.min((time / 50) * 0.25, 0.25);
  };

  test('Test Case 1 — 50/50 schedule: P1=$5,000 / P2=$3,000 / 2 children', () => {
    const p1 = 5000;
    const p2 = 3000;
    const childrenCount = 2;
    const payingParent = 'P1';
    const payingParentTime = 50;
    const useCredit = true;

    const engineResult = calculateChildSupport({
      "1a": { p1, p2 },
      "5_children": { p1: childrenCount },
      "incomeType": { p1: 'monthly' },
      "payingParent": { p1: payingParent },
      "parentingTime": { p1: 0 },
      "useParentingDeviation": { p1: false },
    });

    const line9 = engineResult.breakdown.baseSupport + engineResult.breakdown.ssrAdjustment;

    // Expected values from prompt:
    // Table $8,000/2 children: $960×2=$1,920
    // P1 share 62.5%: $1,920×62.5%=$1,200
    // SSR: $5,000-$1,200=$3,800 > $2,394 -> Line 9 is $1,200
    expect(line9).toBe(1200);

    const creditPercent = getParentingCreditPercent(payingParentTime, useCredit);
    const creditAmount = line9 * creditPercent;
    // Expected: 25% of $1,200 = $300
    expect(creditAmount).toBe(300);

    const finalTransfer = Math.max(line9 - creditAmount, 50 * childrenCount);
    // Expected: $1,200 - $300 = $900
    expect(finalTransfer).toBe(900);
  });

  test('Test Case 2 — 70/30 schedule: P1=$5,000 / P2=$0 / 2 children (P1 is payer with 30% time)', () => {
    const p1 = 5000;
    const p2 = 0;
    const childrenCount = 2;
    const payingParent = 'P1';
    const payingParentTime = 30;
    const useCredit = true;

    const engineResult = calculateChildSupport({
      "1a": { p1, p2 },
      "5_children": { p1: childrenCount },
      "incomeType": { p1: 'monthly' },
      "payingParent": { p1: payingParent },
      "parentingTime": { p1: 0 },
      "useParentingDeviation": { p1: false },
    });

    const line9 = engineResult.breakdown.baseSupport + engineResult.breakdown.ssrAdjustment;

    // Expected values from prompt:
    // Table $5,000/2 children: $723×2=$1,446
    // P1 share 100%: $1,446
    // SSR: $5,000-$1,446=$3,554 > $2,394 -> Line 9 is $1,446
    expect(line9).toBe(1446);

    const creditPercent = getParentingCreditPercent(payingParentTime, useCredit);
    // Expected: (30/50) * 0.25 = 0.6 * 0.25 = 0.15 (15%)
    expect(creditPercent).toBe(0.15);

    const creditAmount = line9 * creditPercent;
    // Expected: $1,446 * 0.15 = $216.90
    expect(creditAmount).toBeCloseTo(216.90, 2);

    const finalTransfer = Math.max(line9 - creditAmount, 50 * childrenCount);
    // Expected: $1,446 - $216.90 = $1,229.10 -> $1,229
    expect(Math.round(finalTransfer)).toBe(1229);
  });

  test('Test Case 3 — 50/50 with SSR: P1=$3,000 / P2=$0 / 1 child', () => {
    const p1 = 3000;
    const p2 = 0;
    const childrenCount = 1;
    const payingParent = 'P1';
    const payingParentTime = 50;
    const useCredit = true;

    const engineResult = calculateChildSupport({
      "1a": { p1, p2 },
      "5_children": { p1: childrenCount },
      "incomeType": { p1: 'monthly' },
      "payingParent": { p1: payingParent },
      "parentingTime": { p1: 0 },
      "useParentingDeviation": { p1: false },
    });

    const line9 = engineResult.breakdown.baseSupport + engineResult.breakdown.ssrAdjustment;

    // Expected values from prompt:
    // Table $3,000/1 child: $652×1=$652
    // P1 share 100%: $652
    // SSR: $3,000 - $652 = $2,348 < $2,394
    // SSR applies: $3,000 - $2,394 = $606 -> Line 9 is $606
    expect(line9).toBe(606);

    const creditPercent = getParentingCreditPercent(payingParentTime, useCredit);
    // Expected: 25% of $606 = $151.50
    expect(creditPercent).toBe(0.25);

    const creditAmount = line9 * creditPercent;
    expect(creditAmount).toBe(151.50);

    const finalTransfer = Math.max(line9 - creditAmount, 50 * childrenCount);
    // Expected: $606 - $151.50 = $454.50 -> $455
    expect(Math.round(finalTransfer)).toBe(455);
  });
});
