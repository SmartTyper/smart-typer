import { DEFAULT_PARTICIPANT } from 'common/constants/constants';
import { UserKey } from 'common/enums/enums';
import { Participant, UserDto } from 'common/types/types';

const mapUserToParticipant = (
  user: Omit<UserDto, UserKey.EMAIL>,
): Participant => {
  return {
    ...DEFAULT_PARTICIPANT,
    ...user,
  };
};

export { mapUserToParticipant };
