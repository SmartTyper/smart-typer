import { FC } from 'common/types/types';
import { AvatarSize } from 'common/enums/enums';
import { Avatar } from 'components/common/common';
import { clsx } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  username: string;
  avatarSize: AvatarSize;
  textColor?: 'white' | 'black';
  avatarSrc?: string;
};

const UserLabel: FC<Props> = ({
  username,
  avatarSrc,
  textColor = 'black',
  avatarSize,
}) => (
  <div className={styles.avatarContainer}>
    <Avatar
      size={avatarSize}
      name={username}
      src={avatarSrc}
      round={true}
      className={styles.avatar}
      showTooltip={false}
    />
    <span className={clsx(styles.username, styles[textColor])}>{username}</span>
  </div>
);

export { UserLabel };
