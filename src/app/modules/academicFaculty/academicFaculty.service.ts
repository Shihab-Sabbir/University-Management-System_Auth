import { IAcademicFaculty } from './academicFaculty.interface';
import academicFaculty from './academicFaculty.model';
import { IGenericPaginationResponse } from '../../../shared/interfaces/interfaces';

const createFaculty = async (
  Facultyinfo: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const createdFaculty = await academicFaculty.create(Facultyinfo);
  return createdFaculty;
};

const getFaculties = async (
  searchFilterAndPaginationOptions: any
): Promise<IGenericPaginationResponse<IAcademicFaculty[] | []>> => {
  const { searchAndFilter, page, limit, skip, sort } =
    searchFilterAndPaginationOptions;

  const Faculties: IAcademicFaculty[] | [] = await academicFaculty
    .find(searchAndFilter)
    .skip(skip)
    .sort(sort)
    .limit(limit);

  const total = await academicFaculty.countDocuments(searchAndFilter);

  const result: IGenericPaginationResponse<IAcademicFaculty[] | []> = {
    meta: {
      page,
      limit,
      total,
    },
    data: Faculties,
  };
  return result;
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const Faculty = await academicFaculty.findById(id);
  return Faculty;
};

const updateFaculty = async (
  id: string,
  updatedData: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const updatedFaculty = await academicFaculty.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );
  return updatedFaculty;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const deletedFaculty = await academicFaculty.findByIdAndDelete({
    _id: id,
  });
  return deletedFaculty;
};

export const AcademicFacultyService = {
  createFaculty,
  getFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
