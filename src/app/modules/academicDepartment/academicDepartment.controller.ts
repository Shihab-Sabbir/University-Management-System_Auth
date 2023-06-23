import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.service';
import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/utils/sendResponse';
import { departmentSearchAndFilterFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { getSearchAndPaginationOptions } from '../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions';

const createDepartment = async (req: Request, res: Response) => {
  const DepartmentInfo: IAcademicDepartment = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    DepartmentInfo
  );
  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    result: result,
    message: 'Department created successfully !',
  });
};

const getDepartments: RequestHandler = async (req, res, next) => {
  try {
    const searchFilterAndPaginationOptions = getSearchAndPaginationOptions(
      req.query,
      departmentSearchAndFilterFields
    );

    const result = await AcademicDepartmentService.getDepartments(
      searchFilterAndPaginationOptions
    );

    sendResponse<IAcademicDepartment[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      meta: result.meta,
      result: result.data,
      message: 'Department fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await AcademicDepartmentService.getSingleDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Department fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IAcademicDepartment> = req.body;
    const result = await AcademicDepartmentService.updateDepartment(
      id,
      updatedData
    );

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Department updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await AcademicDepartmentService.deleteDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Department deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicDepartmentController = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
