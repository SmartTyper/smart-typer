import { LessonDto } from 'common/types/types';

type CreateLessonRequestDto = Pick<
  LessonDto,
  'name' | 'contentType' | 'content'
>;

export type { CreateLessonRequestDto };
