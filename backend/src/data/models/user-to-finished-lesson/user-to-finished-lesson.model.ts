import { Model, RelationMappings } from 'objection';
import {
  UserToFinishedLessonKey,
  TableName,
  UserToFinishedLessonRelationMapping,
  CommonKey,
} from 'common/enums/enums';
import { IUserToFinishedLessonRecord } from 'common/interfaces/interfaces';
import { Skill } from 'data/models/models';

import { Base } from '../base/base.model';

class UserToFinishedLesson extends Base implements IUserToFinishedLessonRecord {
  public [UserToFinishedLessonKey.USER_ID]!: IUserToFinishedLessonRecord[UserToFinishedLessonKey.USER_ID];

  public [UserToFinishedLessonKey.LESSON_ID]!: IUserToFinishedLessonRecord[UserToFinishedLessonKey.LESSON_ID];

  public [UserToFinishedLessonKey.BEST_SKILL_ID]!: IUserToFinishedLessonRecord[UserToFinishedLessonKey.BEST_SKILL_ID];

  public [UserToFinishedLessonKey.AVERAGE_SPEED]!: IUserToFinishedLessonRecord[UserToFinishedLessonKey.AVERAGE_SPEED];

  public static override get relationMappings(): RelationMappings {
    return {
      [UserToFinishedLessonRelationMapping.SKILL]: {
        relation: Model.BelongsToOneRelation,
        modelClass: Skill,
        join: {
          from: `${TableName.USERS_TO_FINISHED_LESSONS}.${UserToFinishedLessonKey.BEST_SKILL_ID}`,
          to: `${TableName.SKILLS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return TableName.USERS_TO_FINISHED_LESSONS;
  }
}

export { UserToFinishedLesson };
