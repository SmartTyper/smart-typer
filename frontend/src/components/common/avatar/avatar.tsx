import { FC } from 'common/types/types';
import { ReactAvatar } from 'components/external/external';
import { AvatarSize } from 'common/enums/enums';
import { SizeToPx } from './maps/maps';

type Props = {
  size: AvatarSize;
  name?: string;
  src?: string | null;
  round?: boolean;
  className?: string;
};

const Avatar: FC<Props> = ({ size, name, src, round = true, className }) => {
  const sizeInPx = SizeToPx[size];

  return (
    <ReactAvatar
      size={sizeInPx}
      name={name}
      title=""
      src={src ?? undefined}
      round={round}
      className={className}
    />
  );
};

export { Avatar };
