import { FC, SyntheticEvent } from 'common/types/types';
import { Button } from '../../../button/button';

import styles from './styles.module.scss';

type Props = {
  isDisabled: boolean;
  onSubmit: (e: SyntheticEvent) => void;
  label: string;
};

const SubmitButton: FC<Props> = ({ isDisabled, onSubmit, label }) => {
  return (
    <Button
      onClick={onSubmit}
      key={label}
      label={label}
      isLoading={isDisabled}
      className={styles.submitButton}
    />
  );
};

export { SubmitButton };
