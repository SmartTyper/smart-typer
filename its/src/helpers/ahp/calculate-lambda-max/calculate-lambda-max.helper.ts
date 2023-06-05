import * as math from 'mathjs';
import { PairwiseComparisonMatrix } from 'common/types/types';

const calculateLambdaMax = (matrix: PairwiseComparisonMatrix): number => {
  const accuracy = 0.000000001;
  const xStart = Array(matrix.length).fill(1);
  let xPrev = xStart;
  let xCurrent = xStart;
  let prevRatio = 0;
  while (Math.abs(xCurrent[0] / xPrev[0] - prevRatio) > accuracy) {
    prevRatio = xCurrent[0] / xPrev[0];
    xPrev = xCurrent;
    xCurrent = math.multiply(matrix, xPrev);
  }
  const lambdaMax = xCurrent[0] / xPrev[0];
  return lambdaMax;
};

export { calculateLambdaMax };
