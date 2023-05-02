import { SettingsDto } from 'smart-typer-shared/common/types/types';

class Settings {
  public async updateByUserId(
    userId: number,
    payload: Partial<SettingsDto>,
  ): Promise<SettingsDto> {
    console.log(userId, payload);
    return {
      countdownBeforeGame: 10,
      gameTime: 60,
      isShownInRating: true,
      isSoundTurnedOn: true,
      hasEmailNotifications: true,
    };
  }
}

export { Settings };
