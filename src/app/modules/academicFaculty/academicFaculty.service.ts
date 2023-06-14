import { FacultySearchAndFilterFields } from './academicFaculty.constant';
import { IAcademicFaculty, IFacultyFilters } from './academicFaculty.interface';
import academicFaculty from './academicFaculty.model';
import {
  CustomPaginationOptions,
  IGenericPaginationResponse,
  IPaginationOptions,
} from '../../../shared/interfaces/interfaces';
import paginationHelper from '../../../shared/utils/pagination/paginationHelper';
import sortFunction from '../../../shared/utils/pagination/sortFunction';
import searchAndFilterHelper from '../../../shared/utils/filter/searchAndFilterHelper';

const createFaculty = async (
  Facultyinfo: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const createdFaculty = await academicFaculty.create(Facultyinfo);
  return createdFaculty;
};

const getFacultys = async (
  filters: IFacultyFilters,
  paginationOptions: Partial<IPaginationOptions>
): Promise<IGenericPaginationResponse<IAcademicFaculty[] | []>> => {
  const { page, limit, skip, sortBy, sortOrder }: CustomPaginationOptions =
    paginationHelper(paginationOptions);

  const sortOptions = sortFunction(sortBy, sortOrder);
  const { searchTerm, ...filtersData } = filters;

  const searchAndFilter = searchAndFilterHelper(
    searchTerm,
    filtersData,
    FacultySearchAndFilterFields
  );

  const Facultys = await academicFaculty
    .find(searchAndFilter)
    .skip(skip)
    .sort(sortOptions)
    .limit(limit);

  const total = await academicFaculty.countDocuments();

  const result = {
    meta: {
      page,
      limit,
      total,
    },
    data: Facultys,
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
  const deleteedFaculty = await academicFaculty.findByIdAndDelete({
    _id: id,
  });
  return deleteedFaculty;
};

export const AcademicFacultyService = {
  createFaculty,
  getFacultys,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
