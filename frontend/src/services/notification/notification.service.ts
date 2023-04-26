import { toast } from 'react-toastify';
import { HttpErrorMessage, NotificationMessage } from 'common/enums/enums';

class Notification {
  public error(message: HttpErrorMessage): void {
    toast.error(message);
  }

  public success(message: NotificationMessage): void {
    toast.success(message);
  }

  public warning(message: NotificationMessage): void {
    toast.warn(message);
  }

  public info(message: NotificationMessage): void {
    toast.info(message);
  }
}

export { Notification };
