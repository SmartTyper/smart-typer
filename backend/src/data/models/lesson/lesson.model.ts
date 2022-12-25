import { Model, RelationMappings } from 'objection';

import {
  CommonKey,
  DbTableName,
  LessonKey,
  LessonToSkillKey,
} from '~/common/enums/enums';
import { ILessonRecord } from '~/common/interfaces/interfaces';

import { Base } from '../base/base.model';
import { Skill } from '../skill/skill.model';

class Lesson extends Base implements ILessonRecord {
  public [LessonKey.NAME]!: ILessonRecord[LessonKey.NAME];

  public [LessonKey.CONTENT_TYPE]!: ILessonRecord[LessonKey.CONTENT_TYPE];

  public [LessonKey.CREATOR_TYPE]!: ILessonRecord[LessonKey.CREATOR_TYPE];

  public [LessonKey.HAS_VOICE_ACTING]!: ILessonRecord[LessonKey.HAS_VOICE_ACTING];

  public [LessonKey.MUSIC_ACTING_URL]!: ILessonRecord[LessonKey.MUSIC_ACTING_URL];

  public [LessonKey.CONTENT]!: ILessonRecord[LessonKey.CONTENT];

  public static override get relationMappings(): RelationMappings {
    return {
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skill,
        join: {
          from: `${DbTableName.LESSONS}.${CommonKey.ID}`,
          through: {
            from: `${DbTableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.LESSON_ID}`,
            to: `${DbTableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.SKILL_ID}`,
          },
          to: `${DbTableName.SKILLS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.LESSONS;
  }
}

export { Lesson };
