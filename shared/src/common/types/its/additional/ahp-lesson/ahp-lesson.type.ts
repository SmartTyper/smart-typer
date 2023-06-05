import { ContentType } from 'common/enums/enums';
import { AhpSkillCountInLesson } from 'common/types/types';

type AhpLesson = {
  lessonId: number;
  contentType: ContentType;
  skillsCountInLesson: AhpSkillCountInLesson[];
};

export type { AhpLesson };
