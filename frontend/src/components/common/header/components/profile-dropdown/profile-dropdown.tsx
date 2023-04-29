import { FC } from 'common/types/types';
import { Dropdown, UserLabel } from 'components/common/common';
import { AvatarSize, UserLabelColor } from 'common/enums/enums';
import { DropdownButton, DropdownLink } from 'common/types/types';

type Props = {
  userName: string;
  avatarSrc?: string;
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
        avatarSize={AvatarSize.SMALL}
        textColor={UserLabelColor.WHITE}
        avatarSrc={avatarSrc}
      />
    </Dropdown>
  );
};

export { ProfileDropdown };
