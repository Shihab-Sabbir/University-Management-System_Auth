import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/utils/catchAsync';
import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/utils/sendResponse';
import { semesterSearchAndFilterFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { getSearchAndPaginationOptions } from '../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  // to remove the repeatative try catch , a higher order function catchAsync is used here.
  // catchAsync(async function{}) , here function{} is a parameter of the catchAsync function
  const semesterInfo = req.body;
  const result = await AcademicSemesterService.createSemester(semesterInfo);
  sendResponse<IAcademicSemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    result: result,
    message: 'Semester created successfully !',
  });
});

const getSemesters: RequestHandler = async (req, res, next) => {
  try {
    const searchFilterAndPaginationOptions = getSearchAndPaginationOptions(
      req.query,
      semesterSearchAndFilterFields
    );

    const result = await AcademicSemesterService.getSemesters(
      searchFilterAndPaginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      meta: result.meta,
      result: result.data,
      message: 'Semester fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleSemester: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Semester fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateSemester: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IAcademicSemester> = req.body;
    const result = await AcademicSemesterService.updateSemester(
      id,
      updatedData
    );

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Semester updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteSemester: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await AcademicSemesterService.deleteSemester(id);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Semester deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
