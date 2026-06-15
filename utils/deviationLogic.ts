import { calculateChildSupport } from './calculatorEngine';
import { convertGrossToNet } from './deviationTaxUtils';

export interface DeviationInput {
  obligorAnnual: number;
  obligeeAnnual: number;
  childrenCount: number;
  selectedReasons: {
    id: string;
    amount: number;
    direction: 'upward' | 'downward';
  }[];
}

export function calculateDeviationResult(input: DeviationInput) {
  const obligorNet = convertGrossToNet(input.obligorAnnual);
  const obligeeNet = convertGrossToNet(input.obligeeAnnual);

  const calc = calculateChildSupport({
    "incomeType": { p1: "monthly" },
    "1a": { p1: obligorNet, p2: obligeeNet },
    "5_children": { p1: input.childrenCount },
  });

  const standardObligation = calc.obligationP1;

  let netDeviation = 0;
  input.selectedReasons.forEach(reason => {
    if (reason.direction === 'upward') {
      netDeviation += reason.amount;
    } else {
      netDeviation -= reason.amount;
    }
  });

  const minFloor = input.childrenCount * 50;
  const adjustedObligation = Math.max(minFloor, standardObligation + netDeviation);

  return {
    obligorNet,
    obligeeNet,
    standardObligation,
    netDeviation,
    adjustedObligation
  };
}
