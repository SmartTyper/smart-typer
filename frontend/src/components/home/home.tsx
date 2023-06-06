import { FC } from 'common/types/types';
import laptopImg from 'assets/img/laptop.png';
import typingImg from 'assets/img/typing.gif';
import styles from './styles.module.scss';

const Home: FC = () => (
  <div className={styles.home}>
    <div className={styles.imgContainer}>
      <img src={laptopImg} alt="laptop" className={styles.laptop} />
      <img src={typingImg} alt="typing" className={styles.typing} />{' '}
    </div>
    <p className={styles.label}>Type with us!</p>
  </div>
);

export { Home };
