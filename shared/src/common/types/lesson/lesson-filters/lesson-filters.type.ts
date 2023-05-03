import { LessonDto } from 'common/types/types';

type LessonFilters = Partial<Pick<LessonDto, 'contentType' | 'creatorType'>>;

export type { LessonFilters };
