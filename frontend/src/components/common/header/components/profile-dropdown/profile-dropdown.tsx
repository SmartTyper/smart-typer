import { FC } from 'common/types/types';
import { Dropdown } from 'components/common/dropdown/dropdown';
import { AvatarSize, UserLabelColor } from 'common/enums/enums';
import { Button, Link } from 'components/common/dropdown/common/types/types';
import { UserLabel } from 'components/common/user-label/user-label';

type Props = {
  userName: string;
  avatarSrc?: string;
  links: Link[];
  buttons: Button[];
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
        userName={userName}
        avatarSize={AvatarSize.SMALL}
        textColor={UserLabelColor.WHITE}
        avatarSrc={avatarSrc}
      />
    </Dropdown>
  );
};

export { ProfileDropdown };
