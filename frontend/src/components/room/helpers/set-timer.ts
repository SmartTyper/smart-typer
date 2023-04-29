import { MILLISECONDS_IN_SECOND } from 'common/constants';

const setTimer = (startValue: number, action: () => void): void => {
  let limit = startValue;
  const timerIncreaser = (): void => {
    action();
    limit--;
    if (limit <= 0) {
      clearInterval(timer);
    }
  };
  const timer = setInterval(timerIncreaser, MILLISECONDS_IN_SECOND);
};

export { setTimer };
