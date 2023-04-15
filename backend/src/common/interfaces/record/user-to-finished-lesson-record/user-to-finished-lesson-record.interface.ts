import { UserToFinishedLessonKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/record/common-record/common-record.interface';

interface IUserToFinishedLessonRecord extends ICommonRecord {
  [UserToFinishedLessonKey.USER_ID]: number;
  [UserToFinishedLessonKey.LESSON_ID]: number;
  [UserToFinishedLessonKey.AVERAGE_SPEED]: number;
}

export type { IUserToFinishedLessonRecord };
