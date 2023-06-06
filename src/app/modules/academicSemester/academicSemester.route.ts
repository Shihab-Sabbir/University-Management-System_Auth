import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterZodSchema } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
const academicSemesterRoutes = express.Router();

academicSemesterRoutes.post(
  '/create-semester',
  validateRequest(academicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export default academicSemesterRoutes;
