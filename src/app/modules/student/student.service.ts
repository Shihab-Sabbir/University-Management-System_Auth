import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericPaginationResponse } from '../../../shared/interfaces/interfaces';
import { getSearchAndPaginationOptions } from '../../../shared/utils/searchAndPagination/getSearchAndPaginationOptions';
import {
  studentFilterFields,
  studentSearchFields,
} from '../student/student.constant';
import { IGuardian, ILocalGuardian, IName, IStudent } from '../student/student.interface';
import Student from '../student/student.model';

const getStudents = async (query: any) => {
  const { searchAndFilter, page, limit, skip, sort } =
    getSearchAndPaginationOptions(
      query,
      studentFilterFields,
      studentSearchFields
    );

  const semesters: IStudent[] | [] = await Student.find(searchAndFilter)
    .populate('academicFaculty academicDepartment academicSemester')
    .skip(skip)
    .sort(sort)
    .limit(limit as number);

  const total = await Student.countDocuments(searchAndFilter);

  const result: IGenericPaginationResponse<IStudent[] | []> = {
    meta: {
      page,
      limit,
      total,
    },
    data: semesters,
  };

  return result;
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const semester = await Student.findById(id).populate(
    'academicFaculty academicDepartment academicSemester'
  );
  return semester;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const { name, guardian, localGuardian, ...rest } = payload;

  const updateStudentInfo: Partial<IStudent> = { ...rest };

  if (name && Object.keys(name as IName).length > 0) {
    Object.keys(name as IName).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updateStudentInfo as any)[nameKey] = name[key as keyof IName];
    });
  }
  if (guardian && Object.keys(guardian as IGuardian).length > 0) {
    Object.keys(guardian as IGuardian).forEach((key: string) => {
      const guardianKey = `guardian.${key}`;
      (updateStudentInfo as any)[guardianKey] =
        guardian[key as keyof IGuardian];
    });
  }
  if (
    localGuardian &&
    Object.keys(localGuardian as ILocalGuardian).length > 0
  ) {
    Object.keys(localGuardian as ILocalGuardian).forEach((key: string) => {
      const localGuardianKey = `localGuardian.${key}`;
      (updateStudentInfo as any)[localGuardianKey] =
        localGuardian[key as keyof ILocalGuardian];
    });
  }

  const updatedStudent = await Student.findOneAndUpdate(
    { _id: id },
    updateStudentInfo,
    { new: true }
  );
  return updatedStudent;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const deletedStudent = await Student.findByIdAndDelete({
    _id: id,
  });
  return deletedStudent;
};

export const StudentService = {
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
