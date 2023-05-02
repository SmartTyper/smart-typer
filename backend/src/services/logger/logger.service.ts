import { Logger as AppLogger } from 'common/types/types';

class Logger {
  private _logger: AppLogger | null = null;

  public initLogger(logger: AppLogger): void {
    this._logger = logger;
  }

  public info = (
    ...args: Parameters<AppLogger['info']>
  ): ReturnType<AppLogger['info']> | void => {
    if (!this._logger) {
      return;
    }
    this._logger.info(...args);
  };

  public warn = (
    ...args: Parameters<AppLogger['warn']>
  ): ReturnType<AppLogger['warn']> | void => {
    if (!this._logger) {
      return;
    }
    this._logger.warn(...args);
  };

  public error = (
    ...args: Parameters<AppLogger['error']>
  ): ReturnType<AppLogger['error']> | void => {
    if (!this._logger) {
      return;
    }
    this._logger.error.apply(this, args);
  };
}

export { Logger };
