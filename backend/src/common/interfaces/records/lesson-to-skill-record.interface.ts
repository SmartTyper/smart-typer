import { LessonToSkillKey } from '~/common/enums/enums';
import { ICommonRecord } from '~/common/interfaces/records/common-record.interface';

interface ILessonToSkillRecord extends ICommonRecord {
  [LessonToSkillKey.SKILL_ID]: number;
  [LessonToSkillKey.LESSON_ID]: number;
}

export type { ILessonToSkillRecord };
