import { Modal, Card } from 'components/common/common';
import { FC, LessonDisplayedResult, VoidAction } from 'common/types/types';
import { CardHeaderColor, CardSize } from 'common/enums/enums';

import styles from './styles.module.scss';

type Props = {
  lessonResult: LessonDisplayedResult;
  isVisible: boolean;
  onClose: VoidAction;
};

const ResultsModal: FC<Props> = ({ lessonResult, isVisible, onClose }) => {
  const {
    averageSpeed,
    totalSymbols,
    correctSymbols,
    misclickSymbols,
    totalTime,
  } = lessonResult;

  return (
    <Modal
      isVisible={isVisible}
      onHide={onClose}
      title="Game results"
      className={styles.resultsModal}
    >
      <div className={styles.modalBody}>
        <div className={styles.cardsContainer}>
          <Card
            title="Average speed (spm)"
            color={CardHeaderColor.BLUE}
            size={CardSize.SMALL}
            centeredTitle
            className={styles.card}
          >
            <p className={styles.statisticValue}>{averageSpeed}</p>
          </Card>
          <Card
            title="Total symbols"
            color={CardHeaderColor.GREEN}
            size={CardSize.SMALL}
            centeredTitle
            className={styles.card}
          >
            <p className={styles.statisticValue}>{totalSymbols}</p>
          </Card>
          <Card
            title="Correct symbols"
            color={CardHeaderColor.ORANGE}
            size={CardSize.SMALL}
            centeredTitle
            className={styles.card}
          >
            <p className={styles.statisticValue}>{correctSymbols}</p>
          </Card>
          <Card
            title="Misclick symbols"
            color={CardHeaderColor.PINK}
            size={CardSize.SMALL}
            centeredTitle
            className={styles.card}
          >
            <p className={styles.statisticValue}>{misclickSymbols}</p>
          </Card>
          <Card
            title="Total time"
            color={CardHeaderColor.YELLOW}
            size={CardSize.SMALL}
            centeredTitle
            className={styles.card}
          >
            <p className={styles.statisticValue}>{totalTime}</p>
          </Card>
        </div>
      </div>
    </Modal>
  );
};

export { ResultsModal };
