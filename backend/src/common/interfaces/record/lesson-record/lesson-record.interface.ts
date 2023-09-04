import { LessonKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

interface ILessonRecord extends ICommonRecord {
  [LessonKey.NAME]: string;
  [LessonKey.CONTENT_TYPE]: string;
  [LessonKey.CREATOR_ID]: number | null;
  [LessonKey.CONTENT]: string;
}

export type { ILessonRecord };
