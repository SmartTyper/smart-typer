import { FC } from 'common/types/types';
import { RBSpinner } from 'components/external/external';
import { SpinnerSize } from 'common/enums/enums';
import { SizeToRem } from './maps/maps';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  size: SpinnerSize;
  isCentered?: boolean;
};

const Spinner: FC<Props> = ({ size, isCentered = true }) => {
  const sizeInRem = SizeToRem[size];

  return (
    <div className={clsx(styles.spinner, isCentered && styles.centered)}>
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
