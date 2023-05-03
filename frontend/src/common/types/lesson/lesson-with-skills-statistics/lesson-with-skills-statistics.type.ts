import { SkillStatistics } from 'common/types/types';
import { LessonDto } from 'smart-typer-shared/common/types/types';

type LessonWithSkillsStatistics = Pick<LessonDto, 'id' | 'name' | 'content'> & {
  skills: SkillStatistics[];
};

export type { LessonWithSkillsStatistics };
