import { FC, RoomDto } from 'common/types/types';
import { Modal } from 'components/common/modal/modal';
import { Link } from 'components/common/link/link';
import { AppRoute } from 'common/enums/enums';
import { replaceRouteIdParam } from 'helpers/helpers';
import { useSelector } from 'hooks/hooks';

const Racing: FC = () => {
  const { personalRoom } = useSelector((state) => state.racing);
  const personalRoomId = (personalRoom as RoomDto).id;

  return (
    <Modal title="Choose game mode" isVisible>
      <Link to={replaceRouteIdParam(AppRoute.ROOMS_$ID, personalRoomId)}>
        <span>Single player</span>
      </Link>
      <Link to={AppRoute.ROOMS}>
        <span>Multi player</span>
      </Link>
    </Modal>
  );
};

export { Racing };
