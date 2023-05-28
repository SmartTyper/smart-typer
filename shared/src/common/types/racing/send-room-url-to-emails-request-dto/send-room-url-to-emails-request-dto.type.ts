import { ShareUrlKey } from 'common/enums/enums';
import { ShareRoomUrlDto } from '../racing';

type SendRoomUrlToEmailsRequestDto = {
  emails: string[];
  shareRoomUrl: ShareRoomUrlDto[ShareUrlKey.URL];
};

export type { SendRoomUrlToEmailsRequestDto };
