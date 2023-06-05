import { Participant, Rating } from 'common/types/types';

const mapParticipantsToRating = (participants: Participant[]): Rating => {
  return participants
    .map(({ id, nickname, photoUrl, position, spentTime }) => ({
      id,
      nickname,
      photoUrl,
      averageSpeed: position / spentTime,
    }))
    .sort((firstParticipant, secondParticipant) => {
      return secondParticipant.averageSpeed - firstParticipant.averageSpeed;
    });
};

export { mapParticipantsToRating };
