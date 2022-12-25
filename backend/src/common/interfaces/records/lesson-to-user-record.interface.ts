import { LessonToUserKey } from '~/common/enums/enums';

interface ILessonToUserRecord {
  [LessonToUserKey.ID]: number;
  [LessonToUserKey.USER_ID]: number;
  [LessonToUserKey.LESSON_ID]: number;
  [LessonToUserKey.AVERAGE_SPEED]: number;
  [LessonToUserKey.CREATED_AT]: string;
  [LessonToUserKey.UPDATED_AT]: string;
}

export type { ILessonToUserRecord };
