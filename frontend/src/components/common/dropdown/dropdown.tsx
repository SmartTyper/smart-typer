import { FC } from 'common/types/types';
import { RBDropdown, RBNavItem, RBNavLink } from 'components/external/external';
import { ILink, IButton } from './common/interfaces/interfaces';
import { IconButton } from 'components/common/icon-button/icon-button';
import { IconLink } from 'components/common/icon-link/icon-link';

import styles from './styles.module.scss';

type Props = {
  links: ILink[];
  buttons: IButton[];
};

const Dropdown: FC<Props> = ({ children, links, buttons }) => {
  return (
    <RBDropdown as={RBNavItem} align="end" className={styles.dropdown}>
      <RBDropdown.Toggle as={RBNavLink} className={styles.dropdownToggle}>
        {children}
      </RBDropdown.Toggle>
      <RBDropdown.Menu className={styles.dropdownMenu}>
        {links.map(({ link, label, iconName }) => {
          return (
            <RBDropdown.Item
              to={link}
              as={IconLink}
              key={label}
              className={styles.dropdownItem}
              iconName={iconName}
              label={label}
            />
          );
        })}
        <RBDropdown.Divider />
        {buttons.map(({ label, iconName, onClick }) => {
          return (
            <RBDropdown.Item
              as={IconButton}
              onClick={onClick}
              key={label}
              label={label}
              iconName={iconName}
              className={styles.dropdownItem}
            />
          );
        })}
      </RBDropdown.Menu>
    </RBDropdown>
  );
};

export { Dropdown };
