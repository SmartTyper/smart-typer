import { LessonDto, Skill } from 'common/types/types';

type LessonWithSkillsDto = Pick<LessonDto, 'id' | 'name' | 'content'> & {
  skills: Skill[];
};

export type { LessonWithSkillsDto };
