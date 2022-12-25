import { LessonKey } from '~/common/enums/enums';

interface ILessonRecord {
  [LessonKey.ID]: number;
  [LessonKey.NAME]: string;
  [LessonKey.CONTENT_TYPE]: string;
  [LessonKey.CREATOR_TYPE]: string;
  [LessonKey.HAS_VOICE_ACTING]: boolean;
  [LessonKey.MUSIC_ACTING_URL]: string | null;
  [LessonKey.CONTENT]: string;
  [LessonKey.CREATED_AT]: string;
  [LessonKey.UPDATED_AT]: string;
}

export type { ILessonRecord };
