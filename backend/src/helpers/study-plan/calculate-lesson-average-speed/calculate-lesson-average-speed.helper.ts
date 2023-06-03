import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
} from 'common/constants/constants';

const calculateLessonAverageSpeed = (
  lessonContent: string,
  timestamps: number[],
): number => {
  const lessonDuration =
    ([...timestamps].pop() as number) - ([...timestamps].shift() as number);
  const lessonDurationInMinutes =
    lessonDuration / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE;

  return Math.floor(lessonContent.length / lessonDurationInMinutes);
};

export { calculateLessonAverageSpeed };
