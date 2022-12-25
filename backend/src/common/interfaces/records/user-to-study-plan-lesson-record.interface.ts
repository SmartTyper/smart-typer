import { UserToStudyPlanLessonKey } from '~/common/enums/enums';
import { ICommonRecord } from '~/common/interfaces/records/common-record.interface';

interface IUserToStudyPlanLessonRecord extends ICommonRecord {
  [UserToStudyPlanLessonKey.USER_ID]: number;
  [UserToStudyPlanLessonKey.LESSON_ID]: number;
  [UserToStudyPlanLessonKey.PRIORITY]: number;
}

export type { IUserToStudyPlanLessonRecord };
