import math from 'mathjs';
import { PairwiseComparisonMatrix } from 'common/types/types';

const checkConsistency = (matrices: PairwiseComparisonMatrix[]): boolean => {
  const checkResults = [] as boolean[];

  for (const matrix of matrices) {
    const criterionEigenvalues = math.eigs(matrix).values as number[];
    const criterionMaxEigenValue = Math.max(...criterionEigenvalues);
    const CI = (criterionMaxEigenValue - matrix.length) / (matrix.length - 1);
    checkResults.push(CI <= matrix.length);
  }

  return checkResults.filter(Boolean).length === checkResults.length;
};

export { checkConsistency };
