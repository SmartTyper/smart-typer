import { ShareUrlKey } from 'common/enums/enums';
import { ShareRoomUrlDto } from '../racing';

type SendRoomUrlToEmailsRequestDto = {
  emails: string[];
  url: ShareRoomUrlDto[ShareUrlKey.URL];
};

export type { SendRoomUrlToEmailsRequestDto };
