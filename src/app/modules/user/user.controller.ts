import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await UserService.createUserDB(user);
  res.status(200).send({
    success: true,
    message: 'User created successfully !',
    data: result,
  });
});

export const UserController = {
  createUser,
};
