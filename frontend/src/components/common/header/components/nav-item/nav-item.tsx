import { FC } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import { useLocation } from 'hooks/hooks';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  route: AppRoute;
  label: string;
  iconName: string;
};

const NavItem: FC<Props> = ({ route, iconName, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname === route;

  return (
    <Link to={route}>
      <div className={clsx(styles.contentContainer, isActive && styles.active)}>
        <i className={iconName}></i>
        <span className={styles.label}>{label}</span>
      </div>
    </Link>
  );
};

export { NavItem };
