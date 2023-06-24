import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.service';
import catchAsync from '../../../shared/utils/catchAsync';
import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/utils/sendResponse';
import { IPaginationOptions } from '../../../shared/interfaces/interfaces';
import { paginationFields } from '../../../shared/constants/pagination';
import pick from '../../../shared/utils/pick';
import { FacultySearchAndFilterFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { getSearchAndPaginationOptions } from '../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const FacultyInfo: IAcademicFaculty = req.body;
  const result = await AcademicFacultyService.createFaculty(FacultyInfo);
  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    result: result,
    message: 'Faculty created successfully !',
  });
});

const getFaculties: RequestHandler = async (req, res, next) => {
  try {
    const searchFilterAndPaginationOptions = getSearchAndPaginationOptions(
      req.query,
      FacultySearchAndFilterFields
    );
    const result = await AcademicFacultyService.getFaculties(
      searchFilterAndPaginationOptions
    );

    sendResponse<IAcademicFaculty[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      meta: result.meta,
      result: result.data,
      message: 'Faculty fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await AcademicFacultyService.getSingleFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Faculty fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IAcademicFaculty> = req.body;
    const result = await AcademicFacultyService.updateFaculty(id, updatedData);

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Faculty updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await AcademicFacultyService.deleteFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Faculty deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicFacultyController = {
  createFaculty,
  getFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
