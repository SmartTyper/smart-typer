import { CommonKey } from 'common/enums/enums';
import { SettingsDto, UserDto } from 'common/types/types';
import { settings as settingsRepository } from 'data/repositories/repositories';

type Constructor = {
  settingsRepository: typeof settingsRepository;
};

class Settings {
  private _settingsRepository: typeof settingsRepository;

  public constructor(params: Constructor) {
    this._settingsRepository = params.settingsRepository;
  }

  public async updateByUserId(
    userId: UserDto[CommonKey.ID],
    payload: Partial<SettingsDto>,
  ): Promise<SettingsDto> {
    return this._settingsRepository.patchByUserId(userId, payload);
  }
}

export { Settings };
