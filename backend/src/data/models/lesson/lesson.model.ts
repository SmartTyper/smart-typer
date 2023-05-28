import { Model, RelationMappings } from 'objection';
import {
  CommonKey,
  TableName,
  LessonKey,
  LessonToSkillKey,
  LessonRelationMappings,
  UserToFinishedLessonKey,
  UserToStudyPlanLessonKey,
} from 'common/enums/enums';
import { ILessonRecord } from 'common/interfaces/interfaces';
import {
  LessonToSkill,
  Skill,
  UserToFinishedLesson,
  UserToStudyPlanLesson,
} from 'data/models/models';

import { Base } from '../base/base.model';

class Lesson extends Base implements ILessonRecord {
  public [LessonKey.NAME]!: ILessonRecord[LessonKey.NAME];

  public [LessonKey.CONTENT_TYPE]!: ILessonRecord[LessonKey.CONTENT_TYPE];

  public [LessonKey.CREATOR_ID]!: ILessonRecord[LessonKey.CREATOR_ID];

  public [LessonKey.CONTENT]!: ILessonRecord[LessonKey.CONTENT];

  public static override get relationMappings(): RelationMappings {
    return {
      [LessonRelationMappings.SKILLS]: {
        relation: Model.ManyToManyRelation,
        modelClass: Skill,
        join: {
          from: `${TableName.LESSONS}.${CommonKey.ID}`,
          through: {
            from: `${TableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.LESSON_ID}`,
            to: `${TableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.SKILL_ID}`,
          },
          to: `${TableName.SKILLS}.${CommonKey.ID}`,
        },
      },
      [LessonRelationMappings.FINISHED_LESSON]: {
        relation: Model.HasManyRelation,
        modelClass: UserToFinishedLesson,
        join: {
          from: `${TableName.LESSONS}.${CommonKey.ID}`,
          to: `${TableName.USERS_TO_FINISHED_LESSONS}.${UserToFinishedLessonKey.LESSON_ID}`,
        },
      },
      [LessonRelationMappings.STUDY_PLAN]: {
        relation: Model.HasManyRelation,
        modelClass: UserToStudyPlanLesson,
        join: {
          from: `${TableName.LESSONS}.${CommonKey.ID}`,
          to: `${TableName.USERS_TO_STUDY_PLAN_LESSONS}.${UserToStudyPlanLessonKey.LESSON_ID}`,
        },
      },
      [LessonRelationMappings.LESSON_TO_SKILLS]: {
        relation: Model.HasManyRelation,
        modelClass: LessonToSkill,
        join: {
          from: `${TableName.LESSONS}.${CommonKey.ID}`,
          to: `${TableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.LESSON_ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return TableName.LESSONS;
  }
}

export { Lesson };
