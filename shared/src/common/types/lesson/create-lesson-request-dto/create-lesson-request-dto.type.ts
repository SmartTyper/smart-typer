import { LessonDto } from 'common/types/types';

type CreateLessonRequestDto = Pick<
  LessonDto,
  'name' | 'contentType' | 'creatorType' | 'content'
> & {
  creatorId: number;
};

export type { CreateLessonRequestDto };
