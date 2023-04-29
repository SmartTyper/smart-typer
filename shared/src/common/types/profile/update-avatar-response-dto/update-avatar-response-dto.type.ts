import { UserDto } from 'common/types/types';

type UpdateAvatarResponseDto = Pick<UserDto, 'photoUrl'>;

export type { UpdateAvatarResponseDto };
