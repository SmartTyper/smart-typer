import { HttpError } from 'exceptions/exceptions';
import { EXTERNAL_SERVER_ERROR_MESSAGE } from 'common/constants/constants';

const handleError = (
  error: unknown,
  showError: (message: string) => void,
): void => {
  const isHttpError = error instanceof HttpError;
  const message = isHttpError ? error.message : EXTERNAL_SERVER_ERROR_MESSAGE;
  showError(message);
};

export { handleError };
