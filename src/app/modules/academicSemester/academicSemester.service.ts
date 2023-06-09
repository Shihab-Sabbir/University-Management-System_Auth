import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import academicSemester from './academicSemester.model';
import { IPaginationOptions } from '../../../shared/interfaces/interfaces';

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

const getSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IAcademicSemester | IAcademicSemester[] | null> => {
  const semesters = await academicSemester.find();
  return semesters;
};

export const AcademicSemesterService = {
  createSemester,
  getSemesters,
};
