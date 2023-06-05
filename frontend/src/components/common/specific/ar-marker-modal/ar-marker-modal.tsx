import { Modal } from 'components/common/common';
import { VoidAction } from 'common/types/types';
import { AlphabetLetter } from 'common/enums/enums';
import { skillSymbolToArMarker } from 'common/maps/maps';

import styles from './styles.module.scss';

type Props = {
  bestSkillSymbol: AlphabetLetter;
  isVisible: boolean;
  onClose: VoidAction;
};

const ResultsModal: React.FC<Props> = ({
  bestSkillSymbol,
  isVisible,
  onClose,
}) => {
  const arMarker = skillSymbolToArMarker[bestSkillSymbol];
  return (
    <Modal
      isVisible={isVisible}
      onHide={onClose}
      title="Game results"
      className={styles.resultsModal}
    >
      <div className={styles.modalBody}>
        <img src={arMarker} alt={bestSkillSymbol} />
      </div>
    </Modal>
  );
};

export { ResultsModal };
