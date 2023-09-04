import { CommonKey, CreatorType } from 'common/enums/enums';
import { UserDto } from 'common/types/types';

type DefineCreatorType = {
  userId: UserDto[CommonKey.ID];
  creatorId: UserDto[CommonKey.ID];
};

const defineCreatorType = ({
  userId,
  creatorId,
}: DefineCreatorType): CreatorType => {
  const creatorType =
    userId === creatorId
      ? CreatorType.CURRENT_USER
      : creatorId
        ? CreatorType.OTHER_USERS
        : CreatorType.SYSTEM;

  return creatorType;
};

export { defineCreatorType };
