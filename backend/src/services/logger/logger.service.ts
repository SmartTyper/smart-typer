import {
  Logger as AppLogger,
  // MessageLogger,
  // ObjectLogger,
} from 'common/types/types';

class Logger {
  private _logger: AppLogger | null = null;

  public initLogger(logger: AppLogger): void {
    this._logger = logger;
  }

  public info: AppLogger['info'] = (...args) => {
    if (!this._logger) {
      return;
    }
    this._logger.info(...args);
  };

  public warn: AppLogger['warn'] = (args) => {
    if (!this._logger) {
      return;
    }
    this._logger.warn(args);
  };

  public error: AppLogger['error'] = (args) => {
    if (!this._logger) {
      return;
    }
    this._logger.error(args);
  };
}

export { Logger };
