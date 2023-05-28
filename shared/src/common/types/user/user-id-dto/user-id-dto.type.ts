import { CommonKey } from 'common/enums/enums';
import { UserDto } from 'common/types/types';

type UserIdDto = {
  userId: UserDto[CommonKey.ID];
};

export type { UserIdDto };
