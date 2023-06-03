import { LessonKey } from 'common/enums/enums';
import { LessonDto, LessonWithSkills } from 'common/types/types';

type LessonWithSkillsAndContentType = Omit<
  LessonWithSkills,
  LessonKey.CONTENT | LessonKey.NAME
> &
  Pick<LessonDto, LessonKey.CONTENT_TYPE>;

export type { LessonWithSkillsAndContentType };
