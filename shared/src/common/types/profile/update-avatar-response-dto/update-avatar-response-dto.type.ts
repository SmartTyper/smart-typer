import { UserDto } from 'common/types/user/user';

type UpdateAvatarResponseDto = Pick<UserDto, 'photoUrl'>;

export type { UpdateAvatarResponseDto };
