import { SkillKey } from '~/common/enums/enums';
import { ICommonRecord } from '~/common/interfaces/records/common-records/common-record.interface';

interface ISkillRecord extends ICommonRecord {
  [SkillKey.NAME]: string;
}

export type { ISkillRecord };
