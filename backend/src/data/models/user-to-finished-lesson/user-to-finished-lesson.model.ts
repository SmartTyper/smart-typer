import { UserToFinishedLessonKey, DbTableName } from '~/common/enums/enums';
import { IUserToFinishedLessonRecord } from '~/common/interfaces/interfaces';

import { Base } from '../base/base.model';

class UserToFinishedLesson extends Base implements IUserToFinishedLessonRecord {
  public [UserToFinishedLessonKey.USER_ID]!: IUserToFinishedLessonRecord[UserToFinishedLessonKey.USER_ID];

  public [UserToFinishedLessonKey.LESSON_ID]!: IUserToFinishedLessonRecord[UserToFinishedLessonKey.LESSON_ID];

  public [UserToFinishedLessonKey.AVERAGE_SPEED]!: IUserToFinishedLessonRecord[UserToFinishedLessonKey.AVERAGE_SPEED];

  public static override get tableName(): string {
    return DbTableName.USERS_TO_FINISHED_LESSONS;
  }
}

export { UserToFinishedLesson };
