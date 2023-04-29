import { UserToSkillKey } from 'common/enums/enums';
import { ICommonRecord } from 'common/interfaces/interfaces';

interface IUserToSkillRecord extends ICommonRecord {
  [UserToSkillKey.SKILL_ID]: number;
  [UserToSkillKey.USER_ID]: number;
  [UserToSkillKey.LEVEL]: number;
}

export type { IUserToSkillRecord };
