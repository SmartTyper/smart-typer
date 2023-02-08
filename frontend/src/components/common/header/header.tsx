import { FC } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { AvatarSize } from 'common/enums/enums';
import { NavItem } from './components/components';
import { UserLabel } from '../user-label/user-label';

import styles from './styles.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.tabs}>
        <NavItem iconName="bi bi-book" label="Theory" route={AppRoute.THEORY} />
        <NavItem
          iconName="bi bi-collection"
          label="Lessons"
          route={AppRoute.LESSONS}
        />
        <NavItem
          iconName="bi bi-card-list"
          label="Study Plan"
          route={AppRoute.STUDY_PLAN}
        />
        <NavItem
          iconName="bi bi-car-front"
          label="Racing"
          route={AppRoute.RACING}
        />
      </div>
      <div className={styles.profileMenu}>
        <UserLabel
          username="User Name"
          avatarSize={AvatarSize.SMALL}
          textColor="white"
        />
        <NavItem iconName="bi bi-house-fill" label="" route={AppRoute.ROOT} />
      </div>
    </header>
  );
};

export { Header };
