import { LessonResponseDto, Skill } from 'common/types/types';

type LessonWithSkills = LessonResponseDto & {
  skills: (Omit<Skill, 'level'> & { count: number })[];
};

export type { LessonWithSkills };
