import styles from './styles.module.scss';

type Props = {
  title: string;
  imageSrc: string;
};

const ModeCard: React.FC<Props> = ({ title, imageSrc }) => {
  return (
    <div className={styles.modeCard}>
      <img src={imageSrc} alt={title} className={styles.image} />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export { ModeCard };
