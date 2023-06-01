import { FC, RoomDto } from 'common/types/types';
import { Modal, Link, Button } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { replaceRouteIdParam } from 'helpers/helpers';
import { useSelector, useState } from 'hooks/hooks';
import { ModeCard } from './components/components';

import singlePlayerImg from 'assets/img/single-player.png';
import multiPlayerImg from 'assets/img/multi-player.png';
import carRacingImg from 'assets/img/car-racing.png';
import styles from './styles.module.scss';

const Racing: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { personalRoom } = useSelector((state) => state.racing);
  const personalRoomId = (personalRoom as RoomDto).id;

  const handleToggleIsModalVisible = (): void => {
    setIsModalVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.racing}>
        <img src={carRacingImg} alt="racing" className={styles.carRacing} />
        <Button
          label="Choose game mode"
          onClick={handleToggleIsModalVisible}
          className={styles.openModalButton}
        />
      </div>
      <Modal
        isVisible={isModalVisible}
        onHide={handleToggleIsModalVisible}
        title="Choose the mode"
        dialogClassName={styles.racingModalDialog}
      >
        <div className={styles.modeCards}>
          <Link to={replaceRouteIdParam(AppRoute.ROOMS_$ID, personalRoomId)}>
            <ModeCard imageSrc={singlePlayerImg} title="Single-player" />
          </Link>
          <Link to={AppRoute.ROOMS}>
            <ModeCard imageSrc={multiPlayerImg} title="Multi-player" />
          </Link>
        </div>
      </Modal>
    </>
  );
};

export { Racing };
