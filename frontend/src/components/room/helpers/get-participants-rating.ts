import { IParticipant, IParticipantsResult } from 'common/interfaces';

const getParticipantsRating = (
  participants: IParticipant[],
): IParticipantsResult[] => {
  return participants
    .map(({ fullName, photoUrl, spentTime, position, id }) => ({
      id,
      fullName,
      photoUrl,
      speed: position / spentTime,
    }))
    .sort((firstParticipant, secondParticipant) => {
      return secondParticipant.speed - firstParticipant.speed;
    });
};

export { getParticipantsRating };
