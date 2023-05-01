import { ShareRoomUrlDto } from '../racing';

type SendRoomUrlToEmailsRequestDto = {
  emails: string[];
  shareRoomUrl: ShareRoomUrlDto['url'];
};

export type { SendRoomUrlToEmailsRequestDto };
