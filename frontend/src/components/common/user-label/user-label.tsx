import { FC } from 'common/types/types';
import { AvatarSize, UserLabelColor } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';
import { Avatar } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  userName: string;
  avatarSize: AvatarSize;
  textColor?: UserLabelColor;
  avatarSrc?: string;
};

const UserLabel: FC<Props> = ({
  userName,
  avatarSrc,
  textColor = UserLabelColor.BLACK,
  avatarSize,
}) => (
  <div className={styles.avatarContainer}>
    <Avatar
      size={avatarSize}
      name={userName}
      src={avatarSrc}
      className={styles.avatar}
    />
    <span className={clsx(styles.username, styles[textColor])}>{userName}</span>
  </div>
);

export { UserLabel };
