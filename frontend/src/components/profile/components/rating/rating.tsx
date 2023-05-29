import {
  FC,
  Rating as RatingData,
  UserDto,
  VoidAction,
  VoidCallback,
} from 'common/types/types';
import { Button, UserLabel } from 'components/common/common';
import { AvatarSize, CommonKey } from 'common/enums/enums';

import styles from './styles.module.scss';

type Props = {
  rating: RatingData | null;
  onRecordClick: VoidCallback<UserDto[CommonKey.ID]>;
};

const Rating: FC<Props> = ({ rating, onRecordClick }) => {
  const handleGetOnClickHandler = (
    userId: UserDto[CommonKey.ID],
  ): VoidAction => {
    return (): void => {
      onRecordClick(userId);
    };
  };

  return (
    <div className={styles.rating}>
      <>
        <div className={styles.record}>
          <span className={styles.position}>
            <strong>№</strong>
          </span>
          <span className={styles.userInfo}>
            <strong>User info</strong>
          </span>
          <span className={styles.averageSpeed}>
            <strong>Average speed</strong>
          </span>
        </div>
        {rating?.map((user, i) => (
          <Button
            key={user.id}
            className={styles.record}
            onClick={handleGetOnClickHandler(user.id)}
          >
            <span className={styles.position}>
              <strong>{i + 1}</strong>
            </span>
            <UserLabel
              className={styles.userInfo}
              userName={user.nickname}
              avatarSrc={user.photoUrl}
              avatarSize={AvatarSize.SMALL}
            />
            <span className={styles.averageSpeed}>{user.averageSpeed}</span>
          </Button>
        ))}
      </>
    </div>
  );
};

export { Rating };
