import { Response } from 'express';

type IApiResponse<T> = {
  success: boolean;
  statusCode: number;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  result?: T | null;
  message?: string | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const {
    success,
    message = null,
    meta = null,
    result = null,
    statusCode,
  } = data;
  res.status(statusCode).send({
    success: success,
    message: message,
    meta: meta,
    data: result,
  });
};

export default sendResponse;
