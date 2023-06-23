import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { FacultyService } from './faculty.service';
import sendResponse from '../../../shared/utils/sendResponse';
import { IFaculty } from './faculty.interface';

const getFaculties = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await FacultyService.getFaculties(req.query);

    sendResponse(res, {
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

const updateFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IFaculty> = req.body;
    const result = await FacultyService.updateFaculty(id, updatedData);

    sendResponse<IFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Faculty updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await FacultyService.getSingleFaculty(id);

    sendResponse<IFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Faculty fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteFaculty: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await FacultyService.deleteFaculty(id);

    sendResponse<IFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Faculty deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const FacultyController = {
  getFaculties,
  updateFaculty,
  deleteFaculty,
  getSingleFaculty,
};
