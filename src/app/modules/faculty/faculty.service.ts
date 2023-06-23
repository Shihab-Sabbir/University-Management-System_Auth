import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericPaginationResponse } from '../../../shared/interfaces/interfaces';
import { getSearchAndPaginationOptions } from '../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions';

import { IName, IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { facultyFilterFields, facultySearchFields } from './faculty.constant';

const getFaculties = async (query: any) => {
  const { searchAndFilter, page, limit, skip, sort } =
    getSearchAndPaginationOptions(
      query,
      facultyFilterFields,
      facultySearchFields
    );

  const faculties: IFaculty[] | [] = await Faculty.find(searchAndFilter)
    .populate('academicFaculty academicDepartment academicSemester')
    .skip(skip)
    .sort(sort)
    .limit(limit as number);

  const total = await Faculty.countDocuments(searchAndFilter);

  const result: IGenericPaginationResponse<IFaculty[] | []> = {
    meta: {
      page,
      limit,
      total,
    },
    data: faculties,
  };

  return result;
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const faculty = await Faculty.findById(id).populate(
    'academicFaculty academicDepartment'
  );
  return faculty;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const { name, ...rest } = payload;

  const updateFacultyInfo: Partial<IFaculty> = { ...rest };

  if (name && Object.keys(name as IName).length > 0) {
    Object.keys(name as IName).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updateFacultyInfo as any)[nameKey] = name[key as keyof IName];
    });
  }

  const updatedFaculty = await Faculty.findOneAndUpdate(
    { _id: id },
    updateFacultyInfo,
    { new: true }
  );
  return updatedFaculty;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const deletedFaculty = await Faculty.findByIdAndDelete({
    _id: id,
  });
  return deletedFaculty;
};

export const FacultyService = {
  getFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
