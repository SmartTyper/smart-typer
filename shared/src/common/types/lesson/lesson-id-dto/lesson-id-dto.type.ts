import { CommonKey } from 'common/enums/enums';
import { LessonDto } from 'common/types/types';

type LessonIdDto = {
  lessonId: LessonDto[CommonKey.ID];
};

export type { LessonIdDto };
