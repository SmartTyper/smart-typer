import { LessonResponseDto } from 'common/types/types';

type LessonWithSkillNames = LessonResponseDto & {
  skills: {
    name: string;
  }[];
};

export type { LessonWithSkillNames };
