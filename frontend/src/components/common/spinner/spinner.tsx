import { FC } from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import { SpinnerSize } from 'common/enums/enums';
import { sizeToRem } from './common/maps/maps';

import styles from './styles.module.scss';

type Props = {
  size: SpinnerSize;
};

const Spinner: FC<Props> = ({ size }) => {
  const sizeInRem = sizeToRem[size];

  return (
    <div className={styles.spinner}>
      <BootstrapSpinner
        animation="border"
        variant="secondary"
        role="status"
        style={{ width: sizeInRem, height: sizeInRem }}
      />
    </div>
  );
};

export { Spinner };
