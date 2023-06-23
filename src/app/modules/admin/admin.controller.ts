import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/utils/sendResponse';
import { IAdmin } from './admin.interface';

const getAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await AdminService.getAdmins(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      meta: result.meta,
      result: result.data,
      message: 'Admin fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IAdmin> = req.body;
    const result = await AdminService.updateAdmin(id, updatedData);

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Admin updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAdmin: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await AdminService.getSingleAdmin(id);

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Admin fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await AdminService.deleteAdmin(id);

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Admin deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAdmins,
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
};
