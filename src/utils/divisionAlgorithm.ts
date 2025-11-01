export interface DivisionStep {
  step: number;
  operation: string;
  dividend: string;
  divisor: string;
  quotient: string;
  remainder: string;
  aluActive: boolean;
  controlState: string;
  description: string;
}

export const performDivision = (dividend: number, divisor: number, bits: number = 8): DivisionStep[] => {
  const steps: DivisionStep[] = [];
  
  if (divisor === 0) {
    return [{
      step: 0,
      operation: 'ERROR',
      dividend: dividend.toString(2).padStart(bits, '0'),
      divisor: '0',
      quotient: '0',
      remainder: '0',
      aluActive: false,
      controlState: 'ERROR',
      description: 'Division by zero is not allowed',
    }];
  }

  let quotient = 0;
  let remainder = dividend;
  let stepCount = 0;

  // Initial state
  steps.push({
    step: stepCount++,
    operation: 'INIT',
    dividend: dividend.toString(2).padStart(bits, '0'),
    divisor: divisor.toString(2).padStart(bits, '0'),
    quotient: quotient.toString(2).padStart(bits, '0'),
    remainder: remainder.toString(2).padStart(bits, '0'),
    aluActive: false,
    controlState: 'INITIALIZE',
    description: 'Load dividend and divisor into registers',
  });

  // Division algorithm (restoring division)
  while (remainder >= divisor && stepCount < 20) {
    // Subtract divisor from remainder
    const newRemainder = remainder - divisor;
    
    steps.push({
      step: stepCount++,
      operation: 'SUBTRACT',
      dividend: dividend.toString(2).padStart(bits, '0'),
      divisor: divisor.toString(2).padStart(bits, '0'),
      quotient: quotient.toString(2).padStart(bits, '0'),
      remainder: remainder.toString(2).padStart(bits, '0'),
      aluActive: true,
      controlState: 'COMPUTE',
      description: `Subtract divisor from remainder: ${remainder} - ${divisor} = ${newRemainder}`,
    });

    remainder = newRemainder;
    quotient++;

    // Update quotient
    steps.push({
      step: stepCount++,
      operation: 'UPDATE',
      dividend: dividend.toString(2).padStart(bits, '0'),
      divisor: divisor.toString(2).padStart(bits, '0'),
      quotient: quotient.toString(2).padStart(bits, '0'),
      remainder: remainder.toString(2).padStart(bits, '0'),
      aluActive: false,
      controlState: 'UPDATE_Q',
      description: `Increment quotient to ${quotient}, remainder is ${remainder}`,
    });
  }

  // Final state
  steps.push({
    step: stepCount++,
    operation: 'COMPLETE',
    dividend: dividend.toString(2).padStart(bits, '0'),
    divisor: divisor.toString(2).padStart(bits, '0'),
    quotient: quotient.toString(2).padStart(bits, '0'),
    remainder: remainder.toString(2).padStart(bits, '0'),
    aluActive: false,
    controlState: 'DONE',
    description: `Division complete! ${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}`,
  });

  return steps;
};

export const binaryToDecimal = (binary: string): number => {
  return parseInt(binary, 2) || 0;
};

export const decimalToBinary = (decimal: number, bits: number = 8): string => {
  return decimal.toString(2).padStart(bits, '0');
};
