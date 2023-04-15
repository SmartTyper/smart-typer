import { LessonKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/record/common-record/common-record.interface';

interface ILessonRecord extends ICommonRecord {
  [LessonKey.NAME]: string;
  [LessonKey.CONTENT_TYPE]: string;
  [LessonKey.CREATOR_TYPE]: string;
  [LessonKey.HAS_VOICE_ACTING]: boolean;
  [LessonKey.MUSIC_ACTING_URL]: string | null;
  [LessonKey.CONTENT]: string;
}

export type { ILessonRecord };
