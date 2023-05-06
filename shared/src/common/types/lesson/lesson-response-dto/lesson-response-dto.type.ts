import { LessonDto } from 'common/types/types';

type LessonResponseDto = Pick<LessonDto, 'id' | 'name' | 'content'>;

export type { LessonResponseDto };
