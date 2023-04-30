import { VoidAction } from 'common/types/types';
import { MILLISECONDS_IN_SECOND } from 'common/constants/constants';

const setTimer = (startValue: number, action: VoidAction): void => {
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
