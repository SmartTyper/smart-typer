import cron from 'node-schedule';
import { VoidAction } from 'common/types/types';

type ScheduleJob = {
  rule: string;
  callback: VoidAction;
};

class Cron {
  private _cron: typeof cron;

  public constructor() {
    this._cron = cron;
  }

  public scheduleJob({ rule, callback }: ScheduleJob): void {
    this._cron.scheduleJob(rule, callback);
  }
}

export { Cron };
