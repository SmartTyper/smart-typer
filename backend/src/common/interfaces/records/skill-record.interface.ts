import { SkillKey } from '~/common/enums/enums';

interface ISkillRecord {
  [SkillKey.ID]: number;
  [SkillKey.NAME]: string;
  [SkillKey.CREATED_AT]: string;
  [SkillKey.UPDATED_AT]: string;
}

export type { ISkillRecord };
