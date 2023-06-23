import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import academicSemester from './academicSemester.model';
import { IGenericPaginationResponse } from '../../../shared/interfaces/interfaces';

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
  searchFilterAndPaginationOptions: any
): Promise<IGenericPaginationResponse<IAcademicSemester[] | []>> => {
  const { searchAndFilter, page, limit, skip, sort } =
    searchFilterAndPaginationOptions;

  const semesters: IAcademicSemester[] | [] = await academicSemester
    .find(searchAndFilter)
    .skip(skip)
    .sort(sort)
    .limit(limit as number);

  const total = await academicSemester.countDocuments(searchAndFilter);

  const result: IGenericPaginationResponse<IAcademicSemester[] | []> = {
    meta: {
      page,
      limit,
      total,
    },
    data: semesters,
  };

  return result;
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const semester = await academicSemester.findById(id);
  return semester;
};

const updateSemester = async (
  id: string,
  updatedData: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    updatedData.title &&
    academicSemesterTitleCodeMapper[updatedData.title] !== updatedData.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }
  const updatedSemester = await academicSemester.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );
  return updatedSemester;
};

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const deletedSemester = await academicSemester.findByIdAndDelete({
    _id: id,
  });
  return deletedSemester;
};

export const AcademicSemesterService = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
