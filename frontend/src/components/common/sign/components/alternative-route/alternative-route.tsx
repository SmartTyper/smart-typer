import { FC } from 'common/types/types';
import { AlternativeRoute as Props } from '../../common/common';
import { RRDLink } from 'components/external/external';

import styles from './styles.module.scss';

const AlternativeRoute: FC<Props> = ({ label, path, linkText }) => {
  return (
    <div>
      <span>{label}</span>
      <RRDLink to={path}>
        <span className={styles.linkText}> {linkText}</span>
      </RRDLink>
    </div>
  );
};

export { AlternativeRoute };
