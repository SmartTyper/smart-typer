import { UserToSkillKey } from 'common/enums/enums';
import { LessonResponseDto, Skill } from 'common/types/types';

type LessonWithSkills = LessonResponseDto & {
  skills: (Omit<Skill, UserToSkillKey.LEVEL> & { count: number })[];
};

export type { LessonWithSkills };
