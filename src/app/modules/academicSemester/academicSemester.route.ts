import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import {
  createSemesterZodSchema,
  updateSemesterZodSchema,
} from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
const academicSemesterRoutes = express.Router();

academicSemesterRoutes.post(
  '/create-semester',
  validateRequest(createSemesterZodSchema),
  AcademicSemesterController.createSemester
);

academicSemesterRoutes.get(
  '/get-semesters',
  AcademicSemesterController.getSemesters
);

academicSemesterRoutes.get(
  '/get-single-semester/:id',
  AcademicSemesterController.getSingleSemester
);

academicSemesterRoutes.patch(
  '/update-semester/:id',
  validateRequest(updateSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

academicSemesterRoutes.delete(
  '/delete-semester/:id',
  AcademicSemesterController.deleteSemester
);

export default academicSemesterRoutes;
