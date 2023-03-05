import { FC } from 'common/types/types';
import { ReactAvatar } from 'components/external/external';
import { AvatarSize } from 'common/enums/enums';
import { sizeToPx } from './maps/maps';

type Props = {
  size: AvatarSize;
  name?: string;
  src?: string;
  round: boolean;
  className?: string;
};

const Avatar: FC<Props> = ({ size, name, src, round, className }) => {
  const sizeInPx = sizeToPx[size];

  return (
    <ReactAvatar
      size={sizeInPx}
      name={name}
      title=""
      src={src}
      round={round}
      className={className}
    />
  );
};

export { Avatar };
