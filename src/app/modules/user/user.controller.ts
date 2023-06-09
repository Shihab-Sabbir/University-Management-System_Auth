import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/utils/catchAsync';
import sendResponse from '../../../shared/utils/sendResponse';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUserDB(user);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'User created successfully !',
    });
    next(); // here next() has no use but to maintain the convention of express Request handler it is used here .
  }
);

export const UserController = {
  createUser,
};
