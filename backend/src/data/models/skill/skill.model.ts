import { Model, RelationMappings } from 'objection';

import {
  CommonKey,
  TableName,
  LessonToSkillKey,
  SkillKey,
  SkillRelationMappings,
} from 'common/enums/enums';
import { ISkillRecord } from 'common/interfaces/interfaces';
import { Lesson } from 'data/models/models';

import { Base } from '../base/base.model';

class Skill extends Base implements ISkillRecord {
  public [SkillKey.NAME]!: ISkillRecord[SkillKey.NAME];

  public static override get relationMappings(): RelationMappings {
    return {
      [SkillRelationMappings.LESSONS]: {
        relation: Model.ManyToManyRelation,
        modelClass: Lesson,
        join: {
          from: `${TableName.SKILLS}.${CommonKey.ID}`,
          through: {
            from: `${TableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.SKILL_ID}`,
            to: `${TableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.LESSON_ID}`,
          },
          to: `${TableName.LESSONS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return TableName.SKILLS;
  }
}

export { Skill };
