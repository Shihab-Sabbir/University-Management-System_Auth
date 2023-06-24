import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS, DEFAULT_PASS } from '../../../config';
import { IStudent } from '../student/student.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IUser } from './user.interface';
import User from './user.model';
import { generateUserId } from './user.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import Student from '../student/student.model';
import { Faculty } from '../faculty/faculty.model';

const createStudent = async (
  studentInfo: IStudent,
  userInfo: IUser
): Promise<IUser | null> => {
  const { password } = userInfo;

  if (!password) {
    userInfo.password = DEFAULT_PASS as string;
  }

  userInfo.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    studentInfo.academicSemester
  );

  const session = await mongoose.startSession();

  let newUserPoulatedData = null;

  try {
    session.startTransaction();
    const id = await generateUserId(
      'student',
      academicSemester as IAcademicSemester
    );
    userInfo.id = id as string;
    studentInfo.id = id as string;

    // Create the new student
    const newStudent = await Student.create([studentInfo], { session });

    // If the creation of the student fails, throw an error
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }

    // Set student _id into user.student
    userInfo.student = newStudent[0]._id;

    // Create the new user
    const newUser = await User.create([userInfo], { session });
    // If the creation of the user fails, throw an error
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserPoulatedData = newUser[0];

    await session.commitTransaction(); // Commit the transaction as it was successful
    await session.endSession();
  } catch (error:any) {
    await session.abortTransaction(); // Rollback the transaction if an error occurred
    await session.endSession();
    throw new ApiError(400, error);
  }

  if (newUserPoulatedData) {
    // Find the newly created user and populate the student information
    newUserPoulatedData = await User.findOne({
      _id: newUserPoulatedData._id,
    }).populate({
      path: 'student',
      populate: [
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
        { path: 'academicSemester' },
      ],
    });
  }
  return newUserPoulatedData;
};

const createFaculty = async (
  studentInfo: IStudent,
  userInfo: IUser
): Promise<IUser | null> => {
  const { password } = userInfo;
  if (!password) {
    userInfo.password = DEFAULT_PASS as string;
  }

  userInfo.role = 'faculty';

  const session = await mongoose.startSession();

  let newUserPoulatedData = null;

  try {
    session.startTransaction();
    const id = await generateUserId('student');
    userInfo.id = id as string;
    studentInfo.id = id as string;

    const newFaculty = await Faculty.create([studentInfo], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }

    userInfo.faculty = newFaculty[0]._id;

    // Create the new user
    const newUser = await User.create([userInfo], { session });
    // If the creation of the user fails, throw an error
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserPoulatedData = newUser[0];

    await session.commitTransaction(); // Commit the transaction as it was successful
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction(); // Rollback the transaction if an error occurred
    await session.endSession();
    throw new ApiError(400, error);
  }

  if (newUserPoulatedData) {
    // Find the newly created user and populate the student information
    newUserPoulatedData = await User.findOne({
      _id: newUserPoulatedData._id,
    }).populate({
      path: 'faculty',
      populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
    });
  }
  return newUserPoulatedData;
};

const createAdmin = async (
  studentInfo: IStudent,
  userInfo: IUser
): Promise<IUser | null> => {
  const { password } = userInfo;
  if (!password) {
    userInfo.password = DEFAULT_PASS as string;
  }
  userInfo.role = 'admin';

  const academicSemester = await AcademicSemester.findById(
    studentInfo.academicSemester
  );

  const session = await mongoose.startSession();

  let newUserPoulatedData = null;

  try {
    session.startTransaction();
    const id = await generateUserId(
      'student',
      academicSemester as IAcademicSemester
    );
    userInfo.id = id as string;
    studentInfo.id = id as string;

    // Create the new student
    const newStudent = await Student.create([studentInfo], { session });

    // If the creation of the student fails, throw an error
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }

    // Set student _id into user.student
    userInfo.student = newStudent[0]._id;

    // Create the new user
    const newUser = await User.create([userInfo], { session });
    // If the creation of the user fails, throw an error
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserPoulatedData = newUser[0];

    await session.commitTransaction(); // Commit the transaction as it was successful
    await session.endSession();
  } catch (error:any) {
    await session.abortTransaction(); // Rollback the transaction if an error occurred
    await session.endSession();
    throw new ApiError(400, error);
  }

  if (newUserPoulatedData) {
    // Find the newly created user and populate the student information
    newUserPoulatedData = await User.findOne({
      _id: newUserPoulatedData._id,
    }).populate({
      path: 'student',
      populate: [
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
        { path: 'academicSemester' },
      ],
    });
  }
  return newUserPoulatedData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
