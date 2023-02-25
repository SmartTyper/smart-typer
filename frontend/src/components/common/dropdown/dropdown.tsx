import { Dropdown as ReactDropdown, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FC } from 'common/types/types';
import { ILink, IButton } from './common/interfaces/interfaces';
import { IconButton } from 'components/common/icon-button/icon-button';

import styles from './styles.module.scss';

type Props = {
  links: ILink[];
  buttons: IButton[];
};

const Dropdown: FC<Props> = ({ children, links, buttons }) => {
  return (
    <ReactDropdown as={NavItem} align="end" className={styles.dropdown}>
      <ReactDropdown.Toggle as={NavLink} className={styles.dropdownToggle}>
        {children}
      </ReactDropdown.Toggle>
      <ReactDropdown.Menu className={styles.dropdownMenu}>
        {links.map(({ link, label, iconName }) => {
          return (
            <ReactDropdown.Item
              to={link}
              as={Link}
              key={label}
              className={styles.dropdownItem}
            >
              <div>
                <i className={iconName}></i>
                <span>{label}</span>
              </div>
            </ReactDropdown.Item>
          );
        })}
        <ReactDropdown.Divider />
        {buttons.map(({ label, iconName, onClick }) => {
          return (
            <ReactDropdown.Item
              as={IconButton}
              onClick={onClick}
              key={label}
              label={label}
              iconName={iconName}
              className={styles.dropdownItem}
            />
          );
        })}
      </ReactDropdown.Menu>
    </ReactDropdown>
  );
};

export { Dropdown };