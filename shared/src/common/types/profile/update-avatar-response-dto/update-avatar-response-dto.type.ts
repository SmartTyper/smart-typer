import { UserKey } from 'common/enums/enums';
import { UserDto } from 'common/types/types';

type UpdateAvatarResponseDto = Pick<UserDto, UserKey.PHOTO_URL>;

export type { UpdateAvatarResponseDto };
