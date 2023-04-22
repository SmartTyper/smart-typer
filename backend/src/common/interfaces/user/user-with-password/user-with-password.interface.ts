import { IUser } from 'smart-typer-shared/common/interfaces/interfaces';

interface IUserWithPassword extends IUser {
  password: string | null;
}

export type { IUserWithPassword };
