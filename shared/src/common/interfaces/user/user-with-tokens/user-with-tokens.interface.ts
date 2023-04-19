import { IUser } from '../user/user.interface';

interface IUserWithTokens extends Omit<IUser, 'password'> {
  accessToken: string;
  refreshToken: string;
}

export type { IUserWithTokens };
