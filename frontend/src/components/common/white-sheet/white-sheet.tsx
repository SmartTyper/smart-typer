import { FC } from 'common/types/types';
import { clsx } from 'helpers/helpers';
import { WhiteSheetSize } from 'common/enums/enums';

import styles from './styles.module.scss';

type Props = {
  size: WhiteSheetSize;
  children: JSX.Element;
};

const WhiteSheet: FC<Props> = ({ size, children }) => {
  return (
    <div className={clsx(styles.whiteSheet, styles[size])}>{children}</div>
  );
};

export { WhiteSheet };
