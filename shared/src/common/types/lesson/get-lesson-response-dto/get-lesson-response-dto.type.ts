import { LessonDto } from 'common/types/types';

type GetLessonResponseDto = Pick<LessonDto, 'id' | 'name' | 'content'>;

export type { GetLessonResponseDto };
