type CalculateSkillConditionalPreviousLearnedProbabilityProps = {
  pKnown: number;
  pGuess: number;
  pSlip: number;
  isCorrect: boolean;
};

const calculateSkillConditionalPreviousLearnedProbability = ({
  pKnown,
  pGuess,
  pSlip,
  isCorrect,
}: CalculateSkillConditionalPreviousLearnedProbabilityProps): number => {
  const conditionalPSlip = isCorrect ? 1 - pSlip : pSlip;
  const conditionalPGuess = isCorrect ? pGuess : 1 - pGuess;
  return (
    (pKnown * conditionalPSlip) /
    (pKnown * conditionalPSlip + (1 - pKnown) * conditionalPGuess)
  );
};

export { calculateSkillConditionalPreviousLearnedProbability };
