import { ErrorRequestHandler } from 'express';
import { NODE_ENV } from '../../config';
import { IGenericErrorMessage } from '../../errors/interfaces/IGenericErrorMessage';
import handleMongooseValidationError from '../../errors/handleMongooseValidationError';
import ApiError from '../../errors/ApiError';
import { errorLogger } from '../../shared/utils/logger';
import { ZodError } from 'zod';
import handleZodValidationError from '../../errors/handleZodValidationError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  NODE_ENV === 'development'
    ? console.log('Global error handler ~~ ', err)
    : errorLogger.error('Global error handler ~~ ', err);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];
  if (err?.name === 'ValidationError') {
    const simplifyError = handleMongooseValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessages = simplifyError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof ZodError) {
    const simplifyError = handleZodValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessages = simplifyError.errorMessages;
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }
  // These if-else conditions and error modifications are being done only to maintain a specific error response pattern from different error types.

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: NODE_ENV !== 'production' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
