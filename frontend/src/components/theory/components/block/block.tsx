import { ImageAlignment } from 'components/theory/common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  title: string;
  text: string;
  imageSrc?: string;
  imageAlignment?: ImageAlignment;
  children?: JSX.Element | JSX.Element[];
};

const Block: React.FC<Props> = ({
  children,
  title,
  text,
  imageSrc,
  imageAlignment = ImageAlignment.RIGHT,
}) => {
  return (
    <>
      <hr />
      <div className={styles.block}>
        <h4 className={styles.title}>{title}</h4>
        <div>
          <div className={styles.mainContent}>
            {imageSrc && imageAlignment === ImageAlignment.LEFT && (
              <img src={imageSrc} className={styles.image} />
            )}
            <div className={styles.text}>{text}</div>
            {imageSrc && imageAlignment === ImageAlignment.RIGHT && (
              <img src={imageSrc} className={styles.image} />
            )}
          </div>
          <div className={styles.text}>{children}</div>
        </div>
      </div>
    </>
  );
};

export { Block };
