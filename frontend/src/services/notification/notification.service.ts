import { toast } from 'react-toastify';

class Notification {
  public error(message: string): void {
    toast.error(message);
  }

  public success(message: string): void {
    toast.success(message);
  }

  public warning(message: string): void {
    toast.warn(message);
  }

  public info(message: string): void {
    toast.info(message);
  }
}

export { Notification };
