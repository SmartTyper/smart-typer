import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
} from 'common/constants/constants';

const getMinutesFromMilliseconds = (milliseconds: number): string => {
  const minutes = Math.floor(
    milliseconds / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE,
  );
  const seconds = Number(
    (
      (milliseconds % (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE)) /
      1000
    ).toFixed(0),
  );
  return seconds === SECONDS_IN_MINUTE
    ? minutes + 1 + ':00'
    : minutes + ' min ' + (seconds < 10 ? '0' : '') + seconds + ' s';
};

export { getMinutesFromMilliseconds };
