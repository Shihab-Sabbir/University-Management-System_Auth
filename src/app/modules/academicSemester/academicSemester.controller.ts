import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/utils/catchAsync';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/utils/sendResponse';
import { IPaginationOptions } from '../../../shared/interfaces/interfaces';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // to remove the repeatative try catch , a higher order function catchAsync is used here.
    // catchAsync(async function{}) , here function{} is a parameter of the catchAsync function
    const semesterInfo = req.body;
    const result = await AcademicSemesterService.createSemester(semesterInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Semester created successfully !',
    });
    next(); // here next() has no use but to maintain the convention of express Request handler it is used here .
  }
);

const getSemesters: RequestHandler = async (req, res, next) => {
  try {
    const paginationOptions: IPaginationOptions = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
    };
    console.log({ paginationOptions });
    const result = await AcademicSemesterService.getSemesters(
      paginationOptions
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Semester fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
  getSemesters,
};
