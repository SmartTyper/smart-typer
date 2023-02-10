import { Model, RelationMappings } from 'objection';

import {
  TableName,
  UserKey,
  CommonKey,
  RefreshTokenKey,
  SettingsKey,
  StatisticsKey,
  UserToStudyPlanLessonKey,
  UserToFinishedLessonKey,
  UserToRoomKey,
  UserToSkillKey,
} from 'common/enums/enums';
import { IUserRecord } from 'common/interfaces/interfaces';

import { Base } from '../base/base.model';
import { RefreshToken } from '../refresh-token/refresh-token.model';
import { Settings } from '../settings/settings.model';
import { Statistics } from '../statistics/statistics.model';
import { UserToStudyPlanLesson } from '../user-to-study-plan-lesson/user-to-study-plan-lesson.model';
import { UserToFinishedLesson } from '../user-to-finished-lesson/user-to-finished-lesson.model';
import { Room } from '../room/room.model';
import { Skill } from '../skill/skill.model';

class User extends Base implements IUserRecord {
  public [UserKey.NICK_NAME]!: IUserRecord[UserKey.NICK_NAME];

  public [UserKey.EMAIL]!: IUserRecord[UserKey.EMAIL];

  public [UserKey.PASSWORD]!: IUserRecord[UserKey.PASSWORD];

  public [UserKey.PHOTO_URL]!: IUserRecord[UserKey.PHOTO_URL];

  public static override get relationMappings(): RelationMappings {
    return {
      refreshToken: {
        relation: Model.HasOneRelation,
        modelClass: RefreshToken,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          to: `${TableName.REFRESH_TOKENS}.${RefreshTokenKey.USER_ID}`,
        },
      },
      settings: {
        relation: Model.HasOneRelation,
        modelClass: Settings,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          to: `${TableName.SETTINGS}.${SettingsKey.USER_ID}`,
        },
      },
      statistics: {
        relation: Model.HasOneRelation,
        modelClass: Statistics,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          to: `${TableName.STATISTICS}.${StatisticsKey.USER_ID}`,
        },
      },
      userToStudyPlanLessons: {
        relation: Model.ManyToManyRelation,
        modelClass: UserToStudyPlanLesson,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          through: {
            from: `${TableName.USERS_TO_STUDY_PLAN_LESSONS}.${UserToStudyPlanLessonKey.USER_ID}`,
            to: `${TableName.USERS_TO_STUDY_PLAN_LESSONS}.${UserToStudyPlanLessonKey.LESSON_ID}`,
          },
          to: `${TableName.LESSONS}.${CommonKey.ID}`,
        },
      },
      userToFinishedLessons: {
        relation: Model.ManyToManyRelation,
        modelClass: UserToFinishedLesson,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          through: {
            from: `${TableName.USERS_TO_FINISHED_LESSONS}.${UserToFinishedLessonKey.USER_ID}`,
            to: `${TableName.USERS_TO_FINISHED_LESSONS}.${UserToFinishedLessonKey.LESSON_ID}`,
          },
          to: `${TableName.LESSONS}.${CommonKey.ID}`,
        },
      },
      room: {
        relation: Model.BelongsToOneRelation,
        modelClass: Room,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          through: {
            from: `${TableName.USERS_TO_ROOMS}.${UserToRoomKey.USER_ID}`,
            to: `${TableName.USERS_TO_ROOMS}.${UserToRoomKey.ROOM_ID}`,
          },
          to: `${TableName.ROOMS}.${CommonKey.ID}`,
        },
      },
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skill,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          through: {
            from: `${TableName.USERS_TO_SKILLS}.${UserToSkillKey.USER_ID}`,
            to: `${TableName.USERS_TO_SKILLS}.${UserToSkillKey.SKILL_ID}`,
          },
          to: `${TableName.SKILLS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return TableName.USERS;
  }
}

export { User };
