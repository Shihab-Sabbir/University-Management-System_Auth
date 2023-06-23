import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericPaginationResponse } from '../../../shared/interfaces/interfaces';
import { getSearchAndPaginationOptions } from '../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions';

import { ManagementDepartment } from './managementDepartment.model';
import {
  managementDepartmentFilterFields,
  managementDepartmentSearchFields,
} from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.inerface';

const createDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getDepartments = async (query: any) => {
  const { searchAndFilter, page, limit, skip, sort } =
    getSearchAndPaginationOptions(
      query,
      managementDepartmentFilterFields,
      managementDepartmentSearchFields
    );

  const managementDepartments: IManagementDepartment[] | [] =
    await ManagementDepartment.find(searchAndFilter)
      .populate(
        'academicManagementDepartment academicDepartment academicSemester'
      )
      .skip(skip)
      .sort(sort)
      .limit(limit as number);

  const total = await ManagementDepartment.countDocuments(searchAndFilter);

  const result: IGenericPaginationResponse<IManagementDepartment[] | []> = {
    meta: {
      page,
      limit,
      total,
    },
    data: managementDepartments,
  };

  return result;
};

const getSingleDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const managementDepartment = await ManagementDepartment.findById(id).populate(
    'academicManagementDepartment academicDepartment'
  );
  return managementDepartment;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const isExist = await ManagementDepartment.findById(id);
  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'ManagementDepartment not found !'
    );
  }

  const { title } = payload;

  const updatedManagementDepartment =
    await ManagementDepartment.findOneAndUpdate(
      { _id: id },
      { $set: { title: title } },
      {
        new: true,
      }
    );
  return updatedManagementDepartment;
};

const deleteDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const deletedManagementDepartment =
    await ManagementDepartment.findByIdAndDelete({
      _id: id,
    });
  return deletedManagementDepartment;
};

export const ManagementDepartmentService = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
