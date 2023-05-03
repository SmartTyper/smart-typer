import { Skill } from 'common/types/types';

type SkillResult = Skill & {
  misclickCount: number;
  spentSecondsAvg: number;
};

export type { SkillResult };
