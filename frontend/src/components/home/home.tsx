import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useNavigate } from 'hooks/hooks';

import laptopImg from 'assets/img/laptop.png';
import arImg from 'assets/img/ar.png';
import typingImg from 'assets/img/typing.gif';

import styles from './styles.module.scss';

const Home: FC = () => {
  const navigate = useNavigate();

  const handleArButtonClick = (): void => {
    navigate(AppRoute.AR_CAMERA);
  };

  return (
    <div className={styles.home}>
      <div className={styles.imgContainer}>
        <img src={laptopImg} alt="laptop" className={styles.laptopImg} />
        <img src={typingImg} alt="typing" className={styles.typingImg} />
      </div>
      <p className={styles.label}>Type with us!</p>
      <Button onClick={handleArButtonClick} className={styles.arButton}>
        <img src={arImg} alt="AR icon" className={styles.arImg} />
      </Button>
    </div>
  );
};

export { Home };
