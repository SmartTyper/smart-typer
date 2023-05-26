import { DropdownButton, DropdownLink, FC } from 'common/types/types';
import { RBNavbar } from 'components/external/external';
import { AppRoute } from 'common/enums/enums';
import { NavItem, ProfileDropdown } from './components/components';
import { useDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/modules/actions';
import { replaceRouteIdParam } from 'helpers/helpers';

import styles from './styles.module.scss';

const Header: FC = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user as UserDto);
  const user = {
    id: 1,
    email: '1',
    nickname: 'user',
    photoUrl: null,
  };
  const userId = user.id;

  const handleLogout = (): void => {
    dispatch(authActions.logOut());
  };

  const profileDropdownLinks: DropdownLink[] = [
    {
      link: replaceRouteIdParam(AppRoute.USERS_$ID_PROFILE, userId),
      label: 'Profile',
      iconName: 'bi bi-person',
    },
    {
      link: AppRoute.SETTINGS,
      label: 'Settings',
      iconName: 'bi bi-gear',
    },
  ];

  const profileDropdownButtons: DropdownButton[] = [
    {
      label: 'Sign out',
      onClick: handleLogout,
      iconName: 'bi bi-box-arrow-right',
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.tabs}>
        <RBNavbar>
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
        </RBNavbar>
      </div>
      <div className={styles.profileMenu}>
        <RBNavbar>
          <ProfileDropdown
            links={profileDropdownLinks}
            buttons={profileDropdownButtons}
            userName="User Name"
            avatarSrc=""
          />
          <NavItem iconName="bi bi-house-fill" label="" route={AppRoute.ROOT} />
        </RBNavbar>
      </div>
    </header>
  );
};

export { Header };
