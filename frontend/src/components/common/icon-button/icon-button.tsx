import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  label?: string;
  iconName?: string;
  onClick: () => void;
};

const IconButton: FC<Props> = ({ label, iconName, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {iconName && <i className={iconName}></i>}
    {label && <span>{label}</span>}
  </button>
);

export { IconButton };
