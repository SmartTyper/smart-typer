import { userToRoom as userToRoomRepository } from 'data/repositories/repositories';
import { IUserToRoom } from 'common/interfaces/interfaces';

type Constructor = {
  userToRoomRepository: typeof userToRoomRepository;
};

class UserToRoom {
  private _userToRoomRepository: typeof userToRoomRepository;

  public constructor(params: Constructor) {
    this._userToRoomRepository = params.userToRoomRepository;
  }

  // create

  public async setCurrentRoomIdByUserId(
    userId: number,
    currentRoomId: Pick<IUserToRoom, 'currentRoomId'>,
  ): Promise<IUserToRoom> {
    return this._userToRoomRepository.patchCurrentRoomIdByUserId(
      userId,
      currentRoomId,
    );
  }
}

export { UserToRoom };
