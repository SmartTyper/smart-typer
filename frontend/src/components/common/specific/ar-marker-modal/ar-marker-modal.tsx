import { Modal } from 'components/common/common';
import { FC, VoidAction } from 'common/types/types';
import { AlphabetLetter } from 'common/enums/enums';
import { skillSymbolToArMarker } from 'common/maps/maps';

import styles from './styles.module.scss';

type Props = {
  bestSkillSymbol: AlphabetLetter | null;
  isVisible: boolean;
  onClose: VoidAction;
};

const ArMarkerModal: FC<Props> = ({ bestSkillSymbol, isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onHide={onClose}
      title="Scan this marker via AR-compatible device "
      className={styles.resultsModal}
    >
      {bestSkillSymbol ? (
        <div className={styles.markerContainer}>
          <img
            src={skillSymbolToArMarker[bestSkillSymbol]}
            alt={bestSkillSymbol}
          />
        </div>
      ) : null}
    </Modal>
  );
};

export { ArMarkerModal };
