import { FC } from 'common/types/types';
import { RRDNavLink } from 'components/external/external';
import { AppRoute } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  route: AppRoute;
  label: string;
  iconName: string;
};

const NavItem: FC<Props> = ({ route, iconName, label }) => {
  return (
    <RRDNavLink to={route}>
      {({ isActive }): JSX.Element => (
        <div
          className={clsx(styles.contentContainer, isActive && styles.active)}
        >
          <i className={iconName}></i>
          <span className={styles.label}>{label}</span>
        </div>
      )}
    </RRDNavLink>
  );
};

export { NavItem };
