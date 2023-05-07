import { UserToFinishedLessonKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

interface IUserToFinishedLessonRecord extends ICommonRecord {
  [UserToFinishedLessonKey.USER_ID]: number;
  [UserToFinishedLessonKey.LESSON_ID]: number;
  [UserToFinishedLessonKey.AVERAGE_SPEED]: number;
  [UserToFinishedLessonKey.BEST_SKILL_ID]: number;
}

export type { IUserToFinishedLessonRecord };
