import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/utils/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.service';
import { IManagementDepartment } from './managementDepartment.inerface';

const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...departmentData } = req.body;
    const result = await ManagementDepartmentService.createDepartment(
      departmentData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await ManagementDepartmentService.getDepartments(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      meta: result.meta,
      result: result.data,
      message: 'Management Department fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IManagementDepartment> = req.body;
    const result = await ManagementDepartmentService.updateDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Management Department updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await ManagementDepartmentService.getSingleDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Management Department fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteDepartment: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await ManagementDepartmentService.deleteDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Management Department deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const ManagementDepartmentController = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getSingleDepartment,
};
