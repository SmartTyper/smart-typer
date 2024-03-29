import { FC } from 'common/types/types';
import { Dropdown, UserLabel } from 'components/common/common';
import { AvatarSize, UserLabelColor } from 'common/enums/enums';
import { DropdownButton, DropdownLink } from 'common/types/types';

type Props = {
  userName: string;
  avatarSrc: string | null;
  links: DropdownLink[];
  buttons: DropdownButton[];
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
        avatarSize={AvatarSize.MIDDLE}
        textColor={UserLabelColor.WHITE}
        avatarSrc={avatarSrc}
        bolderUserName
      />
    </Dropdown>
  );
};

export { ProfileDropdown };
