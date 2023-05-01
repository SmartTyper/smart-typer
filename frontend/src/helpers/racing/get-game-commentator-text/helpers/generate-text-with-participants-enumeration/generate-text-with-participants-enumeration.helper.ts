import { Participant } from 'common/types/types';

const generateTextWithParticipantsEnumeration = (
  introText: string,
  participants: Participant[],
  additionalText?: string,
): string => {
  const optionalText = additionalText ? additionalText + ' ' : '';
  const commentatorText =
    introText +
    participants
      .map(
        (participant, i) =>
          `${optionalText}${i + 1} is ${participant.nickname}`,
      )
      .join('\n');
  return commentatorText;
};

export { generateTextWithParticipantsEnumeration };
