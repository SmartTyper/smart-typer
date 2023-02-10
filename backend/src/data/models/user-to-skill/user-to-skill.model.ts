import { TableName, UserToSkillKey } from 'common/enums/enums';
import { IUserToSkillRecord } from 'common/interfaces/interfaces';

import { Base } from '../base/base.model';

class UserToSkill extends Base implements IUserToSkillRecord {
  public [UserToSkillKey.SKILL_ID]!: IUserToSkillRecord[UserToSkillKey.SKILL_ID];

  public [UserToSkillKey.USER_ID]!: IUserToSkillRecord[UserToSkillKey.USER_ID];

  public [UserToSkillKey.LEVEL]!: IUserToSkillRecord[UserToSkillKey.LEVEL];

  public static override get tableName(): string {
    return TableName.USERS_TO_SKILLS;
  }
}

export { UserToSkill };
