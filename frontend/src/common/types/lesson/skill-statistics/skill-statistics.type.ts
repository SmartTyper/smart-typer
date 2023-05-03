import { SkillResult } from 'smart-typer-shared/common/types/types';

type SkillStatistics = Omit<SkillResult, 'spentSecondsAvg'> & {
  spentSeconds: number[];
};

export type { SkillStatistics };
