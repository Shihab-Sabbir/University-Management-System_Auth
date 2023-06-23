import { IAcademicDepartment } from './academicDepartment.interface';
import academicDepartment from './academicDepartment.model';
import { IGenericPaginationResponse } from '../../../shared/interfaces/interfaces';

const createDepartment = async (
  departmentinfo: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const createdDepartment = await academicDepartment.create(departmentinfo);
  return createdDepartment;
};

const getDepartments = async (
  searchFilterAndPaginationOptions: any
): Promise<IGenericPaginationResponse<IAcademicDepartment[] | []>> => {
  const { searchAndFilter, page, limit, skip, sort } =
    searchFilterAndPaginationOptions;

  const Departments: IAcademicDepartment[] | [] = await academicDepartment
    .find(searchAndFilter)
    .populate('academicFaculty')
    .skip(skip)
    .sort(sort)
    .limit(limit);

  const total = await academicDepartment.countDocuments(searchAndFilter);

  const result: IGenericPaginationResponse<IAcademicDepartment[] | []> = {
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
  const deletedDepartment = await academicDepartment.findByIdAndDelete({
    _id: id,
  });
  return deletedDepartment;
};

export const AcademicDepartmentService = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
