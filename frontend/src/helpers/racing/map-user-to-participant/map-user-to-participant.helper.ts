import { DEFAULT_PARTICIPANT } from 'common/constants/constants';
import { Participant, UserDto } from 'common/types/types';

const mapUserToParticipant = (user: Omit<UserDto, 'email'>): Participant => {
  return {
    ...DEFAULT_PARTICIPANT,
    ...user,
  };
};

export { mapUserToParticipant };
