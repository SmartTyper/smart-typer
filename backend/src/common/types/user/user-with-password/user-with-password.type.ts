import { UserDto } from 'smart-typer-shared/common/types/types';

type UserWithPassword = UserDto & {
  password: string | null;
};

export type { UserWithPassword };
