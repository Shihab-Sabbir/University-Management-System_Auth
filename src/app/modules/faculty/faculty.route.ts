import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyZodSchema } from './faculty.validation';
const facultyRoutes = express.Router();

facultyRoutes.get('/get-faculties', FacultyController.getFaculties);
facultyRoutes.get('/get-faculty/:id', FacultyController.getSingleFaculty);
facultyRoutes.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  FacultyController.updateFaculty
);
facultyRoutes.delete('/:id', FacultyController.deleteFaculty);

export default facultyRoutes;
