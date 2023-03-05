import { FC } from 'common/types/types';
import { RBSpinner } from 'components/external/external';
import { SpinnerSize } from 'common/enums/enums';
import { sizeToRem } from './maps/maps';

import styles from './styles.module.scss';

type Props = {
  size: SpinnerSize;
};

const Spinner: FC<Props> = ({ size }) => {
  const sizeInRem = sizeToRem[size];

  return (
    <div className={styles.spinner}>
      <RBSpinner
        animation="border"
        variant="secondary"
        role="status"
        style={{ width: sizeInRem, height: sizeInRem }}
      />
    </div>
  );
};

export { Spinner };
