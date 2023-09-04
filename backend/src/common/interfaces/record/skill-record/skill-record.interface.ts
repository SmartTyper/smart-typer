import { SkillKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

interface ISkillRecord extends ICommonRecord {
  [SkillKey.NAME]: string;
}

export type { ISkillRecord };
