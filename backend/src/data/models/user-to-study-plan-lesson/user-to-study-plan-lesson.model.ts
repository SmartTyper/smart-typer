import { Model, RelationMappings } from 'objection';
import {
  CommonKey,
  TableName,
  UserToStudyPlanLessonKey,
  UserToStudyPlanLessonRelationMapping,
} from 'common/enums/enums';
import { IUserToStudyPlanLessonRecord } from 'common/interfaces/interfaces';
import { Lesson } from 'data/models/models';

import { Base } from '../base/base.model';

class UserToStudyPlanLesson
  extends Base
  implements IUserToStudyPlanLessonRecord
{
  public [UserToStudyPlanLessonKey.USER_ID]!: IUserToStudyPlanLessonRecord[UserToStudyPlanLessonKey.USER_ID];

  public [UserToStudyPlanLessonKey.LESSON_ID]!: IUserToStudyPlanLessonRecord[UserToStudyPlanLessonKey.LESSON_ID];

  public [UserToStudyPlanLessonKey.PRIORITY]!: IUserToStudyPlanLessonRecord[UserToStudyPlanLessonKey.PRIORITY];

  public static override get relationMappings(): RelationMappings {
    return {
      [UserToStudyPlanLessonRelationMapping.LESSON]: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lesson,
        join: {
          from: `${TableName.USERS_TO_STUDY_PLAN_LESSONS}.${UserToStudyPlanLessonKey.LESSON_ID}`,
          to: `${TableName.LESSONS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return TableName.USERS_TO_STUDY_PLAN_LESSONS;
  }
}

export { UserToStudyPlanLesson };
