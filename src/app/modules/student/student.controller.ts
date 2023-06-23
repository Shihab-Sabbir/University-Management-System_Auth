import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentService } from '../student/student.service';
import sendResponse from '../../../shared/utils/sendResponse';
import { IStudent } from '../student/student.interface';

const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await StudentService.getStudents(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      meta: result.meta,
      result: result.data,
      message: 'Student fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const updatedData: Partial<IStudent> = req.body;
    const result = await StudentService.updateStudent(id, updatedData);

    sendResponse<IStudent>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Student updated successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await StudentService.getSingleStudent(id);

    sendResponse<IStudent>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Student fetched successfully !',
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const result = await StudentService.deleteStudent(id);

    sendResponse<IStudent>(res, {
      success: true,
      statusCode: httpStatus.OK,
      result: result,
      message: 'Student deleted successfully !',
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getStudents,
  updateStudent,
  deleteStudent,
  getSingleStudent,
};
