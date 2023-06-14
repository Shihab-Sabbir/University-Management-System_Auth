import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.service';
import catchAsync from '../../../shared/utils/catchAsync';
import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/utils/sendResponse';
import { IPaginationOptions } from '../../../shared/interfaces/interfaces';
import { paginationFields } from '../../../shared/constants/pagination';
import pick from '../../../shared/utils/pick';
import { departmentSearchAndFilterFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IDepartmentFilters,
} from './academicDepartment.interface';

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
    const paginationOptions: Partial<IPaginationOptions> = pick(
      req.query,
      paginationFields
    );
    const filters: IDepartmentFilters = pick(
      req.query,
      departmentSearchAndFilterFields
    );

    const result = await AcademicDepartmentService.getDepartments(
      filters,
      paginationOptions
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
