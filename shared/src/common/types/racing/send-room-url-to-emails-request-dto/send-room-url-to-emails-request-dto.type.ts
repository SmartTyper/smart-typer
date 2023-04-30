import { ShareRoomUrlResponseDto } from '../racing';

type SendRoomUrlToEmailsRequestDto = {
  emails: string[];
  shareRoomUrl: ShareRoomUrlResponseDto['url'];
};

export type { SendRoomUrlToEmailsRequestDto };
