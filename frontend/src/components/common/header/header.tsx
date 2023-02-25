import { FC } from 'common/types/types';
import { Navbar } from 'react-bootstrap';
import { AppRoute } from 'common/enums/enums';
import { NavItem, ProfileDropdown } from './components/components';

import styles from './styles.module.scss';

const Header: FC = () => {
  const profileDropdownLinks = [
    {
      link: AppRoute.PROFILE,
      label: 'Profile',
      iconName: 'bi bi-person',
    },
    {
      link: AppRoute.SETTINGS,
      label: 'Settings',
      iconName: 'bi bi-gear',
    },
  ];

  const profileDropdownButtons = [
    {
      label: 'Sign out',
      onClick: (): void => console.log(),
      iconName: 'bi bi-box-arrow-right',
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.tabs}>
        <Navbar>
          <NavItem
            iconName="bi bi-book"
            label="Theory"
            route={AppRoute.THEORY}
          />
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
        </Navbar>
      </div>
      <div className={styles.profileMenu}>
        <Navbar>
          <ProfileDropdown
            links={profileDropdownLinks}
            buttons={profileDropdownButtons}
            userName="User Name"
            avatarSrc=""
          />
          <NavItem iconName="bi bi-house-fill" label="" route={AppRoute.ROOT} />
        </Navbar>
      </div>
    </header>
  );
};

export { Header };