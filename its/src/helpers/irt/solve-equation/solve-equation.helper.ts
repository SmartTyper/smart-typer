/* eslint-disable @typescript-eslint/no-explicit-any */
import math from 'mathjs';

const solveEquation = (
  equation: string,
  equationDerivative: string,
): number | undefined => {
  const f = (x: number): any => math.evaluate(equation, { x });
  const fp = (x: number): any =>
    math.derivative(equationDerivative, 'x').evaluate({ x });

  let currentValue = 0,
    nextValue,
    functionValue,
    functionDerivative;

  const tolerance = 1e-7;

  for (let i = 0; i < 20; i++) {
    functionValue = f(currentValue);

    if (fp) {
      functionDerivative = fp(currentValue);
    }

    if (
      Math.abs(functionDerivative) <=
      Number.EPSILON * Math.abs(functionValue)
    ) {
      return undefined;
    }

    nextValue = currentValue - functionValue / functionDerivative;

    if (Math.abs(nextValue - currentValue) <= tolerance * Math.abs(nextValue)) {
      return nextValue;
    }

    currentValue = nextValue;
  }

  return undefined;
};

export { solveEquation };
