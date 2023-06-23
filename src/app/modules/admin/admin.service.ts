import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericPaginationResponse } from '../../../shared/interfaces/interfaces';
import { getSearchAndPaginationOptions } from '../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions';
import { adminFilterFields, adminSearchFields } from './admin.constant';
import { IName, IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAdmins = async (query: any) => {
  const { searchAndFilter, page, limit, skip, sort } =
    getSearchAndPaginationOptions(query, adminFilterFields, adminSearchFields);

  const admins: IAdmin[] | [] = await Admin.find(searchAndFilter)
    .populate('managementDepartment')
    .skip(skip)
    .sort(sort)
    .limit(limit as number);

  const total = await Admin.countDocuments(searchAndFilter);

  const result: IGenericPaginationResponse<IAdmin[] | []> = {
    meta: {
      page,
      limit,
      total,
    },
    data: admins,
  };

  return result;
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const admin = await Admin.findById(id).populate(
    'academicFaculty academicDepartment academicSemester'
  );
  return admin;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const { name, ...rest } = payload;

  const updateAdminInfo: Partial<IAdmin> = { ...rest };

  if (name && Object.keys(name as IName).length > 0) {
    Object.keys(name as IName).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updateAdminInfo as any)[nameKey] = name[key as keyof IName];
    });
  }

  const updatedAdmin = await Admin.findOneAndUpdate(
    { _id: id },
    updateAdminInfo,
    { new: true }
  );
  return updatedAdmin;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const deletedAdmin = await Admin.findByIdAndDelete({
    _id: id,
  });
  return deletedAdmin;
};

export const AdminService = {
  getAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
