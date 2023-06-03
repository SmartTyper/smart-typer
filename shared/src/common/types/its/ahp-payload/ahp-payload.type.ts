import { AhpLesson, AhpSkillLevel } from 'common/types/types';

type AhpPayload = {
  lessons: AhpLesson[];
  lastFinishedLessonIds: number[];
  skillLevels: AhpSkillLevel[];
};

export type { AhpPayload };
