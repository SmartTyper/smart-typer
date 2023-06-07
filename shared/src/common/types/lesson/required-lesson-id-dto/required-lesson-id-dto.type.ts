import { CommonKey } from 'common/enums/enums';
import { LessonDto } from 'common/types/types';

type RequiredLessonIdDto = {
  lessonId: NonNullable<LessonDto[CommonKey.ID]>;
};

export type { RequiredLessonIdDto };
