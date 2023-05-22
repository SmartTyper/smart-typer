import { SettingsDto } from 'smart-typer-shared/common/types/types';
import { settings as settingsRepository } from 'data/repositories/repositories';
import { HttpError } from 'exceptions/exceptions';
import { HttpCode, HttpErrorMessage } from 'common/enums/enums';

type Constructor = {
  settingsRepository: typeof settingsRepository;
};

class Settings {
  private _settingsRepository: typeof settingsRepository;

  public constructor(params: Constructor) {
    this._settingsRepository = params.settingsRepository;
  }

  public async updateByUserId(
    userId: number,
    payload: Partial<SettingsDto>,
  ): Promise<SettingsDto> {
    const settings = await this._settingsRepository.updateByUserId(
      userId,
      payload,
    );

    if (!settings) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
      });
    }

    return settings;
  }
}

export { Settings };
