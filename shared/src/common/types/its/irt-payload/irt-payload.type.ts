import { LessonKey } from 'common/enums/enums';
import { LessonDto, SkillLessonStatistics } from 'common/types/types';

type IrtPayload = {
  skills: SkillLessonStatistics[];
  lessonName: LessonDto[LessonKey.NAME];
};

export type { IrtPayload };
