import { CommonKey, LessonKey } from 'common/enums/enums';
import { LessonDto } from 'common/types/types';

type LessonResponseDto = Pick<
  LessonDto,
  CommonKey.ID | LessonKey.NAME | LessonKey.CONTENT
>;

export type { LessonResponseDto };
