import express from 'express';
import { UserController } from './user.controller';
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createStudentZodSchema,
} from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
const userRoutes = express.Router();

userRoutes.post(
  '/create-student',
  validateRequest(createStudentZodSchema),
  UserController.createStudent
);
userRoutes.post(
  '/create-admin',
  validateRequest(createAdminZodSchema),
  UserController.createAdmin
);
userRoutes.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  UserController.createFaculty
);

export default userRoutes;
