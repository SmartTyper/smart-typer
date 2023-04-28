import { FC, UserDto } from 'common/types/types';
import { RBNavbar } from 'components/external/external';
import { AppRoute } from 'common/enums/enums';
import { NavItem, ProfileDropdown } from './components/components';
import { useDispatch, useEffect, useNavigate, useSelector } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { replaceRouteIdParam } from 'helpers/helpers';

import styles from './styles.module.scss';

const Header: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogOutLoading, user } = useSelector(({ auth, request }) => ({
    user: auth.user,
    isLogOutLoading: request.authLogOut,
  }));
  const userId = (user as UserDto).id;

  const handleLogout = (): void => {
    dispatch(authActions.logOut());
  };

  useEffect(() => {
    if (!isLogOutLoading && user) navigate(AppRoute.LOG_IN);
  }, [isLogOutLoading, user]);

  const profileDropdownLinks = [
    {
      link: replaceRouteIdParam(AppRoute.PROFILE_$ID, userId),
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
