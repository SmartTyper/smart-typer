import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useNavigate } from 'hooks/hooks';

import laptopImg from 'assets/img/laptop.png';
import arIconImg from 'assets/img/ar-icon.png';
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
        <img src={laptopImg} alt="laptop" className={styles.laptop} />
        <img src={typingImg} alt="typing" className={styles.typing} />
      </div>
      <div className={styles.labelContainer}>
        <Button onClick={handleArButtonClick}>
          <img src={arIconImg} alt="AR icon" className={styles.laptop} />
        </Button>
        <p className={styles.label}>Type with us!</p>
      </div>
    </div>
  );
};

export { Home };
