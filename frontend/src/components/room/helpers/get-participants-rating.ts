import { IParticipant, IParticipantsResult } from 'common/interfaces';

const getParticipantsRating = (
  participants: IParticipant[],
): IParticipantsResult[] => {
  return participants
    .map(({ fullName, photoUrl, spentSeconds, position, id }) => ({
      id,
      fullName,
      photoUrl,
      speed: position / spentSeconds,
    }))
    .sort((firstParticipant, secondParticipant) => {
      return secondParticipant.speed - firstParticipant.speed;
    });
};

export { getParticipantsRating };
