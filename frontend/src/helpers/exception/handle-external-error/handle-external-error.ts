import { HttpError } from 'exceptions/exceptions';
import { HttpErrorMessage } from 'common/enums/enums';
import { EXTERNAL_SERVER_ERROR_MESSAGE } from 'common/constants/constants';

const handleExternalError = (
  error: unknown,
  showError: (message: HttpErrorMessage) => void,
): void => {
  const isHttpError = error instanceof HttpError;
  const message = isHttpError ? error.message : EXTERNAL_SERVER_ERROR_MESSAGE;
  showError(message as HttpErrorMessage);
};

export { handleExternalError };
