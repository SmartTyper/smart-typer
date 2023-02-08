import ReactAvatar from 'react-avatar';
import { FC } from 'common/types/types';
import { sizeToPx } from './common/maps/maps';
import { AvatarSize } from 'common/enums/enums';

type Props = {
  size: AvatarSize;
  name?: string;
  src?: string;
  round: boolean;
  className?: string;
  style?: React.CSSProperties;
  showTooltip?: boolean;
};

const Avatar: FC<Props> = ({ size, name, src, round, className, style }) => {
  const sizeInPx = sizeToPx[size];

  return (
    <ReactAvatar
      size={sizeInPx}
      name={name}
      title=""
      src={src}
      round={round}
      className={className}
      style={style}
    />
  );
};

export { Avatar };
