import { FC } from 'common/types/types';
import { AvatarSize, UserLabelColor } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';
import { Avatar } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  userName: string;
  avatarSize: AvatarSize;
  textColor?: UserLabelColor;
  avatarSrc: string | null;
  bolderUserName?: boolean;
  className?: string;
};

const UserLabel: FC<Props> = ({
  userName,
  avatarSrc,
  textColor = UserLabelColor.BLACK,
  avatarSize,
  bolderUserName = false,
  className,
}) => (
  <div className={styles.avatarContainer}>
    <Avatar
      size={avatarSize}
      name={userName}
      src={avatarSrc}
      className={clsx(styles.avatar, className)}
    />
    <span
      className={clsx(
        styles.username,
        styles[textColor],
        bolderUserName && styles.bolder,
      )}
    >
      {userName}
    </span>
  </div>
);

export { UserLabel };
