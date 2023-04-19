interface IUser {
  id: number;
  nickname: string;
  email: string;
  password: string | null;
  photoUrl: string | null;
}

export type { IUser };
