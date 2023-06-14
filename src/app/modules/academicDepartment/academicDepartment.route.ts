import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
} from './academicDepartment.validation';
import validateRequest from '../../middlewares/validateRequest';
const academicDepartmentRoutes = express.Router();

academicDepartmentRoutes.post(
  '/create-department',
  validateRequest(createDepartmentZodSchema),
  AcademicDepartmentController.createDepartment
);

academicDepartmentRoutes.get(
  '/get-departments',
  AcademicDepartmentController.getDepartments
);

academicDepartmentRoutes.get(
  '/get-single-department/:id',
  AcademicDepartmentController.getSingleDepartment
);

academicDepartmentRoutes.patch(
  '/update-department/:id',
  validateRequest(updateDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
);

academicDepartmentRoutes.delete(
  '/delete-department/:id',
  AcademicDepartmentController.deleteDepartment
);

export default academicDepartmentRoutes;
