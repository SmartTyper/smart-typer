import { CommonKey } from 'common/enums/enums';
import { UserDto } from 'common/types/types';

type ParticipantIdDto = {
  participantId: UserDto[CommonKey.ID];
};

export type { ParticipantIdDto };
