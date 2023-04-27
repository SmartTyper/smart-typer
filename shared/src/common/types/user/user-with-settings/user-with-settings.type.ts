import { Settings } from '../../settings/settings.type';
import { User } from '../user/user.type';

type UserWithSettings = User & {
  settings: Settings;
};

export type { UserWithSettings };
