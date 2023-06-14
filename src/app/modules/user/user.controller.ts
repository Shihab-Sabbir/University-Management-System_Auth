import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/utils/catchAsync';
import sendResponse from '../../../shared/utils/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUserDB(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    result: result,
    message: 'User created successfully !',
  });
});

export const UserController = {
  createUser,
};
