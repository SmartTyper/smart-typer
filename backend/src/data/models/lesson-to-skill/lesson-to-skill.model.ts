import {
  CommonKey,
  LessonToSkillKey,
  LessonToSkillRelationMapping,
  TableName,
} from 'common/enums/enums';
import { ILessonToSkillRecord } from 'common/interfaces/interfaces';
import { Model, RelationMappings } from 'objection';
import { Base } from '../base/base.model';
import { Skill } from '../models';

class LessonToSkill extends Base implements ILessonToSkillRecord {
  public [LessonToSkillKey.SKILL_ID]!: ILessonToSkillRecord[LessonToSkillKey.SKILL_ID];

  public [LessonToSkillKey.LESSON_ID]!: ILessonToSkillRecord[LessonToSkillKey.LESSON_ID];

  public [LessonToSkillKey.COUNT]!: ILessonToSkillRecord[LessonToSkillKey.COUNT];

  public static override get relationMappings(): RelationMappings {
    return {
      [LessonToSkillRelationMapping.SKILL]: {
        relation: Model.BelongsToOneRelation,
        modelClass: Skill,
        join: {
          from: `${TableName.LESSONS_TO_SKILLS}.${LessonToSkillKey.SKILL_ID}`,
          to: `${TableName.SKILLS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return TableName.LESSONS_TO_SKILLS;
  }
}

export { LessonToSkill };
