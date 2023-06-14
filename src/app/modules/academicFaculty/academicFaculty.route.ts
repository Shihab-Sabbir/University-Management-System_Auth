import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { facultyZodSchema } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';
const academicFacultyRoutes = express.Router();

academicFacultyRoutes.post(
  '/create-faculty',
  validateRequest(facultyZodSchema),
  AcademicFacultyController.createFaculty
);

academicFacultyRoutes.get(
  '/get-faculties',
  AcademicFacultyController.getFaculties
);

academicFacultyRoutes.get(
  '/get-single-faculty/:id',
  AcademicFacultyController.getSingleFaculty
);

academicFacultyRoutes.patch(
  '/update-faculty/:id',
  validateRequest(facultyZodSchema),
  AcademicFacultyController.updateFaculty
);

academicFacultyRoutes.delete(
  '/delete-faculty/:id',
  AcademicFacultyController.deleteFaculty
);

export default academicFacultyRoutes;
