import { FC } from 'common/types/types';
import { Dropdown } from 'components/common/dropdown/dropdown';
import { AvatarSize, UserLabelColor } from 'common/enums/enums';
import {
  IButton,
  ILink,
} from 'components/common/dropdown/common/interfaces/types';
import { UserLabel } from 'components/common/user-label/user-label';

type Props = {
  userName: string;
  avatarSrc?: string;
  links: ILink[];
  buttons: IButton[];
};

const ProfileDropdown: FC<Props> = ({
  userName,
  avatarSrc,
  links,
  buttons,
}) => {
  return (
    <Dropdown links={links} buttons={buttons}>
      <UserLabel
        username={userName}
        avatarSize={AvatarSize.SMALL}
        textColor={UserLabelColor.WHITE}
        avatarSrc={avatarSrc}
      />
    </Dropdown>
  );
};

export { ProfileDropdown };
