import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../../shared/utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Student created successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const createFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Faculty created successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Admin created successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
