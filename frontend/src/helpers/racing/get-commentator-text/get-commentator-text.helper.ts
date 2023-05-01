import { CommentatorEvent } from 'common/enums/enums';
import { Participant } from 'common/types/types';
import {
  CAR_TEXT,
  GREETING_TEXT,
  TODAY_PARTICIPANTS_TEXT,
} from './common/constants/constants';
import { generateTextWithParticipantsEnumeration } from './helpers/helpers';

const getCommentatorText = (
  commentatorEvent: CommentatorEvent,
  participants?: Participant[],
): string => {
  switch (commentatorEvent) {
    case CommentatorEvent.GREETING: {
      return GREETING_TEXT;
    }
    case CommentatorEvent.GAME_START: {
      if (!participants?.length) {
        return '';
      }
      return generateTextWithParticipantsEnumeration(
        TODAY_PARTICIPANTS_TEXT,
        participants,
        CAR_TEXT,
      );
    }
    case CommentatorEvent.GAME_MIDDLE: {
      if (!participants?.length) {
        return '';
      }
      const participantsRating = [...(participants ?? [])].sort(
        (firstParticipant, secondParticipant) => {
          return secondParticipant.position - firstParticipant.position;
        },
      );
      return generateTextWithParticipantsEnumeration(
        TODAY_PARTICIPANTS_TEXT,
        participantsRating,
      );
    }
    default: {
      return '';
    }
  }
};

export { getCommentatorText };
