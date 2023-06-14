import {
  IAcademicDepartment,
  IDepartmentFilters,
} from './academicDepartment.interface';
import academicDepartment from './academicDepartment.model';
import {
  CustomPaginationOptions,
  IGenericPaginationResponse,
  IPaginationOptions,
} from '../../../shared/interfaces/interfaces';
import paginationHelper from '../../../shared/utils/pagination/paginationHelper';
import sortFunction from '../../../shared/utils/pagination/sortFunction';
import searchAndFilterHelper from '../../../shared/utils/filter/searchAndFilterHelper';
import { departmentSearchAndFilterFields } from './academicDepartment.constant';

const createDepartment = async (
  departmentinfo: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const createdDepartment = await academicDepartment.create(departmentinfo);
  return createdDepartment;
};

const getDepartments = async (
  filters: IDepartmentFilters,
  paginationOptions: Partial<IPaginationOptions>
): Promise<IGenericPaginationResponse<IAcademicDepartment[] | []>> => {
  const { page, limit, skip, sortBy, sortOrder }: CustomPaginationOptions =
    paginationHelper(paginationOptions);

  const sortOptions = sortFunction(sortBy, sortOrder);
  const { searchTerm, ...filtersData } = filters;

  const searchAndFilter = searchAndFilterHelper(
    searchTerm,
    filtersData,
    departmentSearchAndFilterFields
  );

  const Departments = await academicDepartment
    .find(searchAndFilter)
    .populate('academicFaculty')
    .skip(skip)
    .sort(sortOptions)
    .limit(limit);

  const total = await academicDepartment.countDocuments();

  const result = {
    meta: {
      page,
      limit,
      total,
    },
    data: Departments,
  };
  return result;
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const Department = await academicDepartment.findById(id);
  return Department;
};

const updateDepartment = async (
  id: string,
  updatedData: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const updatedDepartment = await academicDepartment.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );
  return updatedDepartment;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const deleteedDepartment = await academicDepartment.findByIdAndDelete({
    _id: id,
  });
  return deleteedDepartment;
};

export const AcademicDepartmentService = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
