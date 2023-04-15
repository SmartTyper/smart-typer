import { SkillKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/record/common-record/common-record.interface';

interface ISkillRecord extends ICommonRecord {
  [SkillKey.NAME]: string;
}

export type { ISkillRecord };
