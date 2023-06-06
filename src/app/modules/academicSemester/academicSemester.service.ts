import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import academicSemester from './academicSemester.model';

const createSemester = async (
  semesterinfo: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (
    academicSemesterTitleCodeMapper[semesterinfo.title] !== semesterinfo.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code !');
  }
  const createdSemester = await academicSemester.create(semesterinfo);
  return createdSemester;
};

export const AcademicSemesterService = {
  createSemester,
};
