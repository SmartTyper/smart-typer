import { LessonKey } from 'common/enums/enums';
import { LessonDto } from 'common/types/types';

type LessonFilters = Partial<
  Pick<LessonDto, LessonKey.CREATOR_TYPE | LessonKey.CONTENT_TYPE>
>;

export type { LessonFilters };
