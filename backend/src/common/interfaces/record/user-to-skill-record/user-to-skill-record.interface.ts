import { UserToSkillKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/record/common-record/common-record.interface';

interface IUserToSkillRecord extends ICommonRecord {
  [UserToSkillKey.SKILL_ID]: number;
  [UserToSkillKey.USER_ID]: number;
  [UserToSkillKey.LEVEL]: number;
}

export type { IUserToSkillRecord };
