import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  title: string;
  imageSrc: string;
  to: AppRoute;
};

const ModeCard: React.FC<Props> = ({ title, imageSrc, to }) => {
  return (
    <Link to={to}>
      <div className={styles.modeCard}>
        <img src={imageSrc} alt={title} className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
      </div>
    </Link>
  );
};

export { ModeCard };
