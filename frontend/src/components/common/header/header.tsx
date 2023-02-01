import { FC } from 'common/types/types';
import { NavItem } from './components/components';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';

import styles from './styles.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.actions}>
        <Link to={AppRoute.THEORY}>
          <NavItem iconName="bi bi-book" label="Theory" />
        </Link>
        <Link to={AppRoute.LESSONS}>
          <NavItem iconName="bi bi-collection" label="Lessons" />
        </Link>
        <Link to={AppRoute.STUDY_PLAN}>
          <NavItem iconName="bi bi-card-list" label="Study Plan" />
        </Link>
        <Link to={AppRoute.RACING}>
          <NavItem iconName="bi bi-car-front" label="Racing" />
        </Link>
      </div>
      <div className={styles.controls}>{/* SUB MENU */}</div>
    </header>
  );
};
