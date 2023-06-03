import { AhpPayload, AhpResult } from 'common/types/types';

const ahp = (payload: AhpPayload): AhpResult => {
  const random = Math.floor(Math.random() * payload.lessons.length);
  const { lessonId } = payload.lessons[random];
  return { lessonId };
};

export { ahp };
