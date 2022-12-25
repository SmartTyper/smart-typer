import { UserToSkillKey } from '~/common/enums/enums';

interface IUserToSkillRecord {
  [UserToSkillKey.ID]: number;
  [UserToSkillKey.SKILL_ID]: number;
  [UserToSkillKey.USER_ID]: number;
  [UserToSkillKey.LEVEL]: number;
  [UserToSkillKey.CREATED_AT]: string;
  [UserToSkillKey.UPDATED_AT]: string;
}

export type { IUserToSkillRecord };
