import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterTitleCodeMapper,
  semesterSearchAndFilterFields,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  ISemesterFilters,
} from './academicSemester.interface';
import academicSemester from './academicSemester.model';
import {
  CustomPaginationOptions,
  IGenericPaginationResponse,
  IPaginationOptions,
} from '../../../shared/interfaces/interfaces';
import paginationHelper from '../../../shared/utils/pagination/paginationHelper';
import sortFunction from '../../../shared/utils/pagination/sortFunction';
import searchAndFilterHelper from '../../../shared/utils/filter/searchAndFilterHelper';

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
  filters: ISemesterFilters,
  paginationOptions: Partial<IPaginationOptions>
): Promise<IGenericPaginationResponse<IAcademicSemester[] | []>> => {
  const { page, limit, skip, sortBy, sortOrder }: CustomPaginationOptions =
    paginationHelper(paginationOptions);

  const sortOptions = sortFunction(sortBy, sortOrder);
  const { searchTerm, ...filtersData } = filters;

  const searchAndFilter = searchAndFilterHelper(
    searchTerm,
    filtersData,
    semesterSearchAndFilterFields
  );

  const semesters = await academicSemester
    .find(searchAndFilter)
    .skip(skip)
    .sort(sortOptions)
    .limit(limit);

  const total = await academicSemester.countDocuments();

  const result = {
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
  const deleteedSemester = await academicSemester.findByIdAndDelete({
    _id: id,
  });
  return deleteedSemester;
};

export const AcademicSemesterService = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
