import { User } from 'smart-typer-shared/common/types/types';

type UserWithPassword = User & {
  password: string | null;
};

export type { UserWithPassword };
