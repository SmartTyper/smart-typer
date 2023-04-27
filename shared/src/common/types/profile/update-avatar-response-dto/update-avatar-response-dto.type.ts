import { User } from 'common/types/user/user';

type updateAvatarResponseDto = Pick<User, 'photoUrl'>;

export type { updateAvatarResponseDto };
