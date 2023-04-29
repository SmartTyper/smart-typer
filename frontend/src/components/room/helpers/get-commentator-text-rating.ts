import { CommentatorEvent } from 'common/enums';
import { IParticipant } from 'common/interfaces';

const getCommentatorText = (
  commentatorEvent: CommentatorEvent,
  participants?: IParticipant[],
): string => {
  switch (commentatorEvent) {
    case CommentatorEvent.GREETING: {
      // eslint-disable-next-line max-len
      return 'Good day, dear racing fans! Your attention is invited to an incredible arrival. The motors growl, the participants are determined only to win. An exciting spectacle awaits us, I will comment on it - Escape Enter.';
    }
    case CommentatorEvent.GAME_START: {
      if (!participants) {
        return '';
      }
      let commentatorText = 'Well, let\'s list today\'s participants:\n';
      participants.forEach((participant, i) => {
        commentatorText += `- on a ferrari with number ${i + 1} is ${
          participant.fullName
        }.\n`;
      });
      return commentatorText;
    }
    case CommentatorEvent.GAME_MIDDLE: {
      if (!participants) {
        return '';
      }
      const participantsRating = [...participants].sort(
        (firstParticipant, secondParticipant) => {
          return secondParticipant.position - firstParticipant.position;
        },
      );
      let commentatorText = 'Now the situation is like this:\n';
      participantsRating.forEach((participant, i) => {
        commentatorText += `${i + 1}. is ${participant.fullName}\n`;
      });
      return commentatorText;
    }
    default: {
      return '';
    }
  }
};

export { getCommentatorText };
