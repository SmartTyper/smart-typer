import { VoidCallback } from 'common/types/types';
import { MILLISECONDS_IN_SECOND } from 'common/constants/constants';

const setTimer = (upperBound: number, action: VoidCallback<number>): void => {
  let counter = upperBound;
  const timerIncreaser = (): void => {
    counter--;
    action(counter);
    if (counter <= 0) {
      clearInterval(timer);
    }
  };
  const timer = setInterval(timerIncreaser, MILLISECONDS_IN_SECOND);
};

export { setTimer };
