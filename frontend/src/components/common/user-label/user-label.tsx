import { FC } from 'common/types/types';
import { AvatarSize, UserLabelColor } from 'common/enums/enums';
import { clsx } from 'helpers/helpers';
import { Avatar } from 'components/common/avatar/avatar';

import styles from './styles.module.scss';

type Props = {
  username: string;
  avatarSize: AvatarSize;
  textColor?: UserLabelColor;
  avatarSrc?: string;
};

const UserLabel: FC<Props> = ({
  username,
  avatarSrc,
  textColor = UserLabelColor.BLACK,
  avatarSize,
}) => (
  <div className={styles.avatarContainer}>
    <Avatar
      size={avatarSize}
      name={username}
      src={avatarSrc}
      round
      className={styles.avatar}
    />
    <span className={clsx(styles.username, styles[textColor])}>{username}</span>
  </div>
);

export { UserLabel };
